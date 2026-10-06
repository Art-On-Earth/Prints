import { readdir, readFile, mkdir, writeFile, rm, lstat } from 'node:fs/promises';
import { resolve, relative, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const targets = ['.agents/skills/aoe-print', '.claude/skills/aoe-print'];
const sourcePath = 'skills/aoe-print';
async function files(dir, prefix = '') {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const result = [];
  for (const entry of entries.sort((a,b) => a.name.localeCompare(b.name))) {
    const name = join(prefix, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symlink not supported: ${join(dir, entry.name)}`);
    if (entry.isDirectory()) result.push(...await files(join(dir, entry.name), name));
    else if (entry.isFile()) result.push(name);
  }
  return result;
}
async function rejectSymlinkParents(root, path) {
  let current = root;
  for (const part of path.split('/')) {
    current = join(current, part);
    try { if ((await lstat(current)).isSymbolicLink()) throw new Error(`Refusing symlink: ${current}`); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}
export async function sync(root, check = false) {
  root = resolve(root);
  await rejectSymlinkParents(root, sourcePath);
  const source = join(root, sourcePath);
  const names = await files(source);
  if (!names.includes('SKILL.md')) throw new Error('Source SKILL.md missing');
  const contents = new Map(await Promise.all(names.map(async n => [n, await readFile(join(source,n))])));
  const entry = contents.get('SKILL.md').toString();
  if (!/^---\r?\nname: aoe-print\r?\n/.test(entry)) throw new Error('Invalid skill identity');
  const version = (await readFile(join(root,'VERSION'),'utf8')).trim();
  if (!entry.includes(`version: "${version}"`)) throw new Error('Source version does not match VERSION');
  for (const [name, content] of contents) {
    if (!name.endsWith('.md')) continue;
    for (const match of content.toString().matchAll(/\]\(([^)]+)\)/g)) {
      const href = match[1].split('#')[0];
      if (!href || /^[a-z]+:/i.test(href)) continue;
      const destination = relative(source,resolve(dirname(join(source,name)),href));
      if (!contents.has(destination)) throw new Error(`Unbundled reference in ${name}: ${href}`);
    }
  }
  const differences = [];
  for (const target of targets) {
    await rejectSymlinkParents(root,target);
    const out = join(root,target);
    const old = await files(out);
    for (const name of names) {
      const expected = contents.get(name);
      let actual;
      try { actual = await readFile(join(out,name)); } catch(error) { if(error.code !== 'ENOENT') throw error; }
      if (!actual || !actual.equals(expected)) {
        differences.push(`${target}/${name}`);
        if (!check) { await mkdir(dirname(join(out,name)),{recursive:true}); await writeFile(join(out,name),expected); }
      }
    }
    for (const name of old.filter(n => !contents.has(n))) {
      differences.push(`${target}/${name} (obsolete)`);
      if (!check) await rm(join(out,name));
    }
  }
  if (check && differences.length) throw new Error(`Generated copies are stale:\n${differences.join('\n')}\nRun npm run build:agents.`);
  return { targets: targets.length, filesPerTarget: names.length, changed: differences.length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.some(a => a !== '--check')) { console.error('Usage: node scripts/sync-agents.mjs [--check]'); process.exitCode = 1; }
  else try { console.log(await sync(resolve(dirname(fileURLToPath(import.meta.url)),'..'), args.includes('--check'))); }
  catch(error) { console.error(error.message); process.exitCode = 1; }
}

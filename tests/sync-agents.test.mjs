import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { sync, targets } from '../scripts/sync-agents.mjs';
async function fixture(t) {
 const root=await mkdtemp(join(tmpdir(),'aoe-distribution-'));
 t.after(()=>rm(root,{recursive:true,force:true}));
 await mkdir(join(root,'skills/aoe-print/references'),{recursive:true});
 await writeFile(join(root,'VERSION'),'1.0.1\n');
 await writeFile(join(root,'skills/aoe-print/SKILL.md'),'---\nname: aoe-print\ndescription: Test\nmetadata:\n  version: "1.0.1"\n---\n[Guide](references/guide.md)\n');
 await writeFile(join(root,'skills/aoe-print/references/guide.md'),'Exact reference\n');
 return root;
}
test('complete, identical, idempotent copies with references',async t=>{
 const r=await fixture(t);await sync(r);assert.equal((await sync(r)).changed,0);await sync(r,true);
 for(const target of targets) assert.equal(await readFile(join(r,target,'references/guide.md'),'utf8'),'Exact reference\n');
});
test('check detects drift without changing files; build repairs drift and obsolete files',async t=>{
 const r=await fixture(t);await sync(r);const file=join(r,targets[0],'references/guide.md');await writeFile(file,'drift');await writeFile(join(r,targets[0],'old.md'),'old');
 await assert.rejects(sync(r,true),/stale/);assert.equal(await readFile(file,'utf8'),'drift');await sync(r);await sync(r,true);
 await assert.rejects(readFile(join(r,targets[0],'old.md')),/ENOENT/);
});
test('rejects broken references before writing output',async t=>{
 const r=await fixture(t);await rm(join(r,'skills/aoe-print/references/guide.md'));await assert.rejects(sync(r),/Unbundled reference/);
 await assert.rejects(readFile(join(r,targets[0],'SKILL.md')),/ENOENT/);
});
test('rejects version mismatch',async t=>{const r=await fixture(t);await writeFile(join(r,'VERSION'),'9.0.0');await assert.rejects(sync(r),/version/);});
test('does not follow a generated directory symlink',async t=>{
 const r=await fixture(t);await mkdir(join(r,'unrelated'));await symlink(join(r,'unrelated'),join(r,'.agents'),'dir');await assert.rejects(sync(r),/symlink/);
});

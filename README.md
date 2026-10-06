# AOE Posters v1

A poster design skill for designers using AI, authored by Art on Earth. Create a direction, critique an existing poster, or refine selected typography and composition. The installation name stays **aoe-print**.

The skill asks what should attract, identify, explain, and enable action, then makes those roles visible. It includes expressive type manipulation, image art direction, restrained surface treatments, and editable handoff guidance. It does not impose one house style.

## Install

```sh
npx skills add https://github.com/Art-On-Earth/s --skill aoe-print
```

Choose your agent when prompted. Codex, Claude Code, Cursor, and Gemini CLI installation targets have been smoke-tested with skills 1.7.0 (requires Node.js 22.20+). All 15 skill files, including references, were copied intact. This verifies installation, not design performance inside each agent. See [compatibility and maintenance](docs/compatibility.md).

## Use it

- **Create:** “Use aoe-print. Make a poster for [event]. Here is the exact copy, audience, size, and imagery. Give me three short concepts first.”
- **Critique:** “Use aoe-print to critique this poster. Prioritize the three changes that would most improve communication.”
- **Refine:** “Use aoe-print. Keep the concept and illustration; explore taller title proportions and improve supporting-text hierarchy.”

If you want the agent to choose and continue, explicitly delegate the concept choice. No special slash command is required by this package; invocation depends on the host agent.

## Inside

- [Skill entrypoint](skills/aoe-print/SKILL.md): modes, workflow, and reference routing.
- [Typography](skills/aoe-print/references/typography.md) and [composition](skills/aoe-print/references/composition.md): roles, proportion, spacing, color, and visual review.
- [Fonts In Use research](skills/aoe-print/references/fonts-in-use.md): six contextual observations, attributed and separated from interpretation.
- [Illustration and surface](skills/aoe-print/references/illustration-and-surface.md): asset proportions, grain, and type/material relationships.
- [Editable handoff](skills/aoe-print/references/figma-handoff.md): separate text, imagery, and layout; verify destination support.
- [Release examples](examples/README.md) and [validation record](evaluations/v1-validation.md).

## Scope and evidence

**Version 1.0.1 is an initial poster-focused release with agent distribution support.** It incorporates designer feedback from guided pilots and two additional local concept checks. It has not passed independent blind comparisons, multi-model testing, or broad designer trials. Typography remains an area for iteration; Common Ground's alternatives were not fully accepted.

Figma is the preferred editing destination, but this package does not provide a Figma-writing integration. Example SVGs retain live text; native Figma import/editability and physical print proofs remain unverified. No output is certified press-ready. Editorial and production references support judgment but are not independently tested product capabilities.

AOE guidance and reference analysis are not model training. External reference artwork and commercial fonts are not bundled. The two original release examples embed open-source fonts with their license notices. No endorsement by referenced designers, foundries, or publishers is implied.

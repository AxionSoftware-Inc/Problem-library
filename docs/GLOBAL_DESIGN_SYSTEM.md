# Axion Science — Global Design System

Status: canonical global visual/interaction contract.

This system is shared by Science Hub, Mathematics, Notebook, Writer, and future Physics/domain tools. Individual apps may have different working surfaces, but they must feel like instruments from one scientific environment.

## Design thesis

Axion Science should not look like a generic SaaS dashboard and should not imitate short-lived sci-fi trends. The product should feel precise, calm, spatial, and unusually capable: a scientific instrument designed for the next decade.

Future-looking does **not** mean neon gradients, glass everywhere, glowing cards, or decorative 3D. The future comes from hierarchy, continuity, spatial scientific views, causal motion, and removing workflow friction.

## Global principles

1. **Science is the hero.** Equations, plots, fields, simulations, manuscripts, and reasoning receive the strongest visual weight.
2. **Quiet shell.** Navigation, Project context, metadata, and ecosystem chrome stay visually secondary until invoked.
3. **Progressive depth.** Beginner surfaces are simple; expert controls appear contextually or under Advanced.
4. **Spatial when meaningful.** 3D, layers, camera, animation, and canvas interactions exist to improve understanding, never as decoration.
5. **Color is semantic.** Deep navy is the identity/accent. Additional colors communicate state, category, field, uncertainty, or data.
6. **Motion is causal.** Motion explains transitions, parameter changes, simulation time, object updates, and focus. Avoid ornamental looping motion.
7. **Few strong surfaces.** Prefer large coherent workspaces over walls of small cards.
8. **Typography carries hierarchy.** Size, weight, rhythm, and whitespace do more work than borders and backgrounds.
9. **One Project context.** Switching Math → Notebook → Writer must feel like changing instruments inside the same project, not visiting another company.
10. **Renderer independence.** Visual identity is above Plotly, Canvas, Three.js, WebGL/WebGPU, or editor implementation details.

## Global visual character

- default appearance: light, neutral, high-clarity;
- primary identity: deep scientific navy/blue;
- surfaces: white to cool-neutral, low-contrast layering;
- borders: thin and quiet;
- radii: restrained, not bubbly;
- shadows: rare and subtle; use hierarchy/spacing first;
- gradients: not a default surface treatment;
- decorative glass/glow: prohibited in normal product UI;
- dense scientific views may use darker instrument surfaces when the data benefits from it.

## Typography

UI/body typography should be highly legible and neutral. Mathematical notation, code, publication typography, and long-form writing can use domain-appropriate type systems without changing the surrounding ecosystem language.

Global hierarchy:

- display: product/section statement, very limited use;
- title: current scientific task/document/project;
- body: explanation and working context;
- caption: metadata/state/provenance;
- mono: code, identifiers, numeric diagnostics where useful.

Do not use oversized marketing typography inside working instruments.

## Geometry and spacing

Controls should feel engineered rather than playful.

- small controls: 8–10 px radius;
- panels: 12–16 px radius when separation is necessary;
- large canvases/workspaces may be square-edged or minimally rounded;
- spacing should create grouping before borders/cards are introduced;
- full-width scientific canvases should not be broken into cards merely for visual symmetry.

## Motion

Use three motion speeds:

- fast: hover/focus/control state;
- standard: panels, inspectors, menus, mode changes;
- slow: scientific scene/camera transitions or major workspace state changes.

Respect reduced-motion preferences. Never make scientific reading depend on animation.

## App personalities

### Science Hub
Project and continuity are the hero. It may be more spatial/graph-oriented than the other apps, but should remain calm and editorial rather than dashboard-heavy.

### Mathematics
Equation → visualization → result is the hero. Large plotting/spatial regions are encouraged. Controls should resemble a scientific instrument, not a form builder.

### Notebook
Reasoning and evidence are the hero. It should be the quietest app: generous reading width, semantic blocks, low chrome, easy insertion of Project results.

### Writer
The manuscript is the hero. Publication canvas dominates. Scientific object metadata appears through contextual insertion/inspectors, not persistent dashboards.

### Physics / future domains
Use the same shell/tokens but allow richer spatial scenes, time controls, fields, trajectories, meshes, and simulation state. Do not invent a separate product aesthetic.

## Ecosystem shell contract

Every app should eventually expose the same conceptual top layer:

```text
Axion Science     Project: <current project>
Math   Notebook   Writer   Explore
```

The shell must preserve Project context across app changes. App-specific toolbars live below it.

## Visualization language

Scientific visualization has its own hierarchy:

1. primary phenomenon/result;
2. axes/coordinates/scale;
3. annotations and selected state;
4. controls/legend;
5. diagnostics/provenance.

Avoid default rainbow palettes. Use perceptually meaningful palettes and preserve accessibility. 3D scenes should have restrained materials/lighting and clear depth cues rather than game-like rendering.

## Component layers

Global primitives:

- ecosystem shell;
- Project switcher/context;
- buttons/inputs/selects;
- menus/popovers/dialogs;
- tabs/segmented controls;
- inspectors;
- status/provenance labels;
- empty/loading/error states;
- visualization chrome.

Domain components remain app-owned:

- Math composer/solver/plot controls;
- Notebook semantic blocks;
- Writer manuscript/editor tools;
- Physics scene/model/simulation controls.

## Token policy

The canonical CSS variable namespace is `--ax-*`. App-specific tokens may map to these variables, but should not invent new global colors/spacing independently.

Initial shared token file: `styles/axion-science-tokens.css` in each app. These mirrors must remain identical until moved into a shared package.

## Design review test

Before accepting a global UI change, ask:

- Does the science/work remain visually primary?
- Is this simpler without removing expert depth?
- Does it feel like the same ecosystem in every app?
- Is the visual effect functional, or merely fashionable?
- Would this still look serious five years from now?
- Can Physics/3D/scientific scenes fit this language later?

If the answer fails, do not standardize the pattern.
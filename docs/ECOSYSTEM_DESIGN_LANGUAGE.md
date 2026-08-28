# Ecosystem Design Language

Status: **canonical visual direction for ecosystem-v1**

This is a scientific product family, not a collection of SaaS dashboards. Every app may have its own working character, but switching between them should still feel like moving between instruments in the same environment.

## Core feeling

The interface should feel:

- calm;
- exact;
- spacious without wasting space;
- technically serious;
- readable for long work sessions;
- modern without looking trend-driven;
- more like a precision instrument or a well-designed research desk than a startup marketing template.

The science is the visual hero. Chrome is quiet.

## Visual primitives

### Surfaces

Prefer:

- white and very light neutral backgrounds;
- subtle cool-gray separation;
- thin borders;
- restrained shadows only when depth communicates hierarchy;
- flat, stable work surfaces for editors and plots.

Avoid:

- decorative gradients;
- neon/glow effects;
- crypto/sci-fi imagery;
- heavy glassmorphism;
- large blurred backgrounds;
- excessive nested cards.

### Color

Primary accent is a restrained deep blue/navy family. Accent color communicates selection, action, scientific focus, or navigation—not decoration.

Status colors are semantic and sparse. Large surfaces should remain neutral.

### Typography

Use a clear sans-serif for controls, metadata, navigation, and dense working UI.

A restrained serif/display face may be used for important mathematical/editorial headings where it adds intellectual character, not as decoration on every card.

Math notation and code keep their appropriate specialist rendering.

### Shape

- modest radii;
- thin borders;
- controls should feel precise rather than pill-heavy;
- large editor/visualization surfaces may use slightly larger radii than inputs;
- avoid turning every label into a badge.

## Hierarchy rule

Every working screen should answer these questions in order:

1. What am I working on?
2. What is the primary action/input?
3. What is the main result/content?
4. What should I understand or do next?
5. Where are advanced details if I need them?

Secondary metadata should not visually compete with the scientific content.

## Ecosystem chrome

The ecosystem bar exists only to preserve context:

```text
Axion Science | Math | Notebook | Writer | Explore | active Project
```

It should remain visually quieter than each app's own primary navigation.

Do not turn the ecosystem bar into a command center, notification center, account dashboard, or global toolbar during the current milestone.

## App personalities

### Science Hub / Explore

Character: spatial, project-oriented, welcoming.

Primary jobs:

- start/continue a Project;
- understand the ecosystem flow;
- discover examples.

Avoid a KPI dashboard. Projects are workspaces, not CRM records.

### Mathematics

Character: precise scientific instrument.

Primary hierarchy:

```text
Problem
→ Visualization
→ Result
→ Interpretation
→ Advanced analysis
```

The approved Laboratory V2 visual language is the strongest existing reference. Plots, equations, geometry and results dominate; controls stay compact and calm.

### Notebook

Character: quiet research memory.

Reasoning and narrative continuity are primary. Computation is available when invoked but should not make the whole interface feel like an IDE.

Project evidence should appear as contextual material, not a permanent wall of result cards.

### Writer

Character: publication desk.

The manuscript is the hero. Citation, evidence, structure and export tools appear contextually around it.

Avoid large dashboards inside the editor. Project results enter through a small selection/insertion workflow.

## Project UX

A new user should understand the basic flow without learning architecture terms:

```text
Create Project
→ solve something in Math
→ Save
→ use the result in Notebook or Writer
```

Prefer user language such as `Save to Project`, `Project results`, `Use in Writer`, and `Continue in Math`.

Avoid exposing terms such as schema version, object graph, revision resolver, persistence adapter, or Platform Core in normal UI.

## Progressive disclosure

Advanced scientific capability is welcome, but it should be layered:

- primary input/result visible;
- optional settings collapsed;
- diagnostics/audit/reproducibility below the main result;
- research-only controls revealed intentionally.

Do not remove expert capability simply to achieve minimalism. Minimalism means hierarchy, not lack of power.

## Motion

Use motion only when it explains:

- a state transition;
- a calculation/update;
- a spatial/math relationship;
- opening/closing contextual detail.

Avoid constant ambient animation and decorative motion that consumes attention or GPU time.

## Performance is part of design

The UI should feel immediate on ordinary hardware.

- avoid rerendering plots on every keystroke;
- prefer local draft state before expensive visualization updates;
- mount heavy visualization/code surfaces only when useful;
- avoid blur/glow effects over large animated regions;
- preserve working visualizers when changing surrounding UI.

## Responsive rule

Desktop is the primary research workspace, but narrow screens must remain understandable.

- stack input before result on narrow screens;
- keep primary actions reachable;
- allow scientific visuals to scroll/resize rather than compress into illegibility;
- do not duplicate entire desktop sidebars as mobile card walls.

## Design review checklist

Before accepting a new screen, ask:

- Is the scientific/content surface visually dominant?
- Can a new user identify the primary action within a few seconds?
- Does the screen still feel calm with real data loaded?
- Did we add a card/badge only because it was easy?
- Does ecosystem chrome preserve context without stealing attention?
- Is advanced capability present but appropriately disclosed?
- Did the change preserve performance and existing working behavior?

If a redesign makes the architecture more visible than the user's scientific work, simplify it.

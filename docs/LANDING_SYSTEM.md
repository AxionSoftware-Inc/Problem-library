# Axion Science Landing System

## Status

Canonical landing grammar for Science Hub, Mathematics, Notebook, Writer, and future scientific instruments.

Mathematics is the visual reference implementation. Other products keep their own scientific/editorial content surface but follow the same public-facing composition, spacing, navigation geometry, typography hierarchy, and interaction restraint.

## Required landing layers

Every primary product landing should contain these layers in this order:

1. Premium product navbar
2. Open visual hero
3. Three-part product promise strip
4. Primary product showcase
5. Product-specific workflow
6. Three deep capability narratives
7. Ecosystem handoff section
8. Editorial final CTA
9. Product footer

Do not ship a root landing that is only a hero plus one or two generic feature blocks.

## Premium navbar

- 72px product header under the compact ecosystem strip.
- Maximum content width: 1520px.
- Horizontal padding: 24px mobile, 32px small screens, 48px desktop, 64px wide desktop, up to 80px very wide screens.
- Two-line brand lockup: product name + restrained descriptor.
- Product navigation sits in the center on wide screens.
- One quiet secondary action and one deep-navy primary action at the right.
- White/translucent surface, thin bottom rule, restrained blur.
- No oversized pills, gradient navbar, heavy shadow, or card-like enclosing shell.

## Hero

The hero uses the Mathematics open-scene grammar:

- generous whitespace;
- approximately 0.72 / 1.28 text-to-visual split on desktop;
- large Playfair-style scientific/editorial statement;
- small uppercase product eyebrow;
- navy line + small violet point as signature;
- one concise paragraph;
- primary CTA + quiet secondary CTA;
- open visual scene with no screenshot rectangle around it.

Current hero scenes:

- Mathematics: animated parametric 3D mathematical surface.
- Notebook: floating research/document layers.
- Writer: floating manuscript/evidence scene.
- Science: orbital Project/ecosystem scene.

Hero scenes must respect reduced motion and should not make the page depend on a heavy 3D engine when a lightweight Canvas/SVG/CSS implementation is sufficient.

## Promise strip

Exactly three concise promises immediately after the hero. Prefer editorial columns separated by thin rules, not three SaaS cards.

Examples:

- Mathematics: Solve / Visualize / Preserve
- Notebook: Think / Compute / Connect
- Writer: Write / Evidence / Publish
- Science: Compute / Reason / Publish

## Product showcase

This is the proof that the product is real.

Use one large, detailed product representation with actual domain content. It may use a framed product/workspace surface here; the ban on screenshot rectangles applies specifically to the hero.

The showcase should explain the primary product value without requiring marketing copy to carry the entire section.

## Workflow

Show the natural user sequence as a readable editorial flow, not a generic feature list.

Examples:

- Math: problem -> visualization -> result -> interpretation -> save
- Notebook: question -> model -> computation -> observation -> finding
- Writer: evidence -> structure -> write -> review -> publish
- Science: question -> model -> Math -> Notebook -> Writer

## Deep capabilities

Use three large narrative sections. Each section should pair one strong product statement with a domain-specific visual, formula, document fragment, metadata surface, or structured evidence.

Avoid walls of small cards.

## Ecosystem handoff

Every product must explain where it sits in the shared research lifecycle.

The shared core chain is:

Math -> Notebook -> Writer

Science Hub frames the entire Project context around that chain.

The differentiation is not four unrelated apps; it is scientific work that survives the handoff between focused instruments.

## Final CTA

End with a large editorial statement, generous whitespace, one sentence of support copy, and one primary action.

Do not use a loud gradient CTA banner or dense SaaS conversion card.

## Visual invariants

- Canvas: white / cool off-white.
- Deep navy primary actions.
- Blue scientific accent; violet only as a restrained secondary signature.
- Playfair-style display typography and Manrope-style UI/body typography.
- Thin borders, restrained shadows, small-to-medium radii.
- Science itself is the visual hero.
- No neon, glass-heavy sci-fi, giant gradients, crypto styling, or card walls.
- No fake testimonials, fake customer logo walls, fake usage metrics, or pricing sections until they are real product requirements.

## Responsive behavior

- Preserve side padding at every breakpoint.
- Never let hero content touch viewport edges.
- Hero visual stacks below copy on narrow screens.
- Product showcase and workflow reflow naturally instead of forcing desktop screenshots into mobile widths.
- Navigation hides secondary center links before compromising brand/CTA spacing.

## Implementation rule

When a new app or future Physics product is added, copy the landing grammar, not the exact content. Product-specific content and hero scenes should differ; shell geometry, rhythm, hierarchy, typography, and interaction language should not drift.

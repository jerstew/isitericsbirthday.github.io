# Phase 0 Research: Eric Identity Quiz

## Decision 1: Static, dependency-free delivery

**Decision**: Use semantic HTML, local CSS, and native browser JavaScript only. Add no runtime libraries, remote assets, analytics, service worker, backend, or persistence mechanism.

**Rationale**: This matches the existing one-page GitHub Pages architecture, avoids network and supply-chain dependencies, and directly supports the privacy requirement.

**Alternatives considered**: A framework or component library would add a build pipeline disproportionate to five form steps. Remote fonts, icon libraries, and confetti packages add failure and privacy surfaces without essential value.

## Decision 2: Native multi-step form semantics

**Decision**: Author one form containing all five steps. Use labels for text/select controls and fieldset/legend groups for radio and checkbox controls. Keep controls mounted, apply `hidden` to inactive steps, and include `Step n of 5` in the focused step heading.

**Rationale**: Native controls supply keyboard behavior and accessible names. Keeping the same controls mounted preserves answers across Back/Next navigation, while `hidden` removes inactive steps from display, focus order, and the accessibility tree.

**Alternatives considered**: Custom ARIA widgets duplicate native behavior and increase error risk. Rendering each step from JavaScript risks losing values and leaves a poor no-script document. Five separate forms complicate state and Enter-key behavior.

## Decision 3: Navigation, validation, and focus behavior

**Decision**: Use a single form-submission path: submission advances steps 1-4 and verifies identity on step 5. Back is a non-submitting button. The form uses persistent inline validation for required name, age, and reaction answers, associates errors programmatically, and focuses the invalid control. Step changes and retry focus the new step heading with `tabindex="-1"`.

**Rationale**: This retains expected Enter-key behavior, prevents an outcome before final submission, and avoids leaving keyboard focus on a newly hidden control. Persistent text errors are reliable at high zoom and for assistive technology.

**Alternatives considered**: Browser validation bubbles are transient and inconsistent under magnification. Disabled Next buttons do not identify what must be corrected. A live announcement without focus movement leaves focus attached to hidden content.

## Decision 4: Exact-profile evaluation boundary

**Decision**: Put name normalization, exact set comparison, and pass/fail evaluation in a pure exported ECMAScript module. Treat missing or malformed input as a failing profile rather than an exception. Keep UI orchestration in a separate module.

**Rationale**: The exact-match predicate is the highest-risk behavior and can be exhaustively tested without a DOM emulator. Separating it also prevents UI state from changing the supplied attempt during comparison.

**Alternatives considered**: Inline event-handler logic is harder to test and encourages duplicated conditions. Adding a DOM testing library would require package infrastructure that the repository does not otherwise need.

## Decision 5: Main-page promotion and responsive typography

**Decision**: Add a normal-flow anchor after the existing birthday content, styled as a CSS-only Windows 95-style beveled card with a `NEW!` badge and a small decorative inline icon. Move the existing viewport-sized typography from the body to the birthday status so the promotion can use bounded rem-based sizing.

**Rationale**: The anchor works without JavaScript, keeps the YES/NO result dominant, avoids extra asset requests, and can wrap safely at 320 pixels and 200% zoom.

**Alternatives considered**: Fixed or absolute positioning can overlap the primary content. Raster icons and icon fonts add asset or network costs. JavaScript navigation weakens baseline link semantics.

## Decision 6: Result presentation and confetti

**Decision**: Include hidden full-viewport result regions in the quiz document, reveal exactly one after submission, hide the form, and focus the result heading. Implement success confetti with one pointer-transparent, assistive-technology-hidden canvas, a bounded particle count, capped pixel ratio, and a finite animation of approximately three seconds.

**Rationale**: Existing result markup provides deterministic, zoom-safe content and an accessible focus destination. A bounded canvas avoids hundreds of animated DOM nodes and stops consuming resources after the celebration.

**Alternatives considered**: `alert()` cannot satisfy the visual requirement. Replacing the full document complicates retry and focus. A dialog adds modal semantics that are unnecessary when the form is replaced. DOM confetti increases layout work; a GIF or CDN library adds an asset dependency.

## Decision 7: Reduced-motion and no-script behavior

**Decision**: When `prefers-reduced-motion: reduce` matches, do not start canvas particles and disable nonessential CSS motion while retaining the full success message and static decoration. Include a visible `noscript` explanation that interactive identity verification requires JavaScript.

**Rationale**: Confetti is nonessential interaction-triggered motion, so complete suppression is more appropriate than merely slowing it. The static form copy and main link remain readable without JavaScript, while the unavailable verdict is stated honestly.

**Alternatives considered**: CSS-only suppression is insufficient for procedural canvas animation. A CSS-only quiz cannot robustly validate the text, select, and exact checkbox combinations without exposing brittle behavior.

## Decision 8: Package-free testing and browser validation

**Decision**: Use Node 24's built-in test runner for the pure evaluator. Cover normalized passing names, representative failing names/ages/reactions, all 64 trait/oath bitmask combinations, missing inputs, and evaluator immutability. Use a locally served current browser for UI, responsive, accessibility, privacy, and birthday regression checks.

**Rationale**: Automated logic tests protect the central predicate with no package manifest or browser download. Native browser inspection is proportionate for focus, layout, animation, storage, and network behaviors in this small site.

**Alternatives considered**: Manual-only testing leaves the predicate underprotected. Playwright or Cypress would add package metadata, browser binaries, and maintenance larger than the present feature. A published browser test page provides weaker reporting and expands the production surface.

## Decision 9: Privacy verification

**Decision**: Keep answers only in current form controls and transient JavaScript values. Use source inspection plus browser Network, Application storage, address-bar, refresh, and retry checks to verify no transmission, persistence, or URL exposure.

**Rationale**: Runtime and static inspection together cover all dimensions of FR-021; either method alone leaves blind spots.

**Alternatives considered**: Local or session storage violates refresh/reopen reset behavior. Query or fragment state exposes answers. Code review alone cannot prove runtime behavior.

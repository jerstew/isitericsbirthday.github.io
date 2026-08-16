# Phase 0 Research: Eric Identity Quiz

## Decision 1: Static, dependency-free delivery

**Decision**: Use semantic HTML, local CSS, and native browser JavaScript only. Add no runtime libraries, remote assets, analytics, service worker, backend, or persistence mechanism.

**Rationale**: This matches the existing one-page GitHub Pages architecture, avoids network and supply-chain dependencies, and directly supports the privacy requirement.

**Alternatives considered**: A framework or component library would add a build pipeline disproportionate to five form steps. Remote fonts, icon libraries, and confetti packages add failure and privacy surfaces without essential value.

## Decision 2: Native multi-step form semantics

**Decision**: Author one form containing all five steps. Use labels for text/select controls and fieldset/legend groups for radio, True/False, and checkbox controls. Render the three selected Step 4 statement groups once per attempt, keep controls mounted, apply `hidden` to inactive steps, and include `Step n of 5` in the focused step heading.

**Rationale**: Native controls supply keyboard behavior and accessible names. Keeping the same controls mounted preserves answers across Back/Next navigation, while `hidden` removes inactive steps from display, focus order, and the accessibility tree.

**Alternatives considered**: Custom ARIA widgets duplicate native behavior and increase error risk. Rendering each step from JavaScript risks losing values and leaves a poor no-script document. Five separate forms complicate state and Enter-key behavior.

## Decision 3: Navigation, validation, and focus behavior

**Decision**: Use a single form-submission path: submission advances steps 1-4 and verifies identity on step 5. Back is a non-submitting button. The form uses persistent inline validation for required name, age, reaction, and all three Step 4 True/False answers, associates errors programmatically, and focuses the first invalid control or unanswered statement group. Step changes and retry focus the new step heading with `tabindex="-1"`.

**Rationale**: This retains expected Enter-key behavior, prevents an outcome before final submission, and avoids leaving keyboard focus on a newly hidden control. Persistent text errors are reliable at high zoom and for assistive technology.

**Alternatives considered**: Browser validation bubbles are transient and inconsistent under magnification. Disabled Next buttons do not identify what must be corrected. A live announcement without focus movement leaves focus attached to hidden content.

## Decision 4: Accepted-profile evaluation boundary

**Decision**: Put the immutable statement pool, name normalization, accepted-reaction membership, statement-answer comparison, exact oath-set comparison, and pass/fail evaluation in a pure browser-global script loaded before a separate UI orchestration script. Accept reactions A and C, reject reaction B, and treat unknown, duplicate, missing, extra, or malformed statement responses as a failing profile rather than an exception. Use classic scripts so the static quiz also works in direct-file and preview contexts that block module loading.

**Rationale**: The exact-match predicate is the highest-risk behavior and can be exhaustively tested without a DOM emulator. Separating it also prevents UI state from changing the supplied attempt during comparison, while ordered classic scripts avoid `.mjs` MIME and `file:` module restrictions.

**Alternatives considered**: Inline event-handler logic is harder to test and encourages duplicated conditions. Adding a DOM testing library would require package infrastructure that the repository does not otherwise need.

## Decision 5: Main-page promotion and responsive typography

**Decision**: Add a normal-flow anchor after the existing birthday content, styled as a compact single-row CSS-only Windows 95-style beveled button with a `NEW!` badge, `ARE YOU ERIC?` label, and small decorative inline icon. Move the existing viewport-sized typography from the body to the birthday status so the promotion can use bounded rem-based sizing.

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

**Decision**: Use Node 24's built-in test runner for the pure evaluator, a pure three-of-seven sampling helper, and static markup/CSS contracts. Cover all seven statement texts and truth values, repeated samples for length/membership/uniqueness without mutating the pool, normalized passing names, representative failing names/ages/reactions, each correct and inverted statement answer, malformed response maps, oath combinations, missing inputs, evaluator immutability, and responsive source contracts. Use a locally served current browser for UI, random-combination variety, within-attempt selection stability, required-answer focus, accessibility, privacy, and responsive regression checks.

**Rationale**: Automated logic and static tests protect deterministic contracts with no package manifest or browser download. Rendered measurements are still required because source-regex tests cannot prove the final cascade, title line count, shared edges, scroll reachability, or absence of overflow across all five steps.

**Alternatives considered**: Manual-only testing leaves the predicate and source contracts underprotected. Static-regex-only testing misses rendered geometry and accessibility failures. Playwright or Cypress would add package metadata, browser binaries, and maintenance larger than the present feature. A published browser test page provides weaker reporting and expands the production surface.

## Decision 9: Privacy verification

**Decision**: Keep answers only in current form controls and transient JavaScript values. Use source inspection plus browser Network, Application storage, address-bar, refresh, and retry checks to verify no transmission, persistence, or URL exposure.

**Rationale**: Runtime and static inspection together cover all dimensions of FR-021; either method alone leaves blind spots.

**Alternatives considered**: Local or session storage violates refresh/reopen reset behavior. Query or fragment state exposes answers. Code review alone cannot prove runtime behavior.

## Decision 10: Structure-first responsive compaction

**Decision**: Cap the desktop quiz dialog at 500 CSS pixels and apply component-specific responsive rules at 480 CSS pixels and below. Keep the page heading within 28-32 CSS pixels, render progress as plain text, strengthen the active question hierarchy, align body and footer content, and retain 1rem question/answer text plus 2.75rem (44-pixel) interactive targets. On mobile, use 16-pixel outer margins, 24-pixel body padding, the specified vertical rhythm, a 44-48-pixel first-name input, and a 48-pixel full-width primary action. Keep result regions full-screen with a 5.5rem maximum result heading and keep the homepage promotion as a single row no wider than 24rem.

**Rationale**: The previous 38rem cap equals 608 pixels and exceeds the clarified 480-520-pixel dialog range. Explicit desktop and mobile dimensions reduce competing visual weight without uniformly scaling text or controls, while the 480/481 boundary and computed-style checks make the refinement testable.

**Alternatives considered**: Retaining 38rem contradicts the clarified cap. Uniform scaling would shrink controls and readable text. A single fluid composition would not guarantee the required full-width mobile action or title copy. Compacting the full-screen results as ordinary cards would weaken the outcome joke and contradict the result contract.

## Decision 11: Browser-history exit semantics

**Decision**: Add a title-bar `button` with visible X text, accessible name `Go back`, and native hover tooltip `Go back`. On activation, call `history.back()` when `history.length > 1`; otherwise navigate to the relative homepage `./index.html`. Continue managing form stages solely through the existing in-memory `currentStep` and `hidden` states without History API calls.

**Rationale**: Native history Back preserves the visitor's real entry path, while a relative fallback works on the custom domain, GitHub Pages subpaths, and direct-file previews. Keeping form navigation outside browser history ensures the X and browser Back never step through the wizard.

**Alternatives considered**: Always linking home discards the visitor's entry path. `document.referrer` can be suppressed despite usable history. Adding stage hashes or `pushState` entries directly conflicts with the clarified navigation model.

## Decision 12: Homepage-only dark hierarchy

**Decision**: Apply a near-black neutral background and high-contrast off-white supporting text to `index.html` only. Preserve the red/green birthday-state semantics after contrast verification. Keep the compact promotion's silver Windows styling and add a focus treatment visible against both the silver control and dark page. Do not alter the quiz palette or add a theme toggle.

**Rationale**: A fixed dark homepage removes the current glare and keeps the primary YES/NO result visually dominant. Limiting the palette change to the homepage protects the approved quiz aesthetic and avoids theme state, persistence, or control complexity.

**Alternatives considered**: A mode toggle adds state and interaction outside scope. Pure black and white creates harsher contrast than required. Extending the dark palette to the quiz contradicts the clarified requirement.

## Decision 13: Overflow-safe dialog positioning and responsive title copy

**Decision**: Keep the desktop window slightly above center with asymmetric normal-flow grid rows rather than a transform. At 480 CSS pixels and below, align the window in normal flow using `max(16px, 15vh)` followed by a dynamic-viewport `max(16px, 15dvh)` override, allow document scrolling, and use a short-height media rule to reduce the top padding to 16 pixels when necessary. Expose `ERIC IDENTITY VERIFICATION WIZARD` above the breakpoint and `ERIC IDENTITY VERIFICATION` at and below it, with exactly one string participating in layout and the accessibility tree.

**Rationale**: Normal-flow top spacing adapts when dynamic viewport height changes for browser chrome or an on-screen keyboard and avoids the clipping risks of fixed or absolute positioning. Mutually exclusive text nodes preserve real text and prevent the compact chrome from wrapping into a tall title bar.

**Alternatives considered**: Fixed positioning can conceal content behind the keyboard. Mathematical centering immediately reduces usable space below the form. Transforming or uniformly scaling the whole window does not reflow content and can create overflow. Generated pseudo-element text is less robust for content and accessibility inspection.

## Decision 14: Hierarchy and footer treatment

**Decision**: Keep the progress heading in its existing semantic/focus role but remove its filled badge treatment. Use one divider at the start of the action footer, preserve the button's Windows-style bevel, and remove only redundant container outlines or shadows. Maintain an 80-100-pixel right-aligned primary action on desktop and a 48-pixel-high full-width primary action on mobile.

**Rationale**: Preserving the existing heading and focus target avoids JavaScript or accessibility changes. Separating the footer with one divider establishes a stable action region, while reducing nested decoration prevents the mobile action from competing with the active question.

**Alternatives considered**: Replacing progress with a custom progress bar adds an unnecessary focal point and accessible-state work. Removing all button borders would abandon the retro visual language. Keeping every adjacent outline and shadow preserves the current visual competition.

## Decision 15: Effective-width interpretation for 200% zoom

**Decision**: Validate browser zoom up to 200% only while the resulting layout viewport remains at least the specified 320 CSS-pixel minimum. Treat 320 CSS pixels as the lower effective layout width, including when reached by zooming a wider physical viewport. Do not require an additional independent 200% text-only enlargement on top of an already 320 CSS-pixel layout viewport.

**Rationale**: The exact 26-character compact title and the mandatory 44-pixel close target cannot be guaranteed on one line if text alone is doubled inside a fixed 320 CSS-pixel layout. Using effective CSS width matches responsive CSS behavior and preserves a reproducible lower boundary without clipping, shrinking the close target, or silently changing the required title.

**Alternatives considered**: Allowing the title to wrap conflicts with FR-027. Clipping or ellipsis fails the exact-title contract. Shrinking the close target violates the accessibility boundary. Introducing a third title string would contradict the clarified copy decision.

## Decision 16: Solid-color retro outcomes

**Decision**: Remove the existing radial and repeating-linear result gradients and retain the established solid success and failure colors, text shadows, symbols, and square geometry.

**Rationale**: The clarified visual language expressly excludes gradients. Solid fills preserve the emphatic full-screen outcomes without adding modern decoration or changing result semantics.

**Alternatives considered**: Keeping the existing gradients leaves a delivered-state conflict with FR-032. Replacing them with additional textured layers would preserve the same visual competition. Converting results into cards would contradict the full-screen outcome contract.

## Decision 17: Three-of-seven preference statement sampling

**Decision**: Model each Step 4 item as an immutable record containing a stable identifier, concise first-person self-report text that does not name Eric, and a canonical boolean answer aligned with his preferences. For each fresh attempt, use a pure helper to shuffle a copy of the seven identifiers and take three without replacement. The helper accepts an injectable random-number source for deterministic tests and uses the browser's ordinary random source by default. Store only the selected identifiers and visitor answers in the active session; do not guarantee a True/False balance or rotation across visits.

**Rationale**: Sampling without replacement directly satisfies the distinct-item rule and permits all 35 valid three-item combinations. Keeping canonical records in the pure profile module prevents display and evaluation truth values from drifting, while copied-array shuffling avoids mutating shared configuration.

**Alternatives considered**: Selecting repeatedly until three unique items are found adds avoidable retry logic. Enforcing a truth-value mix would exclude valid random combinations not required by the specification. Persisting recent selections to force rotation would violate the transient-state boundary.

## Decision 18: Native per-statement True/False groups

**Decision**: Render each selected statement as a fieldset with the statement as its legend and a required native radio pair labeled `True` and `False`. Use a stable group name derived from the statement identifier, retain all three mounted during the attempt, and focus the first unanswered group when validation fails.

**Rationale**: Independent radio groups express one required boolean per statement with native keyboard behavior and unambiguous accessible names. Mounted controls preserve answers across navigation without duplicating state synchronization.

**Alternatives considered**: A single checkbox per statement makes unchecked mean either False or unanswered. Custom toggle buttons require additional ARIA state and keyboard handling. A table of radios can become difficult to understand and scroll at narrow widths.

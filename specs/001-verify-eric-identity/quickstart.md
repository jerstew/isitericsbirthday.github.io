# Quickstart Validation: Eric Identity Quiz

## Prerequisites

- Python 3 for a local static server
- Node.js 24 or later for the package-free evaluator tests
- Current Chrome or Edge with developer tools

## Start the site

From the repository root:

```powershell
python -m http.server 8000
```

Open:

- `http://localhost:8000/`
- `http://localhost:8000/are-you-eric.html`

The quiz also supports opening `index.html` directly from disk; the local server remains the preferred production-like validation path.

## Run automated evaluator tests

```powershell
node --test
```

Expected result: all tests pass, including normalized names, failing field values, the 64 trait/oath combinations, malformed inputs, and input immutability.

## Validate the main page

1. Confirm the existing YES/NO result and subtitle still reflect July 3 as Eric's birthday.
2. Confirm the page uses a near-black neutral background and high-contrast off-white supporting text without changing the red/green birthday-state meaning.
3. Confirm the quiz promotion is a single row no wider than 24rem containing only the small icon, `NEW!`, and `ARE YOU ERIC?`, with a working standard link and accessible invitation.
4. Confirm the promotion is at least 44 pixels high, its visible label is at least 16 pixels, and it remains visually subordinate to the YES/NO result at 320, 375, 390, 768, 1024, and 1440 CSS pixels and at 200% text zoom.
5. Measure the homepage background, supporting text, focus indicator, promotion, and both birthday-state colors; confirm each meets its applicable WCAG AA contrast threshold.

## Validate the quiz flow

Follow [ui-contract.md](contracts/ui-contract.md) and [data-model.md](data-model.md).

1. Open the quiz directly and confirm a blank `Step 1 of 5`.
2. Attempt to advance through steps 1, 2, and 3 without answers; each must remain active, show a persistent associated error, and focus the affected control.
3. Supply answers, use Back and Next repeatedly, and confirm all edits persist.
4. Confirm steps 4 and 5 allow an empty set and disclose no outcome before `Verify identity`.
5. Submit the accepted profile once with reaction A and once with reaction C; confirm each shows the verified heading within 1 second with finite confetti.
6. Repeat with reaction B and with one deviation in each other field; confirm every attempt produces the full-screen rejected result.
7. Activate `Try again`; confirm all controls clear and focus returns to the step-1 heading.
8. Partially answer the quiz and refresh; confirm the attempt is discarded.
9. Above 480 CSS pixels, confirm the quiz window is no wider than 500 pixels, `ARE YOU ERIC?` is 28-32 pixels, the first-name input is 40-44 pixels high, the primary action is 80-100 pixels wide and right-aligned, and all body/footer regions share the same horizontal content edges.
10. At 320, 375, 390, and 480 CSS pixels, confirm 16-pixel outer margins, 24-pixel body padding, a 28-32-pixel page heading, a 44-48-pixel first-name input, and a 48-pixel-high full-width primary action. Confirm the action footer uses one divider and has no redundant adjacent border or shadow.
11. At the same mobile widths, confirm the vertical gaps are 8 pixels from heading to description, 20-24 pixels from description to plain progress text, 24 pixels from progress to question, 8 pixels from the first-name label to its input, 24 pixels from the input region to the footer divider, and 16 pixels from the divider to the action.
12. Confirm question and answer text is at least 16 pixels, all interactive targets and option rows are at least 44 pixels high, the active question is visually dominant, and no layout has horizontal overflow.

## Validate title-bar exit behavior

1. Open the quiz from the homepage, advance to each of the five steps, and confirm the address and browser-history length do not change between steps.
2. On each step, confirm the title-bar X has visible X text, accessible name `Go back`, hover tooltip `Go back`, a visible focus indicator, and a target at least 44 by 44 CSS pixels.
3. From a quiz opened through the homepage, activate X and confirm it returns directly to the homepage in one action rather than moving to an earlier quiz step.
4. Open the quiz as the first entry in a fresh browsing context, activate X, and confirm the relative homepage opens as the fallback.
5. Use the form's `Back` button and confirm it remains the only control that moves to an earlier quiz stage while preserving answers.

## Validate keyboard and accessibility behavior

1. Complete the entire flow using Tab, Shift+Tab, arrow keys, Space, and Enter.
2. Confirm every control has a visible focus indicator and programmatic label.
3. Confirm radio and checkbox prompts are exposed as named groups.
4. Confirm hidden steps are absent from the focus order and accessibility tree.
5. Confirm step changes and results move focus to the new heading exactly once.
6. Enable reduced motion in browser emulation; confirm no particle motion occurs and the verified result remains complete.
7. Inspect the accessibility tree for duplicate IDs, unlabeled controls, invalid ARIA, and heading-order errors.
8. Confirm text, controls, and focus indicators meet WCAG AA contrast.

## Validate responsive results

At 320, 375, 768, 1024, and 1440 effective CSS pixels, and at browser zoom up to 200% while the resulting layout viewport remains at least 320 CSS pixels:

- Confirm no horizontal page scrolling.
- Confirm long oath labels wrap without clipping or overlapping controls.
- Confirm navigation controls remain reachable and do not overlap.
- Confirm the rejected result covers the viewport and can scroll vertically when needed.
- Confirm both result headings have a 5.5rem maximum, remain the largest text on screen, and wrap without clipping.
- Confirm the retry control remains visible and operable.
- Confirm both result backgrounds use solid colors without radial, linear, or repeating gradients.

## Validate responsive dialog boundaries

1. At 320, 375, 390, and 480 CSS pixels, confirm the title bar shows `ERIC IDENTITY VERIFICATION` on one line without clipping or overlapping the 44-by-44-pixel close target.
2. At 481, 768, 1024, and 1440 CSS pixels, confirm the title bar shows `ERIC IDENTITY VERIFICATION WIZARD` and the primary action is right-aligned rather than full-width.
3. On a normal-height desktop viewport, confirm the dialog is slightly above mathematical center without a positioning transform. At mobile widths, confirm its top begins approximately 15% of the dynamic viewport height from the top and never has less than 16 pixels of clearance.
4. Repeat mobile checks with a short viewport, the on-screen keyboard open, and browser zoom up to 200% while retaining at least a 320 CSS-pixel effective layout width; confirm the complete dialog and action footer remain reachable through vertical document scrolling without horizontal overflow. Do not stack a separate 200% text-only enlargement onto an already 320 CSS-pixel viewport.
5. Confirm progress appears as plain unboxed text, the active question is more prominent than progress and chrome, and component dimensions change independently rather than through whole-window scaling.
6. Confirm the quiz retains square corners, solid fills, and Windows-style bevels without rounded cards, pill buttons, or gradients.

## Validate privacy

1. In source, search for prohibited transmission and persistence mechanisms:

   ```powershell
   rg -n "fetch|XMLHttpRequest|sendBeacon|WebSocket|localStorage|sessionStorage|indexedDB|document\.cookie|https?://" index.html are-you-eric.html assets
   ```

   Expected result: no quiz code uses those mechanisms and no external runtime asset URL is present.

2. In Developer Tools, preserve the Network log, complete both result paths, and confirm submission, retry, and confetti produce no requests.
3. Confirm Application storage remains empty or unchanged.
4. Confirm the address bar never contains any response value.
5. Refresh after a partial and completed attempt and confirm step 1 is blank.

## Completion criteria

Validation passes only when the automated tests are green and every applicable manual contract check succeeds without a specification deviation.

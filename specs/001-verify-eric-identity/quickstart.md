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
2. Confirm the quiz promotion appears below the primary result, retains a 1990s beveled appearance, wraps without overlap, and contains a working standard link.
3. Confirm the YES/NO result remains visually dominant at 320, 375, 768, 1024, and 1440 CSS pixels and at 200% text zoom.

## Validate the quiz flow

Follow [ui-contract.md](contracts/ui-contract.md) and [data-model.md](data-model.md).

1. Open the quiz directly and confirm a blank `Step 1 of 5`.
2. Attempt to advance through steps 1, 2, and 3 without answers; each must remain active, show a persistent associated error, and focus the affected control.
3. Supply answers, use Back and Next repeatedly, and confirm all edits persist.
4. Confirm steps 4 and 5 allow an empty set and disclose no outcome before `Verify identity`.
5. Submit the exact canonical profile and confirm the verified heading appears within 1 second with finite confetti.
6. Repeat with one deviation in each field and confirm every attempt produces the full-screen rejected result.
7. Activate `Try again`; confirm all controls clear and focus returns to the step-1 heading.
8. Partially answer the quiz and refresh; confirm the attempt is discarded.

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

At 320, 375, 768, 1024, and 1440 CSS pixels, and at 200% text zoom:

- Confirm no horizontal page scrolling.
- Confirm long oath labels wrap without clipping or overlapping controls.
- Confirm navigation controls remain reachable and do not overlap.
- Confirm the rejected result covers the viewport and can scroll vertically when needed.
- Confirm the retry control remains visible and operable.

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

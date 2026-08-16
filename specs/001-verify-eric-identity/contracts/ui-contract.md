# UI Contract: Eric Identity Quiz

This contract defines observable routes, content, interactions, and states. It exposes no network API.

## Route contract

| Route | Entry | Required outcome |
|-------|-------|------------------|
| `/` | Direct visit | Existing birthday result remains primary; quiz promotion follows it in normal document flow |
| `/are-you-eric.html` | Direct visit or promotion link | Fresh quiz opens at step 1 with no restored answers or result |

The root-page promotion is a standard single-row link no wider than 24rem. It includes a small decorative icon hidden from assistive technology, visible `NEW!` and `ARE YOU ERIC?` text, an accessible invitation to take the quiz, and a keyboard focus state visible against the dark homepage. It has no separate description line.

The homepage uses a near-black neutral background with high-contrast off-white supporting text and no theme toggle. Existing red/green birthday-status semantics remain unchanged and meet the applicable WCAG AA contrast threshold. The quiz route retains its existing teal and Windows-gray palette.

## Step contract

Only the current step is visible and focusable. Its heading contains plain, unboxed `Step n of 5` text beneath the quiz description and remains the focus destination after navigation. Next and Back preserve all mounted control values.

| Step | Prompt and control | Choices | Forward rule |
|------|--------------------|---------|--------------|
| 1 | `Enter your first name.` text input | Free text | Trimmed value must not be empty |
| 2 | `Select your current age.` select | Integers 1-119 plus `Eric's Exact Age` | A choice must be selected |
| 3 | `When someone calls out 'Hey Eric!' in public, what is your reaction?` radio group | A, B, and C exactly as specified | One choice must be selected |
| 4 | Three selected Eric preference statements, each presented as a fieldset with a native True/False radio pair | Three distinct records sampled from the seven-item pool in `data-model.md` | Every displayed statement must have exactly one response |
| 5 | Full penalty-of-perjury prompt checkbox group | Solemnly swear, perjury warning, fifth amendment exactly as specified | Any set, including empty; submit label is `Verify identity` |

Step 5 permits an empty selection. Step 4 does not advance until all three statements are answered. Required-step errors remain visible, identify the relevant prompt or first unanswered statement, are programmatically associated with the affected controls, and focus the invalid input or first unanswered radio group.

## Navigation and focus contract

- Submitting steps 1-4 validates the current step and advances only when valid.
- Back never validates and is unavailable on step 1.
- Enter follows the same path as activating Next or Verify identity.
- Each successful step change focuses the new step heading.
- Final submission evaluates all answers once and reveals no intermediate pass/fail information.
- The three Step 4 statement groups are rendered once per attempt and retain both their selection and responses during Back/Next navigation.
- Retry clears the Step 4 responses and creates a fresh three-statement sample; refresh or reopen also starts with a fresh sample.
- No step change, Back action, validation event, retry, or result transition creates or replaces a browser-history entry or changes the page address.
- The title bar includes a Windows-style X button with visible X text, accessible name `Go back`, native hover tooltip `Go back`, visible focus, and a target of at least 44 by 44 CSS pixels.
- Activating X performs one browser Back action when prior history exists; if no prior history entry exists, it opens the relative homepage.

## Result contract

### Verified

- Visible heading: `IDENTITY VERIFIED: WELCOME, ERIC.`
- The form is hidden and the result heading receives focus.
- Finite confetti is decorative, pointer-transparent, and hidden from assistive technology.
- Under reduced motion, no particle animation starts; the complete heading and static celebratory styling remain.

### Rejected

- A red, retro-styled result covers at least the available viewport and remains internally scrollable when zoom or viewport height requires it.
- Visible heading: `YOU ARE NOT ERIC.`
- The form is hidden and the result heading receives focus.
- A real button labeled `Try again` is present.
- Activating Try again resets every control, reveals step 1, and focuses the step-1 heading.

Both results remain understandable through text without color, animation, or sound. They remain full-screen; the result-heading maximum is reduced from 7rem to 5.5rem while the heading remains the largest text on screen.
Result backgrounds use solid success or failure colors without radial, linear, or repeating gradients.

## Evaluator contract

The evaluator accepts a QuizAttempt-shaped value and returns a boolean. It returns `true` only for the canonical EricProfile criteria defined in [data-model.md](../data-model.md): reaction A or C is accepted, reaction B is rejected, the three unique IDs in `selectedStatementIds` exactly match the key set of `preferenceAnswers`, all three responses equal their canonical booleans, and every other field matches exactly. It must not mutate the supplied object, response map, selected-ID list, or canonical pool. Missing, duplicate, mismatched, extra, unknown, or malformed statement data returns `false`.

## Statement sampling contract

- The canonical pool contains exactly the seven IDs, texts, and answers defined in [data-model.md](../data-model.md).
- A fresh attempt receives exactly three distinct pool records.
- Sampling never mutates the pool and does not require a particular True/False balance.
- More than one valid three-statement combination must be observable across repeated fresh attempts; a particular sequence is not guaranteed.
- Each statement exposes its complete text as the radio-group accessible name, with explicit `True` and `False` control labels.

## Privacy contract

- The form has no network submission target.
- Navigation and submission do not add answers to the query string, fragment, path, cookies, or browser storage.
- The quiz initiates no request when advancing, submitting, retrying, or animating.
- Refreshing or reopening the route yields a blank step-1 attempt.

## Responsive and accessibility contract

- No horizontal page scrolling occurs from 320 through 1440 effective CSS pixels or at browser zoom up to 200% when the resulting layout viewport remains at least 320 CSS pixels wide. The minimum-width test does not stack an additional independent 200% text-only enlargement on an already 320 CSS-pixel layout viewport.
- Native form controls retain standard keyboard interaction and programmatic labels.
- Option groups use fieldset and legend semantics.
- Visual order matches DOM and focus order; no positive tabindex is used.
- Focus indicators are at least 2 CSS pixels thick and meet contrast requirements.
- Controls and selectable option rows provide at least the WCAG 2.2 minimum target size.
- Inactive steps are absent from the accessibility tree and focus order.
- Result and validation communication is not duplicated through competing focus and assertive-live mechanisms.
- A no-script message explains that interactive identity verification requires JavaScript.
- Above 480 CSS pixels, the quiz window is no wider than 500 CSS pixels, sits slightly above center through asymmetric normal-flow layout rather than a transform, displays `ERIC IDENTITY VERIFICATION WIZARD`, and uses an 80-100 CSS-pixel right-aligned primary action.
- At 480 CSS pixels and below, the quiz window uses 16 CSS-pixel outer margins, begins approximately 15vh/15dvh from the top with at least 16 CSS pixels of clearance, displays `ERIC IDENTITY VERIFICATION` on one line beside the close control, and remains in scrollable document flow when height is constrained. A short-height rule reduces top clearance to 16 CSS pixels when the percentage placement would crowd the dialog.
- The mobile body uses 24 CSS-pixel horizontal padding; the first-name input is 44-48 CSS pixels high; and the primary action is full-width and 48 CSS pixels high. The mobile vertical rhythm is 8 pixels from heading to description, 20-24 pixels from description to progress, 24 pixels from progress to question, 8 pixels from question label to input, 24 pixels from the input region to the footer divider, and 16 pixels from the divider to the action.
- On desktop, the `ARE YOU ERIC?` heading is 28-32 CSS pixels, the first-name input is 40-44 CSS pixels high, and body plus footer content shares one left/right edge.
- Progress is plain text without a filled badge or block. The active question and its control remain visually stronger than the page heading, progress, chrome, and decorative beveling.
- The action footer uses one divider and predictable spacing. Mobile removes redundant adjacent action borders or shadows while retaining the primary button's retro bevel.
- Question, answer, and promotional label text remains at least 16 CSS pixels.
- Every standalone button, text input, select, and linked promotion provides a target of at least 44 by 44 CSS pixels; each radio or checkbox is operable through its labeled option row, which is at least 44 CSS pixels high and spans the available row width.
- At 320, 375, 390, and 480 CSS pixels, the compact title-bar text and X control coexist without wrapping, clipping, or overlap; at 481 CSS pixels, the full title and desktop action composition apply.
- Responsive rules resize individual components rather than proportionally scaling the whole interface. The quiz retains square corners, solid fills, beveled borders, and restrained shadows without rounded cards, pill buttons, or gradients.

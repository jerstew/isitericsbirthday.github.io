# UI Contract: Eric Identity Quiz

This contract defines observable routes, content, interactions, and states. It exposes no network API.

## Route contract

| Route | Entry | Required outcome |
|-------|-------|------------------|
| `/` | Direct visit | Existing birthday result remains primary; quiz promotion follows it in normal document flow |
| `/are-you-eric.html` | Direct visit or promotion link | Fresh quiz opens at step 1 with no restored answers or result |

The root-page promotion is a standard link. It includes a visible `NEW!` indicator, explanatory identity-quiz text, a decorative icon hidden from assistive technology, and a visible keyboard focus state.

## Step contract

Only the current step is visible and focusable. Its heading contains `Step n of 5`. Next and Back preserve all mounted control values.

| Step | Prompt and control | Choices | Forward rule |
|------|--------------------|---------|--------------|
| 1 | `Enter your first name.` text input | Free text | Trimmed value must not be empty |
| 2 | `Select your current age.` select | Integers 1-119 plus `Eric's Exact Age` | A choice must be selected |
| 3 | `When someone calls out 'Hey Eric!' in public, what is your reaction?` radio group | A, B, and C exactly as specified | One choice must be selected |
| 4 | `Select all traits that apply to you:` checkbox group | Westbank, resembles Eric, is Eric | Any set, including empty |
| 5 | Full penalty-of-perjury prompt checkbox group | Solemnly swear, perjury warning, fifth amendment exactly as specified | Any set, including empty; submit label is `Verify identity` |

Steps 4 and 5 visibly state that continuing with no selection is allowed. Required-step errors remain visible, identify the relevant prompt, are programmatically associated with the affected controls, and focus the invalid input or first radio.

## Navigation and focus contract

- Submitting steps 1-4 validates the current step and advances only when valid.
- Back never validates and is unavailable on step 1.
- Enter follows the same path as activating Next or Verify identity.
- Each successful step change focuses the new step heading.
- Final submission evaluates all answers once and reveals no intermediate pass/fail information.

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

Both results remain understandable through text without color, animation, or sound.

## Evaluator contract

The evaluator accepts a QuizAttempt-shaped value and returns a boolean. It returns `true` only for the canonical EricProfile defined in [data-model.md](../data-model.md). It must not mutate the supplied object or collections. Missing, unknown, or malformed values return `false`.

## Privacy contract

- The form has no network submission target.
- Navigation and submission do not add answers to the query string, fragment, path, cookies, or browser storage.
- The quiz initiates no request when advancing, submitting, retrying, or animating.
- Refreshing or reopening the route yields a blank step-1 attempt.

## Responsive and accessibility contract

- No horizontal page scrolling occurs from 320 through 1440 CSS pixels or at 200% browser text zoom.
- Native form controls retain standard keyboard interaction and programmatic labels.
- Option groups use fieldset and legend semantics.
- Visual order matches DOM and focus order; no positive tabindex is used.
- Focus indicators are at least 2 CSS pixels thick and meet contrast requirements.
- Controls and selectable option rows provide at least the WCAG 2.2 minimum target size.
- Inactive steps are absent from the accessibility tree and focus order.
- Result and validation communication is not duplicated through competing focus and assertive-live mechanisms.
- A no-script message explains that interactive identity verification requires JavaScript.

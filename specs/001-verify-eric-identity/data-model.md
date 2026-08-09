# Data Model: Eric Identity Quiz

All entities are transient client-side values. No entity is persisted, transmitted, or encoded into the page address.

## QuizAttempt

Represents the five answers submitted during one page load.

| Field | Type | Allowed values | Validation |
|-------|------|----------------|------------|
| `firstName` | string | User-entered text | Required before leaving step 1; trimmed value must be non-empty |
| `age` | string | `1` through `119`, or `eric-exact-age` | Required before leaving step 2 |
| `reaction` | enum | `turn-around`, `ignore`, `own-name` | Required before leaving step 3 |
| `traits` | set of enum | Any subset of `westbank`, `resembles-eric`, `is-eric` | Zero through three unique values |
| `oath` | set of enum | Any subset of `solemnly-swear`, `perjury-warning`, `fifth-amendment` | Zero through three unique values |

### Normalization

- `firstName` is trimmed at both ends and compared case-insensitively.
- Internal whitespace, additional words, spelling, and punctuation are not changed.
- Set ordering has no meaning; membership and cardinality determine equality.
- Missing, unknown, duplicate, or malformed values fail closed and never produce verification.

## EricProfile

The immutable canonical acceptance criteria. Two profiles pass because the reaction may be either A or C; every other field remains exact.

| Field | Canonical value |
|-------|-----------------|
| `firstName` | `eric` after normalization |
| `age` | `eric-exact-age` |
| `reaction` | `turn-around` or `own-name` |
| `traits` | Exactly `westbank`, `resembles-eric`, and `is-eric` |
| `oath` | Exactly `solemnly-swear` |

## QuizSession

Coordinates presentation state during the active page load.

| Field | Type | Rules |
|-------|------|-------|
| `currentStep` | integer | 1 through 5 while answering |
| `phase` | enum | `answering`, `verified`, or `rejected` |
| `attempt` | QuizAttempt | Derived from the mounted form controls when required |
| `confettiActive` | boolean | May be true only during `verified` and never under reduced motion |
| `historyEntriesCreated` | integer | Always `0`; stage transitions never create, replace, or encode an entry |

### State transitions

```text
new/load -> answering(step 1)
answering(step n) --valid Next--> answering(step n+1), for n=1..4
answering(step n) --Back--> answering(step n-1), for n=2..5
answering(step 5) --submit accepted profile--> verified
answering(step 5) --submit any deviation--> rejected
rejected --Try again--> answering(step 1, cleared attempt)
answering(step any) --title-bar X with prior history--> previous browser entry
answering(step any) --title-bar X without prior history--> homepage
refresh/reopen -> answering(step 1, cleared attempt)
```

There is no transition from `verified` back into an old attempt and no result transition occurs before the step-5 submission. Next, Back, validation, retry, and result transitions operate without `pushState`, `replaceState`, hashes, or query changes.

## Presentation Constraints

Presentation constraints do not add persisted state:

| Surface | Compact boundary | Accessibility boundary |
|---------|------------------|------------------------|
| Quiz window | Maximum width 38rem; reduced padding, gaps, headings, and decoration | Question/answer text at least 1rem; controls and selectable rows at least 2.75rem high |
| Homepage promotion | One row, maximum width 24rem; icon, `NEW!`, and `ARE YOU ERIC?` only | Entire link target at least 2.75rem high; visible label at least 1rem |
| Result screens | Full viewport; result heading maximum reduced to 5.5rem | Heading remains largest text, wraps without clipping, and page remains scrollable |

## QuizResult

| Field | Type | Values |
|-------|------|--------|
| `status` | enum | `verified` or `rejected` |
| `message` | fixed text | `IDENTITY VERIFIED: WELCOME, ERIC.` or `YOU ARE NOT ERIC.` |

The result is derived only from the accepted-reaction membership check plus exact equality for every other `QuizAttempt` field; it is not stored separately.

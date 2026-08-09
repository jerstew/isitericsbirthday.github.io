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

The immutable canonical answer combination.

| Field | Canonical value |
|-------|-----------------|
| `firstName` | `eric` after normalization |
| `age` | `eric-exact-age` |
| `reaction` | `own-name` |
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

### State transitions

```text
new/load -> answering(step 1)
answering(step n) --valid Next--> answering(step n+1), for n=1..4
answering(step n) --Back--> answering(step n-1), for n=2..5
answering(step 5) --submit exact profile--> verified
answering(step 5) --submit any deviation--> rejected
rejected --Try again--> answering(step 1, cleared attempt)
refresh/reopen -> answering(step 1, cleared attempt)
```

There is no transition from `verified` back into an old attempt and no result transition occurs before the step-5 submission.

## QuizResult

| Field | Type | Values |
|-------|------|--------|
| `status` | enum | `verified` or `rejected` |
| `message` | fixed text | `IDENTITY VERIFIED: WELCOME, ERIC.` or `YOU ARE NOT ERIC.` |

The result is derived only from exact equality between `QuizAttempt` and `EricProfile`; it is not stored separately.

<!--
Sync Impact Report
- Version change: unratified template -> 1.0.0
- Added principles:
  - I. Static-First Scope Discipline
  - II. Accessible and Responsive by Default
  - III. Privacy by Construction
  - IV. Evidence-Backed Completion
  - V. Local Commit and Concrete Handoff
- Added sections: Delivery Constraints; Development Workflow
- Removed sections: none; template placeholders were replaced by ratified content
- Templates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md (reviewed; no structural change required)
  - ✅ .specify/templates/tasks-template.md
- Command workflows:
  - ✅ Repository Spec Kit skills reviewed for commit, explicit-push, and next-step alignment
- Follow-up TODOs: none
-->

# Is It Eric's Birthday Constitution

## Core Principles

### I. Static-First Scope Discipline

The site MUST remain deployable as static files on GitHub Pages unless an approved feature
specification explicitly changes that constraint. New frameworks, build systems, runtime
packages, backends, databases, remote assets, or services MUST NOT be introduced when native
HTML, CSS, and browser JavaScript can satisfy the requirement. Any exception MUST be justified
in the feature plan's Complexity Tracking section.

Rationale: The project's reliability, cost, and maintainability depend on its intentionally small
static architecture.

### II. Accessible and Responsive by Default

User-facing work MUST use semantic controls, preserve keyboard operation, provide visible focus,
and remain readable without horizontal scrolling across the feature's specified viewport and zoom
range. Motion MUST respect reduced-motion preferences, and color MUST NOT be the sole means of
communication. Feature specifications and plans MUST define measurable accessibility boundaries
for new or changed interactions.

Rationale: Accessibility is a delivery requirement, not optional polish.

### III. Privacy by Construction

Visitor responses and interaction state MUST remain local and transient unless a specification
explicitly authorizes collection or persistence. Features MUST NOT add analytics, cookies,
browser storage, URL-encoded response state, or network transmission without documented scope,
purpose, retention, and validation requirements.

Rationale: The microsite requires no visitor tracking or stored identity data to deliver its value.

### IV. Evidence-Backed Completion

Implementation work MUST be validated against its specification, plan, tasks, and applicable
quickstart scenarios before it is reported complete. Automated tests MUST run when available;
interaction, accessibility, responsive, and visual requirements MUST receive appropriate browser
validation. Completed tasks MUST be marked complete, and completion claims MUST include the
relevant verification results.

Rationale: A change is complete only when observable evidence shows that its requirements hold.

### V. Local Commit and Concrete Handoff

Any workflow that changes repository files MUST review the resulting diff and create one or more
logical, atomic local commits before recommending or beginning the next workflow step. Spec Kit
workflows and repository agents MUST NOT push commits or branches automatically. A push may occur
only when the user explicitly requests it. Every completion report MUST identify the created commit
or commits and recommend exactly one concrete next action or command when further work exists. When
a workflow makes no repository changes, it MUST state that no commit was needed and still identify
one concrete next action when applicable.

Rationale: Local commits preserve recoverable checkpoints and reviewable history, while an explicit
push boundary keeps publication under direct user control. A concrete handoff prevents workflow state
from becoming ambiguous.

## Delivery Constraints

- Git operations performed automatically are limited to inspection, staging, branching, and local
  commits. Remote pushes require an explicit user request and MUST never occur as an inferred or
  automatic next step.
- Existing user changes MUST be preserved and separated into logical commits when their purpose
  differs from the active workflow.
- Generated specifications, plans, tasks, tests, and implementation changes are all repository
  work and therefore fall under Principle V when modified.
- A recommended next step MUST name a specific command or bounded manual action; vague statements
  such as "continue later" do not satisfy the handoff requirement.

## Development Workflow

1. Define or revise requirements through specification and clarification workflows.
2. Produce or refresh research, plans, contracts, data models, and validation guidance.
3. Generate or converge an actionable task list before implementation.
4. Implement in dependency order and validate the completed scope with available automated and
   browser checks.
5. Review the diff and create logical, atomic local commits for all completed repository changes.
6. Report verification evidence and the commit identifiers, then recommend one concrete next step
   when further work exists.
7. Do not push automatically. Push only in response to an explicit user request.

## Governance

This constitution is the authoritative project-wide workflow and engineering policy. Feature
specifications, plans, task lists, templates, and command workflows MUST comply with it. A conflict
is resolved by changing the subordinate artifact, not by silently weakening a constitutional rule.

Amendments require an explicit user request, an updated Sync Impact Report, propagation to affected
templates and workflows, and a semantic version change. MAJOR versions remove or incompatibly
redefine principles; MINOR versions add principles or materially expand governance; PATCH versions
clarify existing rules without changing their obligations. Every implementation or artifact review
MUST include a constitution-compliance check.

**Version**: 1.0.0 | **Ratified**: 2026-08-09 | **Last Amended**: 2026-08-09

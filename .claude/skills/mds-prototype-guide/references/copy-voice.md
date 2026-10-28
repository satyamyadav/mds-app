# Copy and voice

> Good copy feels inevitable — like the only words that could have been there. That comes from discipline, not creativity.

People using this product make decisions that matter. Every string — label, toast, empty state, error, confirmation, tooltip — is held to the same standard as spacing and colour. Even in a prototype, write real copy, not lorem ipsum.

## Tone

Clinical and direct. Human, not casual. The register is a senior care coordinator talking to a peer: precise, confident, no throat-clearing.

**Never**
- Cute — "Looks like you're all caught up! 🎉"
- Apologetic — "We're sorry, something went wrong"
- Vague — "Something happened"
- Marketing — "Supercharge your care workflows"
- Deflecting — "due to a technical issue"

**Always**
- State what happened, then what to do.
- Use the patient's name when addressing a specific situation.
- Use numerals for quantities — "3 patients", not "three patients".
- "Your" is fine when it makes copy less robotic.

Test: could a senior coordinator say this out loud to a colleague? If it sounds like a system talking about itself, rewrite it.

## No first person

"We" never appears in user-facing strings. The product has no voice; it has results. Describe the result. Use passive construction in body copy. "Unable to …" is for headers and titles only.

## Labels and actions

Imperative, present tense. Name the action, not the process.

```
✓ Acknowledge      ✗ Acknowledging
✓ Close gap        ✗ Closing gap
✓ Assign           ✗ Click to assign
✓ Try again        ✗ Reattempt
✓ Reset password   ✗ Forgot password?
```

- Keep CTAs short. Never append "to continue". "Save" is complete.
- Separate actions get separate, distinct labels.
- Secondary buttons: **Close** to dismiss information, **Cancel** to abort an in-progress action.

## Confirmation dialogs

Never ask "Are you sure?" State the consequence.

- **Structure:** [Consequence]. [What it means or what to do next.]
- **Header matches the CTA.** Action "Stop recording and close" → header "Stop recording?"
- Destructive buttons repeat the action exactly. Never "Yes", "OK", "Confirm" or "Proceed".

```
✗ Header: Ongoing recording
  Body:   Are you sure you want to close?
  CTAs:   Yes | Cancel

✓ Header: Stop recording?
  Body:   Maria Lopez is being recorded. Closing this page will end the recording.
  CTAs:   Continue recording | Stop recording and close
```

## Errors

Two parts, both required: what happened, and what to do.

**Never use**
- "Something went wrong"
- "due to a technical issue" / "due to a system issue"
- "failed" / "failure" — describe the outcome
- "denied" in permission errors
- "Network not available" — use "Connection issue"
- "after some time" — use "later"
- Semicolons

| Situation | Wrong | Right |
|---|---|---|
| Page or modal load error | "Something went wrong" | "The information couldn't be loaded. Try again." |
| Recoverable error | Any message without recovery | Include "Try again" |
| Permission | "Access denied" | Say the user doesn't have permission and how to get it (contact an administrator, request access). |
| Connectivity | "Network not available. Please try again later." | "Connection issue. If the issue continues, contact IT support." |
| Attempts | "2 attempts remaining" | "2 attempts left" |

**Placement**

| Type | When | Format |
|---|---|---|
| Inline | Field validation | One line under the field, no header |
| Card-level | A panel's data didn't load | One line + CTA on the same line |
| Toast | Transient, non-blocking, no recovery path | One line, no header, no CTA |
| Banner | Persistent, non-blocking, affects the current workflow | Full-width, dismissible, with CTA |
| Page-level | The whole page didn't load | Header + body + "Try again" |
| Dialog | Destructive or consequential action | Header + body + distinct CTAs |

Blocking or consequential errors (a submission that didn't go through, an import that stopped) need persistent treatment — banner, inline alert or page state — never just a toast.

For explicitly technical audiences, name the known cause ("validation error", "schema mismatch", "authentication error"). Terms like *server*, *API*, *database* are for technical audiences only. Use "information" for general audiences and "data" only for technical ones.

Name the thing that broke: "The selected template couldn't be loaded. Try again." — not "Page not available."

## Empty states

Honest. What's empty and why. Nothing more.

```
✓ No open care gaps for this patient.
✓ No tasks due today.
✗ Nothing to see here
✗ All caught up!
✗ No results found
✗ No data available
```

A clear queue is a meaningful signal — write it as one. One line, optional CTA, no celebration.

## Tense and form

- Labels: imperative present — "Acknowledge"
- Confirmations: past tense — "Alert acknowledged", not "Alert has been acknowledged"
- Status: noun or adjective — "Overdue", not "This task is overdue"
- Error headers may use "Unable to load patient record"; body copy uses "The patient record couldn't be loaded."

## Dates and numbers

- Display dates: **MMM D, YYYY** — "Jan 5, 2025"
- Relative dates under 7 days ("2 days ago", "Yesterday"), absolute after.
- Due dates always show the date, plus urgency if needed — "Due Jan 5 · Overdue".
- Quantities: always numerals.

## Entity names

Pick one canonical name per entity (e.g. "Patient" or "Member") and use it everywhere with consistent capitalisation. Never mix synonyms in one prototype.

## Pre-output checklist

1. Any "we", "our" or "I"?
2. "Something went wrong"?
3. "due to a technical/system issue"?
4. "denied" in a permission error?
5. "to continue" after a CTA?
6. "Unable to …" in body copy?
7. Passive construction for system outcomes in body copy?
8. Infrastructure terms for a non-technical audience?
9. "after some time"?
10. "Try again" present on recoverable load errors?
11. Specific cause stated for technical audiences?

All pass → ship it.

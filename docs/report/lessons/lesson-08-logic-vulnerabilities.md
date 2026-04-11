# Lesson 08 - Logic Vulnerabilities

Focus:
- Weakness: timing and workflow sequencing allow an invalid order outcome
- Likely fix target: server-side state transition rules, locking, or conditional updates
- Strongest evidence: timeline of two competing requests and the incorrect final order state

## 1. Goal and Vulnerability Summary

- Vulnerability type:
- Affected component:
- Security impact:
- Expected safe behavior: order state should remain consistent with what was actually paid for

## 2. Why This Works / Root Cause

Explain the workflow flaw or race condition rather than treating it as simple input validation.

## 3. Environment and Setup

- Order update endpoint:
- Billing endpoint:
- Order identifiers used:
- Tools used:

## 4. Reproduction Steps

1. Define the intended state rules first.
2. Send billing and update actions close together.
3. Capture the final order state and compare it to the expected state.

## 5. Evidence and Proof

- Timeline of competing requests
- Final inconsistent order state
- Any supporting logs or API responses

## 6. Fix Strategy / Probable Mitigation

- Enforce strict server-side sequencing.
- Prevent invalid updates once billing starts or completes.
- Use locking or conditional updates if needed.

## 7. Code / Config Changes

- Exact file / resource changed:
- Diff or snippet reference:

## 8. Verification After Fix

- Repeat the timing test.
- Show the invalid transition is now blocked.
- Confirm valid workflow steps still succeed.

## 9. Structured Operation and Security Analysis

### Table A

| Intended rule | Artifacts used to infer the rule | Normal evidence | Exploit evidence |
| --- | --- | --- | --- |
| Order workflow transitions must remain consistent even under rapid competing requests. | | | |

### Table B

| Why the exploit is a deviation | Deviation class | Fix applied | Post-fix verification | Optional latency / timing note |
| --- | --- | --- | --- | --- |
| | Workflow / business logic failure | | | |

## 10. Takeaway / Lessons Learned

Short takeaway about server-side workflow enforcement and race-resistant state changes.

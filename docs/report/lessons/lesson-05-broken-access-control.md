# Lesson 05 - Broken Access Control

Focus:
- Weakness: an unprivileged path reaches the administrative order-update function
- Likely fix target: role checks and server-side order state validation
- Strongest evidence: order status changes without proper billing or admin privilege

## 1. Goal and Vulnerability Summary

- Vulnerability type:
- Affected component:
- Security impact:
- Expected safe behavior: privileged order updates should not be reachable from public or low-privilege contexts

## 2. Why This Works / Root Cause

Explain the missing authorization and weak workflow validation around the admin update path.

## 3. Environment and Setup

- Order workflow endpoint(s):
- Administrative function or route:
- User context used:
- Tools used:

## 4. Reproduction Steps

1. Map the intended order workflow.
2. Identify the administrative update path.
3. Trigger the status change from a non-admin context.
4. Capture the changed order state.

## 5. Evidence and Proof

- Request path showing privileged function reachability
- Before/after order state
- Supporting application or AWS evidence

## 6. Fix Strategy / Probable Mitigation

- Enforce strict role-based checks.
- Validate order state transitions server-side.
- Ensure public functions cannot invoke privileged internal actions without authorization.

## 7. Code / Config Changes

- Exact file / resource changed:
- Diff or snippet reference:

## 8. Verification After Fix

- Show the privileged path is no longer reachable from the unprivileged context.
- Show legitimate workflow behavior still works.

## 9. Structured Operation and Security Analysis

### Table A

| Intended rule | Artifacts used to infer the rule | Normal evidence | Exploit evidence |
| --- | --- | --- | --- |
| Administrative order updates must require valid authorization and valid workflow state. | | | |

### Table B

| Why the exploit is a deviation | Deviation class | Fix applied | Post-fix verification | Optional latency / timing note |
| --- | --- | --- | --- | --- |
| | Access control failure | | | |

## 10. Takeaway / Lessons Learned

Short takeaway about protecting privileged serverless functions behind explicit authorization and state rules.

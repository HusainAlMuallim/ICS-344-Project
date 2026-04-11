# Lesson 06 - Denial of Service

Focus:
- Weakness: repeated concurrent billing requests degrade or block normal service
- Likely fix target: API throttling, fairness controls, queueing, or concurrency isolation
- Strongest evidence: bounded pre-fix load results versus stable post-fix behavior

## 1. Goal and Vulnerability Summary

- Vulnerability type:
- Affected component:
- Security impact:
- Expected safe behavior: abusive request bursts should be controlled without blocking normal users

## 2. Why This Works / Root Cause

Explain the lack of rate limiting, fairness control, or safe concurrency design in the billing path.

## 3. Environment and Setup

- Billing endpoint:
- Normal baseline latency:
- Test tool or script:
- Stop conditions used:

## 4. Reproduction Steps

1. Measure normal billing behavior first.
2. Run a short, bounded concurrency test against your own deployment.
3. Capture latency growth, throttling, or errors.

## 5. Evidence and Proof

- Test parameters used
- Timing or status-code comparison
- Relevant logs or CloudWatch metrics

## 6. Fix Strategy / Probable Mitigation

- Apply API throttling or abuse controls.
- Add fairness controls, queueing, or concurrency isolation where appropriate.
- Keep the fix consistent with normal checkout behavior.

## 7. Code / Config Changes

- Exact file / resource changed:
- Diff or snippet reference:

## 8. Verification After Fix

- Repeat the same bounded test.
- Show the abusive pattern is controlled or the service remains stable.
- Confirm normal billing still works.

## 9. Structured Operation and Security Analysis

### Table A

| Intended rule | Artifacts used to infer the rule | Normal evidence | Exploit evidence |
| --- | --- | --- | --- |
| Billing capacity should remain fair and available for legitimate use. | | | |

### Table B

| Why the exploit is a deviation | Deviation class | Fix applied | Post-fix verification | Optional latency / timing note |
| --- | --- | --- | --- | --- |
| | Availability failure / DoS | | | |

## 10. Takeaway / Lessons Learned

Short takeaway about safe, bounded load testing and protecting serverless billing paths from abuse.

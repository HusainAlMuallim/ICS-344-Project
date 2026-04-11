# Lesson 01 - Event Injection

Focus:
- Weakness: user-controlled request data is treated as executable content
- Likely fix target: input parsing path in the API-handling Lambda
- Strongest evidence: exploit request plus CloudWatch proof of backend execution

## 1. Goal and Vulnerability Summary

- Vulnerability type:
- Affected component:
- Security impact:
- Expected safe behavior: order request fields should be parsed as data only

## 2. Why This Works / Root Cause

Explain the unsafe deserialization, dynamic execution, or equivalent parsing flaw.

## 3. Environment and Setup

- API endpoint / stage:
- Lambda function:
- CloudWatch log group:
- Tools used:

## 4. Reproduction Steps

1. Identify the public order API path.
2. Replay the exploit request against your own DVSA deployment.
3. Capture the client-visible result.
4. Capture the CloudWatch entry proving execution.

## 5. Evidence and Proof

- API endpoint screenshot or note
- Exploit request capture
- CloudWatch log showing injected behavior

## 6. Fix Strategy / Probable Mitigation

- Remove unsafe parsing or execution behavior.
- Validate request content against an allowlist schema.
- Ensure the entry Lambda cannot execute user-controlled content.

## 7. Code / Config Changes

- Exact file / resource changed:
- Diff or snippet reference:

## 8. Verification After Fix

- Re-run the same exploit request.
- Show that dangerous behavior no longer executes.
- Confirm normal order requests still work.

## 9. Structured Operation and Security Analysis

### Table A

| Intended rule | Artifacts used to infer the rule | Normal evidence | Exploit evidence |
| --- | --- | --- | --- |
| Order request fields must be treated as data, not executable content. | | | |

### Table B

| Why the exploit is a deviation | Deviation class | Fix applied | Post-fix verification | Optional latency / timing note |
| --- | --- | --- | --- | --- |
| | Unsafe input handling / event injection | | | |

## 10. Takeaway / Lessons Learned

Short serverless takeaway about strict input handling at the API-to-Lambda boundary.

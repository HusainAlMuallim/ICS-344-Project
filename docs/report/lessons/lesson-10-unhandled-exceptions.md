# Lesson 10 - Unhandled Exceptions

Focus:
- Weakness: malformed requests leak internal details through unsafe error responses
- Likely fix target: central exception handling and earlier input validation
- Strongest evidence: client-visible error detail before fix and sanitized response after fix

## 1. Goal and Vulnerability Summary

- Vulnerability type:
- Affected component:
- Security impact:
- Expected safe behavior: internal diagnostics should stay in CloudWatch while client responses stay generic

## 2. Why This Works / Root Cause

Explain how malformed input reaches deeper logic and returns unsafe error details to the client.

## 3. Environment and Setup

- API path tested:
- Malformed request used:
- Relevant Lambda / log group:
- Tools used:

## 4. Reproduction Steps

1. Send malformed, incomplete, or type-invalid requests.
2. Capture the client-visible error detail.
3. Record the internal diagnostic evidence separately.

## 5. Evidence and Proof

- Request payload or replay command
- Client response showing stack trace, file path, or internal detail
- Supporting CloudWatch reference

## 6. Fix Strategy / Probable Mitigation

- Validate input earlier in the request path.
- Catch exceptions centrally.
- Return only generic client-safe errors.

## 7. Code / Config Changes

- Exact file / resource changed:
- Diff or snippet reference:

## 8. Verification After Fix

- Re-run the same malformed request.
- Show the client now receives a safe generic response.
- Confirm detailed diagnostics remain internal only.

## 9. Structured Operation and Security Analysis

### Table A

| Intended rule | Artifacts used to infer the rule | Normal evidence | Exploit evidence |
| --- | --- | --- | --- |
| Internal diagnostics must remain in internal logging, not client responses. | | | |

### Table B

| Why the exploit is a deviation | Deviation class | Fix applied | Post-fix verification | Optional latency / timing note |
| --- | --- | --- | --- | --- |
| | Exception handling / information leakage | | | |

## 10. Takeaway / Lessons Learned

Short takeaway about safe serverless error handling and separating debugging data from user-facing responses.

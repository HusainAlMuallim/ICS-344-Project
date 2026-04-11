# Lesson 03 - Sensitive Information Disclosure

Focus:
- Weakness: receipt-related functionality exposes S3-hosted data outside the intended boundary
- Likely fix target: receipt generation or signed URL authorization path
- Strongest evidence: unauthorized receipt access before fix and denial after fix

## 1. Goal and Vulnerability Summary

- Vulnerability type:
- Affected component:
- Security impact:
- Expected safe behavior: only authorized users should obtain receipt access

## 2. Why This Works / Root Cause

Explain the missing authorization check around receipt access, URL generation, or related file exposure.

## 3. Environment and Setup

- Receipt workflow endpoint:
- Relevant bucket or object path:
- Lambda function:
- Tools used:

## 4. Reproduction Steps

1. Trace the receipt-generation or receipt-access workflow.
2. Identify an unauthorized path to a receipt or receipt URL.
3. Capture one clean proof of unauthorized access.

## 5. Evidence and Proof

- Request or navigation path used
- Unauthorized receipt view, download, or URL generation
- Supporting AWS or application evidence

## 6. Fix Strategy / Probable Mitigation

- Enforce authorization before receipt generation or URL issuance.
- Limit who can access the relevant S3 objects.
- Reduce unnecessary exposure of sensitive file paths or links.

## 7. Code / Config Changes

- Exact file / resource changed:
- Diff or snippet reference:

## 8. Verification After Fix

- Show the unauthorized path now fails.
- Show the legitimate owner or admin path still works.

## 9. Structured Operation and Security Analysis

### Table A

| Intended rule | Artifacts used to infer the rule | Normal evidence | Exploit evidence |
| --- | --- | --- | --- |
| Receipt files and receipt URLs must stay inside the intended authorization boundary. | | | |

### Table B

| Why the exploit is a deviation | Deviation class | Fix applied | Post-fix verification | Optional latency / timing note |
| --- | --- | --- | --- | --- |
| | Sensitive data exposure / access control failure | | | |

## 10. Takeaway / Lessons Learned

Short takeaway about protecting serverless file exposure paths, not just the UI.

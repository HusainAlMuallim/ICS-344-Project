# Lesson 04 - Insecure Cloud Configuration

Focus:
- Weakness: S3 or upload configuration lets attacker-controlled objects enter unsafe processing
- Likely fix target: bucket policy plus backend object validation
- Strongest evidence: permissive upload path and downstream impact before fix

## 1. Goal and Vulnerability Summary

- Vulnerability type:
- Affected component:
- Security impact:
- Expected safe behavior: untrusted files and filenames should not reach unsafe processing paths

## 2. Why This Works / Root Cause

Explain both sides of the problem: permissive storage configuration and unsafe downstream processing.

## 3. Environment and Setup

- S3 bucket:
- Upload path:
- Lambda function:
- Tools used:

## 4. Reproduction Steps

1. Inspect the relevant bucket policy and upload path.
2. Prove the configuration is more permissive than intended.
3. Show how attacker-controlled object name, type, or content influences backend behavior.

## 5. Evidence and Proof

- Bucket policy or access evidence
- Upload or object manipulation proof
- Backend effect showing unsafe processing

## 6. Fix Strategy / Probable Mitigation

- Harden bucket permissions.
- Restrict upload access to the intended principals.
- Validate object names, types, and processing inputs in the backend.

## 7. Code / Config Changes

- Exact file / resource changed:
- Diff or snippet reference:

## 8. Verification After Fix

- Show the unauthorized upload or processing path is blocked.
- Show legitimate uploads still succeed.

## 9. Structured Operation and Security Analysis

### Table A

| Intended rule | Artifacts used to infer the rule | Normal evidence | Exploit evidence |
| --- | --- | --- | --- |
| Only authorized uploads should enter the storage and processing workflow. | | | |

### Table B

| Why the exploit is a deviation | Deviation class | Fix applied | Post-fix verification | Optional latency / timing note |
| --- | --- | --- | --- | --- |
| | Cloud misconfiguration and unsafe processing | | | |

## 10. Takeaway / Lessons Learned

Short takeaway about separating cloud permission hardening from application input hardening.

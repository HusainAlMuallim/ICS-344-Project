# Lesson 07 - Over-Privileged Function

Focus:
- Weakness: a compromised Lambda inherits broader AWS permissions than necessary
- Likely fix target: execution role policy for the relevant function
- Strongest evidence: IAM Policy Simulator results, CloudTrail activity, and least-privilege replacement

## 1. Goal and Vulnerability Summary

- Vulnerability type:
- Affected component:
- Security impact:
- Expected safe behavior: the function role should allow only the minimum required actions and resources

## 2. Why This Works / Root Cause

Explain how excessive IAM permissions increase blast radius after code execution or function compromise.

## 3. Environment and Setup

- Lambda function:
- Execution role:
- IAM Policy Simulator scope:
- CloudTrail setup:

## 4. Reproduction Steps

1. Identify the function and its attached role.
2. Use IAM Policy Simulator on unrelated S3 or DynamoDB resources.
3. Compare allowed actions with the much smaller set actually required.
4. If you use an impact demo, keep it strictly inside your own lab deployment.

## 5. Evidence and Proof

- Current role permissions
- Simulator results for unrelated resources
- CloudTrail-derived evidence of actual usage

## 6. Fix Strategy / Probable Mitigation

- Reduce the role to the minimum required actions and resources.
- Remove unrelated S3, DynamoDB, or broader wildcard access.
- Keep only the permissions needed for the legitimate workflow.

## 7. Code / Config Changes

- Exact file / resource changed:
- Diff or snippet reference:

## 8. Verification After Fix

- Re-run IAM Policy Simulator.
- Show unrelated access is denied.
- Confirm the normal receipt or workflow path still works.

## 9. Structured Operation and Security Analysis

### Table A

| Intended rule | Artifacts used to infer the rule | Normal evidence | Exploit evidence |
| --- | --- | --- | --- |
| A Lambda role should expose only the permissions needed for its intended task. | | | |

### Table B

| Why the exploit is a deviation | Deviation class | Fix applied | Post-fix verification | Optional latency / timing note |
| --- | --- | --- | --- | --- |
| | Excessive privilege / IAM blast radius | | | |

## 10. Takeaway / Lessons Learned

Short takeaway about least privilege in serverless systems and why code compromise and IAM scope must be analyzed together.

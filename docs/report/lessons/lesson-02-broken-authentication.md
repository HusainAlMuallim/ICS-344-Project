# Lesson 02 - Broken Authentication

Focus:
- Weakness: backend trusts decoded JWT content without correct verification
- Likely fix target: JWT verification logic in the order-management path
- Strongest evidence: forged token request before fix and rejection after fix

## 1. Goal and Vulnerability Summary

- Vulnerability type:
- Affected component:
- Security impact:
- Expected safe behavior: user identity must come only from a verified JWT

## 2. Why This Works / Root Cause

Explain how the API trusts unverified or weakly validated token claims.

## 3. Environment and Setup

- Victim test user:
- Attacker test user:
- API endpoint:
- Lambda function:
- Tools used:

## 4. Reproduction Steps

1. Create attacker and victim users with real orders.
2. Capture a normal authenticated order request.
3. Decode the JWT payload locally and record the identity fields.
4. Forge the token to impersonate the victim.
5. Replay the request with the forged token.

## 5. Evidence and Proof

- Normal attacker-only response
- Forged-token request
- Response exposing victim data or privileged access

## 6. Fix Strategy / Probable Mitigation

- Verify JWT signature and claims server-side.
- Reject forged, expired, or otherwise invalid tokens.
- Require valid authentication on each protected endpoint.

## 7. Code / Config Changes

- Exact file / resource changed:
- Diff or snippet reference:

## 8. Verification After Fix

- Re-run the forged-token request.
- Show the forged token now fails.
- Show a valid token still succeeds normally.

## 9. Structured Operation and Security Analysis

### Table A

| Intended rule | Artifacts used to infer the rule | Normal evidence | Exploit evidence |
| --- | --- | --- | --- |
| Cognito token must be verified before any identity claim is trusted. | | | |

### Table B

| Why the exploit is a deviation | Deviation class | Fix applied | Post-fix verification | Optional latency / timing note |
| --- | --- | --- | --- | --- |
| | Authentication failure | | | |

## 10. Takeaway / Lessons Learned

Short takeaway about verified identity versus decoded-but-untrusted token content.

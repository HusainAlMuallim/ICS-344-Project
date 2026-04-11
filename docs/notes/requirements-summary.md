# Requirements Summary

This is a working summary distilled from:
- `Project Description.pdf`
- `Helper Guide.pdf`
- `dvsa_project_plan (1).pdf`

## Hard Requirements

- Deploy DVSA only in your own non-production AWS account.
- Use AWS region `us-east-1`.
- Cover all 10 official DVSA lessons.
- For each lesson, demonstrate the issue, explain it, apply a real fix, and verify the fix.
- Use the required 10-part write-up structure for every lesson.
- Include both structured analysis tables for every lesson.

## Official Lesson Set

1. Event Injection
2. Broken Authentication
3. Sensitive Information Disclosure
4. Insecure Cloud Configuration
5. Broken Access Control
6. Denial of Service
7. Over-Privileged Function
8. Logic Vulnerabilities
9. Vulnerable Dependencies
10. Unhandled Exceptions

## Deliverables

- Written report in PDF format
- Presentation slides in PDF or PowerPoint format
- GitHub repository link
- Demo video

## What The Instructor Materials Emphasize

- Explain the intended workflow before describing the exploit.
- Keep evidence readable and relevant.
- Show the real fix in the correct backend, IAM, or cloud-configuration layer.
- Re-run the test after the fix and prove the vulnerable behavior is gone.
- Redact secrets, tokens, and sensitive URLs before anything goes into the repo or report.

## Immediate Execution Order

1. Deploy DVSA and capture the Website URL and core AWS resources.
2. Verify normal application behavior before exploit testing.
3. Work lesson-by-lesson, saving evidence as you go.
4. Write Parts 1 through 8 while the evidence is fresh.
5. Finish Tables A and B after both pre-fix and post-fix behavior are visible.

# ICS 344 DVSA Project

**Course:** ICS-344 Information Security | **Term:** 252 | **Region:** `us-east-1`
**Due:** 19 April 2026

## Repository Layout

```
├── report/                 # LaTeX report and compiled PDF
│   └── report-template.tex
├── evidence/               # Screenshots and logs per lesson
│   ├── lesson-01/ … lesson-10/
│   └── bonus/
├── scripts/                # Helper scripts (curl replays, JWT decode, etc.)
├── slides/                 # Presentation slide outline and final deck
├── notes/                  # Working notes (env inventory, tracker, checklist)
|
├── Helper Guide.pdf        # Instructor-provided helper guide
└── Project Description.pdf # Instructor-provided project description
```

## Quick Start
For any one who has curiosity and wants to learn about web application security and wants to try our project, here are our steps:
1. Deploy DVSA from the AWS Serverless Application Repository (see `Helper Guide.pdf`).
2. Work through each lesson: exploit → evidence → fix → verify.
3. Write each lesson into `report/report-template.tex` following the 10-part structure.
4. Store all screenshots in `evidence/lesson-XX/`.
5. Compile the report: `cd report && pdflatex report-template.tex`.

## Deliverables

- Written report (PDF)
- Presentation slides (PDF/PPTX)
- This GitHub repository
- Demo video

## Safety

DVSA is intentionally vulnerable. Use **only** a non-production AWS account.
Do not commit real AWS keys, tokens, or passwords to this repo.

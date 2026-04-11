# Report Workspace

The course brief requires the same 10-part structure for every official lesson:

1. Goal and Vulnerability Summary
2. Why This Works / Root Cause
3. Environment and Setup
4. Reproduction Steps
5. Evidence and Proof
6. Fix Strategy / Probable Mitigation
7. Code / Config Changes
8. Verification After Fix
9. Structured Operation and Security Analysis
10. Takeaway / Lessons Learned

Use:
- `cover-page-template.md` for the front matter
- `lesson-template.md` as the generic blank template
- `lessons/lesson-XX-*.md` as the working draft for each required lesson
- `report-template.tex` as the LaTeX report starter with the cover page, overview, and all 10 lesson chapters

The two structured tables in Part 9 are mandatory for every lesson.

If you want a PDF from the LaTeX template, compile `report-template.tex` with `pdflatex`.

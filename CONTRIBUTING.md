# Contributing to PAO Finder

First off, thank you for considering contributing to **PAO Finder**! This is a community-driven initiative aimed at improving access to justice for Filipinos.

Following these guidelines helps ensure the codebase remains readable, stable, and highly performant for citizens visiting from all regions of the country.

---

## 🛠️ Development Guidelines

1. **Keep it Accessible and Responsive:**
   - Always verify that UI updates render correctly on mobile widths.
   - Use clean semantic HTML and avoid adding unnecessary visual decorations to keep page sizes minimal.

2. **Strictly Adhere to the BetterGov Civic Theme:**
   - **Typography:** Use the `Figtree` font family.
   - **Colors:** Grounded design using solid color palettes (Deep Civic Blue `blue-900` for primary actions/branding, off-white `bg-slate-50` for backgrounds, slate for text, red for error/destructive states).
   - **No Emojis:** Use native vector icons from `lucide-vue-next` for all iconography.

3. **Data Integrity:**
   - When updating the offices list, do not modify compiled JSON databases directly.
   - Update the raw data in [PAO Offices.csv](apps/website/src/assets/PAO%20Offices.csv) and run:
     ```bash
     bun tools/compile-db.ts
     ```
     This ensures changes propagate cleanly to both frontend and backend configurations.

---

## 🚀 Pull Request Process

1. **Branch Naming Conventions:**
   - Features: `feat/feature-name`
   - Bug Fixes: `fix/bug-name`
   - Documentation/Refactoring: `chore/task-name`

2. **Commit Hooks & Quality Gates:**
   - This repository enforces format checking, linting, and type checking on commit hooks.
   - Before committing, always run:
     ```bash
     vp check --fix
     ```
     Make sure all tests pass and there are no warnings.

3. **Submitting your PR:**
   - Ensure your PR description clearly explains what change was made, which issue it resolves, and includes visual proof (screenshots or video recordings) for any UI changes.
   - Keep pull requests focused on a single feature or bug fix.

---

Thank you for helping build a better civic experience for the Filipino community!

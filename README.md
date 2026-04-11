# 🚀 Frontend Wizards — Stage 0 Task
## Build a Testable Todo Item Card

---

## 📌 Concept
Build a clean, modern **Todo / Task Card component** (or a small page containing one card).

---

## ⚠️ Required Content & Exact `data-testid` Values
> These must match exactly for automated tests.

- Root card container → `data-testid="test-todo-card"`
- Task title → `data-testid="test-todo-title"`
- Task description → `data-testid="test-todo-description"`
- Priority badge/label → `data-testid="test-todo-priority"`
  - Must show one of: `Low`, `Medium`, `High` (or emoji/icons)
- Due date → `data-testid="test-todo-due-date"`
  - Example: `"Due Feb 18, 2026"`
- Time remaining → `data-testid="test-todo-time-remaining"`
  - Examples:
    - `"Due in 3 days"`
    - `"Due tomorrow"`
    - `"Overdue by 2 hours"`
    - `"Due now!"`
  - Updates every **30–60 seconds** (or correct initial value)
- Status indicator → `data-testid="test-todo-status"`
  - Example: `Pending`, `In Progress`, `Done`
- Completion toggle → `data-testid="test-todo-complete-toggle"`
  - Must be:
    - `<input type="checkbox">`
    - OR accessible button with `role="checkbox"`
- Tags list → `data-testid="test-todo-tags"`
  - Optional individual tags:
    - `data-testid="test-todo-tag-work"`
    - `data-testid="test-todo-tag-urgent"`
- Edit button → `data-testid="test-todo-edit-button"`
- Delete button → `data-testid="test-todo-delete-button"`

---

## 🧱 HTML & Semantics Recommendations

Use proper semantic HTML:

- Card root → `<article>` or `<section role="region">`
- Title → `<h2>` or `<h3>`
- Description → `<p>`
- Priority & Status → `<span>` or `<strong>`
  - Add `aria-label` if visual-only
- Due date & time → `<time>` (with `datetime` if possible)
- Checkbox → `<input type="checkbox">` + `<label>`
- Tags:
  - `<ul role="list">` with `<li>`
  - OR `<div role="list">`
- Buttons → `<button>` (NOT `<div>`)
  - Add `aria-label` if icon-only

---

## ♿ Accessibility Requirements

- Checkbox must have:
  - Visible label OR
  - `aria-label` / `aria-labelledby`
- All buttons must have accessible names
- Priority & status badges:
  - Use `aria-label` if visual-only
- Maintain **WCAG AA color contrast**
- Focus styles must be visible
- Fully keyboard navigable:
  - `Tab → checkbox → edit → delete`
- Optional:
  - Use `aria-live="polite"` for time updates

---

## 📱 Responsiveness Requirements

### Mobile
- Full-width card
- Vertical stacked layout

### Tablet/Desktop
- Max-width: **420–500px**
- Good spacing & padding
- Tags wrap (`flex-wrap`)

### General
- No horizontal overflow
- Works from **320px → 1200px**

---

## ⚙️ Behaviour / Implementation Guidance

- Hard-code **1–3 tags** (e.g., `work`, `urgent`, `design`)
- Hard-code:
  - Priority
  - Status
  - Due date
  - Time remaining

### Time Remaining Logic
- Based on:
  - Fixed date (e.g., March 1, 2026 18:00 UTC)
  - OR `Date.now() + offset`
- Show friendly text:
  - `"Due in 3 days"`
  - `"Due tomorrow"`
  - `"Overdue by 2 hours"`
  - `"Due now!"`
- Optional:
  - Update every ~60 seconds (`setInterval`)

---

## ✅ Checkbox Toggle Behaviour

When toggled:
- Strike-through title
- Change status to `"Done"`

---

## ✏️ Edit & Delete Buttons

- Dummy actions are fine:
  ```js
  console.log("edit clicked");
  alert("Delete clicked");
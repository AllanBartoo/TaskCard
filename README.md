# Ticketify — Advanced Todo Card (Stage 1a)

## Overview

Ticketify is a single-card todo component built for the HNG 14 Frontend challenge.

In **Stage 1a**, the original static card from Stage 0 has been extended into a more interactive, stateful component with editing, status control, richer time logic, and improved accessibility.

---

## 🚀 What Changed from Stage 0

Stage 1a introduces real interactivity and state management:

- ✏️ Editable todo content (title, description, priority, due date)
- 🔄 Status transitions (Pending → In Progress → Done)
- 🎯 Dynamic priority indicators (Low / Medium / High)
- 📖 Expand / collapse long descriptions
- ⏱️ Smarter time handling with live updates and overdue states
- ♿ Improved accessibility patterns and keyboard flow
- 📱 Enhanced responsive layout behavior

---

## ✨ Features

### 📝 Editing Mode

- Enter edit mode via Edit button
- Inline form with:
  - Title input → `data-testid="test-todo-edit-title-input"`
  - Description textarea → `data-testid="test-todo-edit-description-input"`
  - Priority select → `data-testid="test-todo-edit-priority-select"`
  - Due date input → `data-testid="test-todo-edit-due-date-input"`
- Save & Cancel actions:
  - Save → `data-testid="test-todo-save-button"`
  - Cancel → `data-testid="test-todo-cancel-button"`
- Edit form container → `data-testid="test-todo-edit-form"`

**Behavior:**
- Save updates the UI instantly
- Cancel restores previous values
- Focus returns to Edit button after closing

---

### 🔄 Status Control System

- Interactive status selector → `data-testid="test-todo-status-control"`
- Allowed states:
  - Pending
  - In Progress
  - Done

**Logic sync:**
- Checkbox ↔ Status always synchronized
- Checking = Done
- Unchecking Done = Pending

---

### 🎯 Priority Indicator

- Visual indicator → `data-testid="test-todo-priority-indicator"`

**Dynamic styling:**
- Low → subtle
- Medium → moderate emphasis
- High → strong visual (accent/border/icon)

---

### 📖 Expand / Collapse Description

- Toggle button → `data-testid="test-todo-expand-toggle"`
- Collapsible container → `data-testid="test-todo-collapsible-section"`

**Behavior:**
- Auto-collapses long content
- Expand reveals full description
- Fully keyboard accessible

---

### ⏱️ Time Management Enhancements

- Live countdown updates every 30–60 seconds
- Granular messaging:
  - “Due in 2 days”
  - “Due in 3 hours”
  - “Due in 45 minutes”
  - “Overdue by 1 hour”

- Overdue indicator → `data-testid="test-todo-overdue-indicator"`

**Rules:**
- Overdue = visual red state + label
- When status = Done:
  - Timer stops
  - Displays: **Completed**

---

### 🎨 Visual State Changes

- **Done**
  - Strikethrough title
  - Muted styling

- **High Priority**
  - Strong visual emphasis

- **Overdue**
  - Red accent + badge

- **In Progress**
  - Distinct styling from Pending

---

## ♿ Accessibility

- All inputs include `<label for="">`
- Status control has accessible naming
- Expand/collapse uses:
  - `aria-expanded`
  - `aria-controls`
- Collapsible section has matching `id`
- Live time updates use:
  - `aria-live="polite"`

### Keyboard Navigation Order

- Fully tab-accessible
- Visible focus states maintained

---

## 📱 Responsiveness

Works across:

- 320px (mobile)
- 768px (tablet)
- 1024px+ (desktop)

**Behavior:**

- Mobile:
  - Edit form stacks vertically
  - Buttons expand full-width

- Desktop:
  - Status + Priority can align horizontally

**Edge cases handled:**

- Long titles
- Multi-line tags
- Very long descriptions

---

## 🧪 Acceptance Criteria Checklist

- ✅ All Stage 0 test IDs preserved
- ✅ All new test IDs implemented
- ✅ Edit mode fully functional
- ✅ Status + checkbox synchronization
- ✅ Expand/collapse accessible
- ✅ Overdue logic correct
- ✅ No layout breaking at any size
- ✅ Keyboard fully usable
- ✅ Time updates working
- ✅ Clean state management

---

## ⚙️ Getting Started

### Run locally

No build step required:

```bash
npx serve .
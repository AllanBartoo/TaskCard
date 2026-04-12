## Overview

Ticketify is a single-card todo item card for HNG 14 Frontend Stage 0 challenge. 
---

## Features

- **Live countdown** — calculates from a real due date and refreshes every 60 seconds
- **Checkbox toggle** — checking _Mark as complete_ strikes through the title and flips the status badge to Done
- **Urgency states** — time-remaining colour shifts: green (ok) → amber (today/urgent) → red (overdue)
- **Full keyboard navigation** — Tab order: checkbox → Edit → Delete, all with visible focus rings
- **Screen-reader friendly** — `aria-live` on the countdown, `aria-label` on all badges and buttons
- **Responsive layout** — stacks vertically on mobile, buttons go full-width below 480px

---

## Project Structure

```
ticketify/
  index.html   — markup and inline JS
  style.css    — all styles and responsive rules
  script.js    — component logic and interactivity
  README.md    — this file
```

---

## Getting Started

### Run locally

No build step required. Open `index.html` directly in a browser, or serve with any static server:

```bash
npx serve .
```

---

# Decisions Made

### No framework, no build step

The spec asked for a single card component. Reaching for React or a bundler would have introduced unnecessary complexity for what is essentially one HTML file. Vanilla HTML, CSS, and JS keeps the project instantly runnable — clone and open, no `npm install` required.

### CSS custom properties for the entire design system

All colours, spacing steps, and type sizes live on `:root` as custom properties. This makes the card trivially themeable and keeps magic numbers out of component styles entirely.

---

## Trade-offs

### Hard-coded content vs. data-driven

The card content (title, description, tags, due date) is hard-coded in HTML. A production component would accept props or a data object and render dynamically. For Stage 0 the spec explicitly asks for one hard-coded card, so the added complexity of a rendering layer wasn't justified — but the structure is designed to be easily refactorable into a dynamic component in the future.
const DUE_DATE = new Date("2026-04-16T23:59:00Z");

function getTimeRemaining() {
  const now = new Date();
  const diffMs = DUE_DATE - now;
  const absDiff = Math.abs(diffMs);
  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(absDiff / 3600000);
  const days = Math.floor(absDiff / 86400000);

  if (diffMs <= 0) {
    if (minutes < 60)
      return {
        text: `Overdue by ${minutes} min${minutes !== 1 ? "s" : ""}`,
        urgency: "overdue",
      };
    if (hours < 24)
      return {
        text: `Overdue by ${hours} hour${hours !== 1 ? "s" : ""}`,
        urgency: "overdue",
      };
    return {
      text: `Overdue by ${days} day${days !== 1 ? "s" : ""}`,
      urgency: "overdue",
    };
  }
  if (minutes < 60) return { text: "Due now!", urgency: "now" };
  if (hours < 24) return { text: "Due today", urgency: "urgent" };
  if (days === 1) return { text: "Due tomorrow", urgency: "urgent" };
  return { text: `Due in ${days} day${days !== 1 ? "s" : ""}`, urgency: "ok" };
}

function updateTimeRemaining() {
  const el = document.getElementById("time-remaining");
  if (!el) return;
  const { text, urgency } = getTimeRemaining();
  el.textContent = text;
  el.className = `task-time-remaining task-time-remaining--${urgency}`;
}

const checkbox = document.getElementById("todo-complete");
const card = document.querySelector('[data-testid="test-todo-card"]');
const statusBadge = document.getElementById("todo-status-badge");

checkbox.addEventListener("change", () => {
  const done = checkbox.checked;
  card.classList.toggle("is-complete", done);
  if (done) {
    statusBadge.textContent = "Done";
    statusBadge.className = "badge badge--status-done";
    statusBadge.setAttribute("aria-label", "Status: Done");
  } else {
    statusBadge.textContent = "Pending";
    statusBadge.className = "badge badge--status-pending";
    statusBadge.setAttribute("aria-label", "Status: Pending");
  }
});

document
  .querySelector('[data-testid="test-todo-edit-button"]')
  .addEventListener("click", () => console.log("edit clicked"));
document
  .querySelector('[data-testid="test-todo-delete-button"]')
  .addEventListener("click", () => alert("Delete clicked"));

updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);

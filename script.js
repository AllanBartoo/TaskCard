const taskView = document.querySelector(".tast-view");
const taskEdit = document.querySelector(".task-edit");
const title = document.getElementById("task-title");
const description = document.getElementById("task-description");
const statusBadge = document.getElementById("todo-status-badge");
const statusSelect = document.getElementById("todo-status");
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const checkbox = document.getElementById("todo-complete");
const form = document.querySelector('[data-testid="test-todo-edit-form"]');
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const priorityInput = document.getElementById("priority-input");
const dateInput = document.getElementById("date-input");
const saveBtn = document.getElementById("save--btn");
const cancelBtn = document.getElementById("cancel--btn");
const card = document.querySelector('[data-testid="test-todo-card"]');
const priorityText = document.querySelector(".priority-text");
const expandBtn = document.getElementById("expand-btn");
const timeRemaining = document.getElementById("time-remaining");
const overdueIndicator = document.getElementById("overdue-indicator");
const dueDate = document.getElementById("due-date");

const DUE_DATE = new Date("2026-04-17T23:59:00Z");
let isDone = false;
let todo = {};

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
  if (minutes < 60)
    return { text: "Due in less than an hour", urgency: "urgent" };
  if (hours < 24)
    return {
      text: `Due in ${hours} hour${hours !== 1 ? "s" : ""}`,
      urgency: "urgent",
    };
  if (days === 1) return { text: "Due tomorrow", urgency: "urgent" };
  return { text: `Due in ${days} day${days !== 1 ? "s" : ""}`, urgency: "ok" };
}

function updateTimeRemaining() {
  if (!timeRemaining) return;

  const { text, urgency } = getTimeRemaining();

  if (isDone) {
    timeRemaining.textContent = "Completed";
    timeRemaining.classList.remove(
      "task-time-remaining--overdue",
      "task-time-remaining--urgent",
      "task-time-remaining--ok",
    );
    timeRemaining.classList.add("task-time-remaining--done");
    return;
  }

  timeRemaining.textContent = text;

  timeRemaining.classList.remove(
    "task-time-remaining--overdue",
    "task-time-remaining--urgent",
    "task-time-remaining--ok",
  );

  timeRemaining.classList.add(`task-time-remaining--${urgency}`);

  const overdue = urgency === "overdue";
  if (overdueIndicator) overdueIndicator.hidden = !overdue;
  card.classList.toggle("is-overdue", overdue);
}

checkbox.addEventListener("change", () => {
  const done = checkbox.checked;
  card.classList.toggle("is-complete", done);
  setStatus(done ? "Done" : "Pending");

  if (isDone) {
    timeRemaining.textContent = "Completed";
    timeRemaining.classList.remove(
      "task-time-remaining--overdue",
      "task-time-remaining--urgent",
      "task-time-remaining--ok",
    );
    timeRemaining.classList.add("task-time-remaining--done");

    if (overdueIndicator) overdueIndicator.hidden = true;
    card.classList.remove("is-overdue");
  }
});

function setStatus(value) {
  const classMap = {
    Pending: "status-pending",
    "In Progress": "status-in-progress",
    Done: "status-done",
  };

  statusBadge.textContent = value;
  statusBadge.className = classMap[value];
  statusBadge.setAttribute("aria-label", `Status: ${value}`);

  statusSelect.value = value;
  checkbox.checked = value === "Done";

  isDone = value === "Done";

  card.classList.toggle("is-done", isDone);

  updateTimeRemaining(); 
}

expandBtn.addEventListener("click", () => {
  description.classList.toggle("collapsed");
  const isCollapsed = description.classList.contains("collapsed");
  expandBtn.textContent = isCollapsed ? "Show more" : "Show less";
  expandBtn.setAttribute("aria-expanded", String(!isCollapsed));
});

if (description.scrollHeight <= description.clientHeight) {
  expandBtn.style.display = "none";
}

function updateExpandVisibility() {
  requestAnimationFrame(() => {
    const isOverflowing =
      description.scrollHeight > description.clientHeight + 1;

    expandBtn.style.display = isOverflowing ? "inline" : "none";
  });
}

function resetDescriptionState() {
  description.classList.add("collapsed");
  expandBtn.textContent = "Show more";
  updateExpandVisibility();
}

saveBtn.addEventListener("click", () => {
  title.innerText = titleInput.value;
  description.innerText = descriptionInput.value;

  if (dateInput.value) {
    const date = new Date(dateInput.value);
    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
    dueDate.textContent = `Due ${formatted}`;
    dueDate.setAttribute("datetime", dateInput.value);
  }

  taskView.classList.remove("hidden");
  taskEdit.classList.add("hidden");
  updateExpandVisibility();
  editBtn.focus();
});

editBtn.addEventListener("click", () => {
  todo = {
    title: title.innerText,
    description: description.innerText,
    priority: priorityText.querySelector("span:not(.dot)").innerText,
    priorityClass: [...priorityText.classList].find(
      (c) => c.startsWith("priority-") && c !== "priority-text",
    ),
  };
  const currentDatetime = dueDate.getAttribute("datetime");
  if (currentDatetime) {
    dateInput.value = currentDatetime.split("T")[0];
  }

  titleInput.value = title.innerText.trim();
  descriptionInput.value = description.innerText.trim();
  priorityInput.value = todo.priority.trim();

  taskView.classList.add("hidden");
  taskEdit.classList.remove("hidden");
  titleInput.focus();
});

cancelBtn.addEventListener("click", () => {
  title.innerText = todo.title;
  description.innerText = todo.description;
  priorityText.querySelector("span:not(.dot)").textContent = todo.priority;
  priorityText.classList.remove(
    "priority-high",
    "priority-medium",
    "priority-low",
  );
  priorityText.classList.add(todo.priorityClass);

  taskView.classList.remove("hidden");
  taskEdit.classList.add("hidden");
  editBtn.focus();
});

document
  .querySelector('[data-testid="test-todo-delete-button"]')
  .addEventListener("click", () => alert("Delete clicked"));

statusSelect.addEventListener("change", () => {
  const value = statusSelect.value;
  setStatus(statusSelect.value);
  statusBadge.textContent = value;

  statusBadge.classList.remove(
    "status-pending",
    "status-in-progress",
    "status-done",
  );

  const classMap = {
    Pending: "status-pending",
    "In Progress": "status-in-progress",
    Done: "status-done",
  };

  statusBadge.classList.add(classMap[value]);
});

priorityInput.addEventListener("change", () => {
  const value = priorityInput.value;

  priorityText.querySelector("span:not(.dot)").textContent = value;

  priorityText.classList.remove(
    "priority-high",
    "priority-medium",
    "priority-low",
  );

  const classMap = {
    High: "priority-high",
    Medium: "priority-medium",
    Low: "priority-low",
  };

  priorityText.classList.add(classMap[value]);
  priorityText.setAttribute("aria-label", `${value} priority`);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

updateTimeRemaining();
setInterval(updateTimeRemaining, 30000);

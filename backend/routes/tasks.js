const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../middleware/dbHandler");
const authenticate = require("../middleware/auth");

router.patch("/:id", authenticate, (req, res) => {
  const db = readDB();
  const { title, description, status, priority, assignee_id, due_date } =
    req.body;

  const index = db.tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "not found" });

  const task = db.tasks[index];

  const errors = {};

  const validStatuses = ["todo", "inprogress", "completed"];
  if (status && !validStatuses.includes(status)) {
    errors.status = "must be todo, inprogress, or completed";
  }

  const validPriorities = ["low", "medium", "high"];
  if (priority && !validPriorities.includes(priority)) {
    errors.priority = "must be low, medium, or high";
  }

  if (assignee_id) {
    const userExists = db.users.some((u) => u.id === assignee_id);
    if (!userExists) {
      errors.assignee_id = "user does not exist";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: "validation failed",
      fields: errors,
    });
  }

  db.tasks[index] = {
    ...task,
    title: title !== undefined ? title : task.title,
    description: description !== undefined ? description : task.description,
    status: status !== undefined ? status : task.status,
    priority: priority !== undefined ? priority : task.priority,
    assignee_id: assignee_id !== undefined ? assignee_id : task.assignee_id,
    due_date: due_date !== undefined ? due_date : task.due_date,
    updated_at: new Date().toISOString(),
  };

  writeDB(db);
  res.json(db.tasks[index]);
});

router.delete("/:id", authenticate, (req, res) => {
  const db = readDB();
  const taskId = req.params.id;

  const task = db.tasks.find((t) => t.id === taskId);
  if (!task) return res.status(404).json({ error: "not found" });

  const project = db.projects.find((p) => p.id === task.project_id);

  const isOwner = project && project.owner_id === req.user.id;
  const isCreator = task.creator_id === req.user.id;

  if (!isOwner && !isCreator) {
    return res.status(403).json({ error: "forbidden" });
  }

  db.tasks = db.tasks.filter((t) => t.id !== taskId);
  writeDB(db);

  res.status(200).json({
    message: "Task deleted successfully",
    id: taskId,
  });
});

module.exports = router;

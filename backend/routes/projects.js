const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../middleware/dbHandler");
const authenticate = require("../middleware/auth");

router.get("/", authenticate, (req, res) => {
  const db = readDB();
  const userId = req.user.id;

  const accessibleProjects = db.projects.filter((project) => {
    const isOwner = project.owner_id === userId;

    // Check if they are assigned to any task in this project
    const isAssignee = db.tasks.some(
      (task) => task.project_id === project.id && task.assignee_id === userId,
    );

    return isOwner || isAssignee;
  });

  res.json({ projects: accessibleProjects });
});

router.post("/", authenticate, (req, res) => {
  const db = readDB();
  const { name, description } = req.body;

  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "is required";
  } else if (name.length > 100) {
    errors.name = "must be under 100 characters";
  }

  if (description !== undefined && typeof description !== "string") {
    errors.description = "must be a string";
  } else if (description && description.length > 500) {
    errors.description = "must be under 500 characters";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: "validation failed",
      fields: errors,
    });
  }

  const newProject = {
    id: `p${Date.now()}`,
    name: name.trim(),
    description: description ? description.trim() : "",
    owner_id: req.user.id,
    created_at: new Date().toISOString(),
  };

  db.projects.push(newProject);
  writeDB(db);

  res.status(201).json(newProject);
});

router.get("/:id", authenticate, (req, res) => {
  const db = readDB();
  const projectId = req.params.id;

  if (!projectId || projectId === ":id") {
    return res.status(400).json({
      error: "validation failed",
      fields: { id: "is invalid or missing" },
    });
  }

  const project = db.projects.find((p) => p.id === projectId);
  if (!project) {
    return res.status(404).json({ error: "not found" });
  }

  const userHasTasks = db.tasks.some(
    (t) => t.project_id === projectId && t.assignee_id === req.user.id,
  );
  const isOwner = project.owner_id === req.user.id;

  if (!isOwner && !userHasTasks) {
    return res.status(403).json({ error: "forbidden" });
  }

  const tasks = db.tasks.filter((t) => t.project_id === projectId);

  res.json({
    ...project,
    tasks,
  });
});

router.delete("/:id", authenticate, (req, res) => {
  const db = readDB();
  const projectId = req.params.id;

  if (!projectId || projectId === ":id") {
    return res.status(400).json({
      error: "validation failed",
      fields: { id: "is invalid or missing" },
    });
  }

  const project = db.projects.find((p) => p.id === projectId);
  if (!project) {
    return res.status(404).json({ error: "not found" });
  }

  if (project.owner_id !== req.user.id) {
    return res.status(403).json({ error: "forbidden" });
  }

  db.projects = db.projects.filter((p) => p.id !== projectId);
  db.tasks = db.tasks.filter((t) => t.project_id !== projectId);

  writeDB(db);

  res.status(204).send();
});

router.post("/:id/tasks", authenticate, (req, res) => {
  const db = readDB();
  const { title, description, priority, assignee_id, due_date } = req.body;

  const errors = {};

  if (!title || title.trim() === "") {
    errors.title = "is required";
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

  if (due_date && isNaN(Date.parse(due_date))) {
    errors.due_date = "must be a valid date string";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: "validation failed",
      fields: errors,
    });
  }

  const newTask = {
    id: `t${Date.now()}`,
    project_id: req.params.id,
    creator_id: req.user.id,
    title: title.trim(),
    description: description || "",
    status: "todo", // Default status as per spec
    priority: priority || "medium",
    assignee_id: assignee_id || null,
    due_date: due_date || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.tasks.push(newTask);
  writeDB(db);

  res.status(201).json(newTask);
});

router.patch("/:id", authenticate, (req, res) => {
  const db = readDB();
  const { name, description } = req.body;

  const projectIndex = db.projects.findIndex((p) => p.id === req.params.id);
  if (projectIndex === -1) {
    return res.status(404).json({ error: "not found" });
  }

  const project = db.projects[projectIndex];

  if (project.owner_id !== req.user.id) {
    return res.status(403).json({ error: "forbidden" });
  }

  const errors = {};

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      errors.name = "cannot be empty or must be a string";
    } else if (name.length > 100) {
      errors.name = "must be under 100 characters";
    }
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      errors.description = "must be a string";
    } else if (description.length > 500) {
      errors.description = "must be under 500 characters";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: "validation failed",
      fields: errors,
    });
  }

  const updatedProject = {
    ...project,
    name: name !== undefined ? name.trim() : project.name,
    description:
      description !== undefined ? description.trim() : project.description,
    updated_at: new Date().toISOString(), // Good practice to track updates
  };

  db.projects[projectIndex] = updatedProject;
  writeDB(db);

  res.json(updatedProject);
});

router.get("/:id/tasks", authenticate, (req, res) => {
  const db = readDB();
  const projectId = req.params.id;
  const { status, assignee } = req.query;

  if (!projectId || projectId === ":id") {
    return res.status(400).json({
      error: "validation failed",
      fields: { id: "is invalid or missing" },
    });
  }

  const project = db.projects.find((p) => p.id === projectId);
  if (!project) {
    return res.status(404).json({ error: "not found" });
  }

  let tasks = db.tasks.filter((t) => t.project_id === projectId);

  if (status && status.trim() !== "") {
    tasks = tasks.filter((t) => t.status === status);
  }

  if (assignee && assignee.trim() !== "") {
    tasks = tasks.filter((t) => t.assignee_id === assignee);
  }

  res.json(tasks);
});

module.exports = router;

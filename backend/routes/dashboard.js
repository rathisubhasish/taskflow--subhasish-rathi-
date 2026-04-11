const express = require("express");
const router = express.Router();
const { readDB } = require("../middleware/dbHandler");
const authenticate = require("../middleware/auth");

router.get("/stats", authenticate, (req, res) => {
  const db = readDB();
  const now = new Date();

  const allProjects = db.projects || [];

  const allTasks = db.tasks || [];
  const taskStats = {
    total: allTasks.length,
    todo: allTasks.filter((t) => t.status === "todo").length,
    inprogress: allTasks.filter((t) => t.status === "inprogress").length,
    completed: allTasks.filter((t) => t.status === "completed").length,
    overdue: allTasks.filter((t) => {
      return (
        t.status !== "completed" && t.due_date && new Date(t.due_date) < now
      );
    }).length,
  };

  // 3. User Stats
  const userStats = {
    totalUsers: (db.users || []).length,
  };

  res.json({
    projects: {
      total: allProjects.length,
    },
    tasks: taskStats,
    users: userStats,
    timestamp: now.toISOString(),
  });
});

module.exports = router;

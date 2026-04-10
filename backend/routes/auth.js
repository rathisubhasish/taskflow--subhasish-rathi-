const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { readDB, writeDB } = require("../middleware/dbHandler");
const authenticate = require("../middleware/auth");

const SECRET_KEY = "taskflow_secret_key";

router.get("/users", authenticate, (req, res) => {
  const db = readDB();
  const userList = db.users.map(({ id, name, email }) => ({ id, name, email }));
  res.json(userList);
});

router.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  const db = readDB();

  if (!email || !password || !name) {
    return res.status(400).json({
      error: "validation failed",
      fields: {
        email: email ? null : "is required",
        name: name ? null : "is required",
        password: password ? null : "is required",
      },
    });
  }

  if (db.users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "User exists" });
  }

  const newUser = {
    id: `u${Date.now()}`,
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    created_at: new Date().toISOString(),
  };

  db.users.push(newUser);
  writeDB(db);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, {
    expiresIn: "24h",
  });

  res.status(201).json({
    user: { id: newUser.id, name, email },
    accessToken: token,
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  if (!email || !password) {
    return res.status(400).json({
      error: "validation failed",
      fields: {
        email: email ? null : "is required",
        password: password ? null : "is required",
      },
    });
  }

  const user = db.users.find((u) => u.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      accessToken: token,
    });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;

module.exports = (req, res, next) => {
  const { email, password, name } = req.body;
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
  next();
};

const pool = require("../connectionDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ---------------- FIND USER ----------------

const findUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const response = await pool.query(
      "SELECT id, name, username FROM users WHERE username = $1",
      [username]
    );

    if (response.rows.length === 0) {
      return res.status(404).send({
        Message: "User not found!",
      });
    }

    res.status(200).send({
      User: response.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
};

// ---------------- CREATE ACCOUNT ----------------

const createAccount = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (password.length < 10) {
      return res.status(400).send({
        Message: "The password must contain at least 10 characters.",
      });
    }

    const userExists = await pool.query(
      "SELECT 1 FROM users WHERE username = $1",
      [username]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).send({
        Message: "Username already in use",
      });
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const response = await pool.query(
      `
      INSERT INTO users (name, username, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, username
      `,
      [name, username, bcryptPassword]
    );

    res.status(201).send({
      Message: "User created successfully",
      User: response.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
};

// ---------------- CHANGE PASSWORD ----------------

const changePassword = async (req, res) => {
  try {
    const { username } = req.params;
    const { password: newPassword } = req.body;

    const responseUser = await pool.query(
      "SELECT id, username FROM users WHERE username = $1",
      [username]
    );

    if (responseUser.rows.length === 0) {
      return res.status(404).send({
        Message: "User not found!",
      });
    }

    if (newPassword.length < 10) {
      return res.status(400).send({
        Message: "The password must contain at least 10 characters.",
      });
    }

    const bcryptNewPassword = await bcrypt.hash(newPassword, 10);

    const responsePassword = await pool.query(
      "UPDATE users SET password = $1 WHERE username = $2 RETURNING id, name, username",
      [bcryptNewPassword, username]
    );

    res.status(200).send({
      Message: "Password changed successfully.",
      User: responsePassword.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
};

// ---------------- LOGIN ----------------

const login = async (req, res) => {
  const { username, password } = req.body;

  const responseUser = await pool.query(
    "SELECT id, name, username, password FROM users WHERE username = $1",
    [username]
  );

  if (responseUser.rows.length === 0) {
    return res.status(404).send({
      Message: "User not found!",
    });
  }

  const user = responseUser.rows[0];

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Incorrect password.",
    });
  }

  const tokenJWT = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    Message: "Authentication successfully.",
    User: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
    Token: tokenJWT,
  });
};

module.exports = {
  findUserByUsername,
  createAccount,
  changePassword,
  login,
};

import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import bcrypt from "bcryptjs";

export const login = (req, res, next) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!data.length) {
      return res.status(409).json("USER DOESNT EXIST. REGISTER FIRST");
    }

    const checkPswrd = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPswrd) {
      return res.status(400).json("WRONG USERNAME OR PASSWORD");
    }

    const { password, ...others } = data[0]; //extract out password so we dont send it directly to the browser

    const token = jwt.sign(
      { id: data[0].id },
      "hello_i_like_circus_charlie_game"
    );

    res
      .cookie("jwtToken", token, {
        httpOnly: true, //prevents from extracting cookie via javascript
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res, next) => {
  res.send("LOGOUT");
};

export const register = (req, res, next) => {
  // const q = `SELECT * FROM users WHERE username = ${req.body.username}`  THIS IS VULNERABLE TO SQL INJECTIONS
  console.log(req.body);

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length) {
      return res.status(409).json("USER EXISTS");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPswrd = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users(username , email , password, name) VALUES (?, ?, ?, ?)";

    db.query(
      q,
      [req.body.username, req.body.email, hashPswrd, req.body.name],
      (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("USER CREATED");
      }
    );
  });
};

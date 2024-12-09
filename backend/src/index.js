import express from "express";
import cors from "cors";
import dbClient from "./utils/DatabaseConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";

let app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
env.config({
  path: "../.env",
});

let client = dbClient();
client.connect();

let saltRounds = 10;

app.post("/api/SignUp", (req, res) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, saltRounds)
    .then(function (hash) {
      client
        .query("SELECT email_id FROM user_accounts WHERE email_id=$1", [email])
        .then((data) => {
          if (data.rowCount == 0) {
            client
              .query(
                "INSERT INTO user_accounts(email_id,password) VALUES($1,$2)",
                [email, hash]
              )
              .then(() => {
                res.status(201).send();
              })
              .catch((err) => {
                console.log(
                  "Issue with insertion into Accounts Database: " + err
                );
              });
          } else {
            res.json({ message: "Email Already Taken" });
          }
        })
        .catch((err) => {
          console.log("Issue with SingUp Database check: " + err);
        });
    })
    .catch((err) => {
      console.log("Problem in hashing password: " + err);
    });
});

function generateAccssToken(email) {
  return jwt.sign({ userID: email }, process.env.JWT_SECRET, {
    expiresIn: 30,
  });
}

function generateRefreshToken(email) {
  return jwt.sign({ userID: email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: 60,
  });
}

app.get("/api/auth", (req, res) => {
  let accessToken = req.headers.authorization.split(" ")[1];
  let refreshToken = req.headers.cookie.split("=")[1];
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, decode) => {
    if (error) {
      res.status(401).clearCookie("_myRefreshToken").send();
    } else {
      jwt.verify(accessToken, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          let newAccessToken = generateAccssToken(decode.userID);
          res.status(201).json({
            jwt_token: newAccessToken,
          });
        } else {
          res.status(200).send();
        }
      });
    }
  });
});

app.post("/api/Login", (req, res) => {
  const { email, password } = req.body;
  client
    .query("SELECT * FROM user_accounts WHERE email_id=$1", [email])
    .then((data) => {
      if (data.rowCount != 0) {
        bcrypt
          .compare(password, data.rows[0].password)
          .then(function (result) {
            if (result) {
              let accessToken = generateAccssToken(email);
              let refreshToken = generateRefreshToken(email);

              res
                .status(200)
                .cookie("_myRefreshToken", refreshToken, {
                  //secure: true,
                  httpOnly: true,
                  //sameSite: "none",
                  path: "/api/auth",
                })
                .json({ jwt_token: accessToken });
            } else {
              res.status(401).send();
            }
          })
          .catch((err) => {
            console.log("Problem with hash comparison: " + err);
          });
      } else {
        res.status(404).send();
      }
    })
    .catch((err) => {
      console.log("Problem with querying database: " + err);
    });
});

app.listen(PORT, () => {
  console.log("Server Live On PORT: " + PORT);
});

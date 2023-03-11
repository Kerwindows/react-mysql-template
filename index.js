require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./config/db");
const {
  getUsers,
  getUser,
  regUser,
  updateUser,
  deleteUser,
  getLinks,
  getFiles,
  updateBio,
} = require("./models");

const allowedOrigins = [
  "http://localhost:3001",
  "https://react-mysql.kerwindows.com",
  "https://www.react-mysql.kerwindows.com",
];

const app = express();
app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Route to get all posts
app.get("/api/users", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // Add the CORS header
  await getUsers()
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      res.status(400).send({ error: `no records found - ${err}` });
    });
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log("Server is running");
});

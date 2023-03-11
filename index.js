// require("dotenv").config();
const express = require("express");
const db = require("./config/db");
// const helmet = require("helmet");
const cors = require("cors");

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
const PORT = 3000;
const app = express();
// app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
// app.use(cors()); // enable CORS for all origins
app.use(express.json());

// Route to get all posts
app.get("/api/users", async (req, res) => {
  await getUsers()
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      res.status(400).send({ error: `no records found - ${err}` });
    });
});

app.get("/api/user/:username", async (req, res) => {
  const username = req.params.username;
  await getUser(username)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ error: `${err.message}` });
      } else {
        res.status(500).send({ error: "internal server error" });
      }
    });
});
app.get("/api/links/:id", async (req, res) => {
  const id = req.params.id;
  await getLinks(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ error: `${err.message}` });
      } else {
        res.status(500).send({ error: "internal server error" });
      }
    });
});
app.get("/api/files/:id", async (req, res) => {
  const id = req.params.id;
  await getFiles(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ error: `${err.message}` });
      } else {
        res.status(500).send({ error: "internal server error" });
      }
    });
});
// Route for creating the post
app.post("/api/create", async (req, res) => {
  const data = req.body;
  await regUser(data)
    .then((result) => res.send(result))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: "invalid user data" - `${err}` });
      } else {
        res.status(500).send({ Message: "internal error" });
      }
    });
});

// Route for like
app.patch("/api/bio/:username", async (req, res) => {
  const username = req.params.username;
  const data = req.body;
  await updateBio(data, username)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: "invalid user data" - `${err}` });
      } else {
        res.status(500).send({ Message: "internal error" });
      }
    });
});
// Route to delete a post

// Route for like
app.patch("/api/update/:username", async (req, res) => {
  const username = req.params.username;
  const data = req.body;
  await updateUser(data, username)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: "invalid user data" - `${err}` });
      } else {
        res.status(500).send({ Message: "internal error" });
      }
    });
});
// Route to delete a post

app.delete("/api/delete/:id", async (req, res) => {
  const id = req.params.id;
  await deleteUser(id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: "invalid user data" - `${err}` });
      } else {
        res.status(500).send({ Message: "internal error" });
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const express = require("express");
const db = require("./config/db");
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

const app = express();

const PORT = 3000;
app.use(cors());
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

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log("Server is running");
});

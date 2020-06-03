// import express
const express = require("express");
const shortid = require("shortid");
const idG = shortid.generate();

// create a server
const server = express();

// middleware

server.use(express.json());

let users = [
  {
    id: 1,
    name: "cody",
    bio: "I am an aspiring full stack web dev, backend is awesome.",
  },
  {
    id: 2,
    name: "kade",
    bio: "this is a test.",
  },
  {
    id: 3,
    name: "dalton",
    bio: "I am a test.",
  },
  {
    id: 4,
    name: "andrew",
    bio: "I am another test.",
  },
];

// a function to handle POST/ requests
server.post("/api/users", (req, res) => {
  const user = req.body;
  users.push(user);
  user.id && user.name && user.bio
    ? res.status(200).json(users)
    : res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
});

// a function to handle GET/ requests
server.get("/api/users", (req, res) => {
  users
    ? res.status(200).json(users)
    : res.status(500).json({
        errorMessage: "The users information could not be retrieved.",
      });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  user = users.filter((user) => user.id == { id });
  if (!user.id) {
    res.status(404).json({
      errorMessage: "The user with the specified ID does not exist",
    });
  } else if (!user) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  } else {
    res.status(200).json(user);
  }
});

// a funciton to handle delete requests
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const remove = users.filter((user) => user.id == id);

  if (id === undefined) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!remove) {
    res.status(500).json({ errorMessage: "The user could not be removed." });
  } else {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(remove);
  }
});

// a function to handle put requests

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const update = req.body;

  update.id = id;

  if (id === undefined) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (
    update.name === null ||
    update.bio === null ||
    update.name === "" ||
    update.bio === ""
  ) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!update) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  } else {
    users = users.filter((user) => user.id !== id);
    users.push(update);
    res.status(200).json(update);
  }
});

// listen to server port
const port = 9000;

server.listen(port, () => {
  console.log(`\n == API on port ${port} == \n`);
});

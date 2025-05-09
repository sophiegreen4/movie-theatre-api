const express = require("express");
const { Movie, User } = require("../models/index.js");

const router = express.Router();

router.post("/", async function (req, res) {
  const user = await User.create(req.body);
  res.status(201).send(user);
});

router.get("/", async function (req, res) {
  // TODO: Get all users.
  const users = await User.findAll();
  res.json(users);
});

router.get("/:userId", async function (req, res) {
  // TODO: Get one user.
  const user = await User.findByPk(req.params.userId);
  res.json(user);
});

router.patch("/:userId", async function (req, res) {
  // TODO: Update one user.
  const user = await User.findByPk(req.params.userId);
    if (!user){
      res.status(404).json({ error: "User not found"});
    }else{
      await user.update(req.body);
      res.json(user);
    }
});

router.delete("/:userId", async function (req, res) {
  // TODO: Delete one user.
  const user = await User.findByPk(req.params.userId);
  if (user){
    await user.destroy();
    res.status(204).send();
  } else{
    res.status(404).send();
  }
});

router.get("/:userId/movies", async function (req, res) {
  // TODO: Get all movies watched by one user.
  const user = await User.findByPk(req.params.userId);
  if (user){
    const movies = await user.getMovies();
    res.status(200).send(movies);
  } else{
    res.status(404).send();
  }
});

router.post("/:userId/movies/:movieId", async function (req, res) {
  // TODO: Associate a user with a movie they have watched.
  // HINT: No body required; all the required info is in the params!
  const movie = await Movie.findByPk(req.params.movieId);
  const user = await User.findByPk(req.params.userId)
  if (!movie || !user) {
    return res.status(404).send();
  } else {
    await user.addMovie(movies);
    res.status(200).send();
  }
});

module.exports = router;

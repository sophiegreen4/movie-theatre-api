const express = require("express");
const { Movie, User } = require("../models/index.js");

const router = express.Router();

router.post("/", async function (req, res) {
  const movie = await Movie.create(req.body);
  res.status(201).send(movie);
});


router.get("/", async function (req, res) {
  const movies = await Movie.findAll();
  res.json(movies);
});

router.get("/:movieId", async function (req, res) {
  const movie = await Movie.findByPk(req.params.movieId);
  res.json(movie);
});

router.patch("/:movieId", async function (req, res) {
  const movie = await Movie.findByPk(req.params.movieId);
    if (!movie){
      res.status(404).json({ error: "Movie not found"});
    }else{
      await movie.update(req.body);
      res.json(movie);
    }
});

router.delete("/:movieId", async function (req, res) {
  const movie = await Movie.findByPk(req.params.movieId);
  if (movie){
    await movie.destroy();
    res.status(204).send();
  } else{
    res.status(404).send();
  }
});

router.get("/:movieId/users", async function (req, res) {
  const movie = await Movie.findByPk(req.params.movieId);
  if (movie){
    const users = await movie.getUsers();
    res.status(200).send(users);
  } else{
    res.status(404).send([]);
  }
});

router.post("/:movieId/users/:userId", async function (req, res) {
  const movie = await Movie.findByPk(req.params.movieId);
  const user = await User.findByPk(req.params.userId)
  if (!movie || !user) {
    return res.status(404).send();
  } else {
    await movie.addUser(user);
    res.status(200).send();
  }
});

module.exports = router;

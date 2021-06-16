const express = require("express");
const router = express.Router();
const passport = require("passport");
const MovieController = require("../controllers/movieController");
const MovieService = require("../services/movieService");
const MovieInstance = new MovieController(new MovieService());
const UserController = require("../controllers/userController");
const UserService = require("../services/userService");
const UserInstance = new UserController(new UserService());

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });

const checkAdmin = require("../utils/checkAdmin");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("hola");
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  return res.send("Logueado con exito");
});

router.get("/movies", (req, res, next) => {
  MovieInstance.getMovies(req, res);
});

router.get("/movies/:id", checkAdmin, (req, res, next) => {
  MovieInstance.getMovieById(req, res);
});

router.post(
  "/movies",
  checkAdmin,
  upload.single("avatar"),
  (req, res, next) => {
    MovieInstance.addMovie(req, res);
  }
);

router.put(
  "/movies/edit/:id",
  checkAdmin,
  upload.single("avatar"),
  (req, res, next) => {
    MovieInstance.modifyMovie(req, res);
  }
);

router.delete("/movies/delete/:id", checkAdmin, (req, res, next) => {
  MovieInstance.deleteMovie(req, res);
});

router.get("/users", (req, res, next) => {
  UserInstance.getUsers(req, res);
});

router.get("/users/:id", (req, res, next) => {
  UserInstance.getUserById(req, res);
});

router.post("/users", (req, res, next) => {
  UserInstance.addUser(req, res);
});

router.put(
  "/users/edit/:id",
  checkAdmin,

  (req, res, next) => {
    UserInstance.modifyUser(req, res);
  }
);

router.delete("/users/delete/:id", checkAdmin, (req, res, next) => {
  UserInstance.deleteUser(req, res);
});

module.exports = router;

function checkAdmin(req, res, next) {
  if (req.user) {
    if (req.user.isAdmin) {
      console.log("El user es Admin");
      next();
    } else {
      console.log("No es Admin");
      res.status(403).send("no sos admin");
    }
  } else {
    console.log("no hay user logueado");
    res.status(401).send("no hay user logueado");
  }
}

module.exports = checkAdmin;

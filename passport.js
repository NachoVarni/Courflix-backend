const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserService = require("./services/userService");
const UserInstance = new UserService();

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
    },
    async (username, password, cb) => {
      try {
        console.log(username);
        const userData = await UserInstance.getByName(username);
        console.log(userData);
        if (!userData) {
          // Este usuario esta mal
          console.log("entro al primero");
          return cb(null, false);
        }

        console.log(userData.password, password);

        const compare = await bcrypt.compare(password, userData.password);
        console.log(compare, "123");

        if (!compare) {
          // Este usuario esta mal
          console.log("entro al primero");
          return cb(null, false);
        }
        // Este usuario esta bien
        console.log(userData);
        console.log("todo esta bien");
        return cb(null, userData);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.name);
});

passport.deserializeUser(async (name, cb) => {
  const data = await UserInstance.getByName(name);
  cb(null, data);
});

const bcrypt = require("bcrypt");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getUsers(req, res) {
    try {
      const response = await this.userService.getUsers();
      res.status(200).send(response);
    } catch (e) {
      console.log(e);
      res.status(500).send("Error en el service");
    }
  }

  async getUserById(req, res) {
    if (req.params.id) {
      try {
        const { id } = req.params;
        const response = await this.userService.getUserById(id);
        res.status(200).send(response);
      } catch (e) {
        console.log(e);
        res.status(500).send("Error en el service");
      }
    } else {
      res.status(400).send("Falta el ID del usuario");
    }
  }

  async addUser(req, res) {
    if (!req.user) {
      if (req.body.name) {
        try {
          const users = await this.userService.getUsers();
          const usernames = [];
          users.map((user) => {
            usernames.push(user.name);
          });
          if (!usernames.includes(req.body.name)) {
            const { body } = req;
            const hash = await bcrypt.hash(body.password, 10);
            body.password = hash;
            const response = await this.userService.addUser(body);
            res.status(201).send("Usuario creado");
          } else {
            res.status(400).send("El usuario ya existe");
          }
        } catch (e) {
          console.log(e);
          res.status(500).send("Error en el service");
        }
      } else {
        res.status(400).send("No se pudo crear el usuario");
      }
    } else {
      res.status(400).send("No debe estar logueado para crear un usuario");
    }
  }

  async modifyUser(req, res) {
    if (req.user) {
      if (req.params.id && req.body) {
        try {
          const { id } = req.params;
          const { body } = req;
          const response = await this.userService.modifyUser(id, body);
          res.status(202).send("Usuario modificado");
        } catch (e) {
          console.log(e);
          res.status(500).send("Error en el service");
        }
      } else {
        res.status(400).send("Error en la modificacion");
      }
    } else {
      res.status(401).send("No estas logueado");
    }
  }

  async deleteUser(req, res) {
    if (req.user) {
      if (req.params.id) {
        try {
          const { id } = req.params;
          const response = await this.userService.deleteUser(id);
          res.status(200).send(response);
        } catch (e) {
          console.log(e);
          res.status(500).send("Error en el service");
        }
      } else {
        res.status(400).send("No se envio el ID");
      }
    } else {
      res.status(401).send("No estas logueado");
    }
  }
}

module.exports = UserController;

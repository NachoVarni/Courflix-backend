class MovieController {
  constructor(movieService) {
    this.movieService = movieService;
  }

  async getMovies(req, res) {
    if (req.user) {
      try {
        const response = await this.movieService.getMovies();
        res.status(200).send(response);
      } catch (e) {
        console.log(e);
        res.status(500).send("Error en el service");
      }
    } else {
      res.status(401).send("No hay user logueado");
    }
  }

  async getMovieById(req, res) {
    if (req.user) {
      if (req.params.id) {
        try {
          const { id } = req.params;
          const response = await this.movieService.getMovieById(id);
          res.status(202).send(response);
        } catch (e) {
          console.log(e);
          res.status(500).send("Error en el service");
        }
      } else {
        res.status(400).send("Falla en el ID");
      }
    } else {
      res.status(401).send("No hay user logueado");
    }
  }

  async addMovie(req, res) {
    if (req.user) {
      if (req.body.name) {
        try {
          const { body } = req;
          const { filename } = req.file;
          console.log(req.file);
          const newBody = {
            name: body.name,
            category: body.category,
            type: body.type,
            image: filename,
          };
          const response = await this.movieService.addMovie(newBody);
          console.log(response);
          res.status(201).send(`Pelicula creada`);
        } catch (e) {
          console.log(e);
          res.status(500).send("Error en el service");
        }
      } else {
        res.status(400).send("Error en la carga de datos");
      }
    } else {
      res.status(401).send("No hay user logueado");
    }
  }

  async modifyMovie(req, res) {
    if (req.user) {
      if (req.params.id && req.body) {
        try {
          const { body } = req;
          console.log(req.file);
          const { id } = req.params;
          const newBody = {
            name: body.name,
            category: body.category,
            type: body.type,
            image: req.file.filename,
          };
          const response = await this.movieService.modifyMovie(id, newBody);
          res.status(202).send("Pelicula modificada");
        } catch (e) {
          console.log(e);
          res.status(500).send("Error en el service");
        }
      } else {
        res.status(400).send("Error en la carga de datos");
      }
    } else {
      res.status(401).send("No hay user logueado");
    }
  }

  async deleteMovie(req, res) {
    if (req.user) {
      if (req.params.id) {
        try {
          const { id } = req.params;
          const response = await this.movieService.deleteMovie(id);
          res.status(200).send("Pelicula borrada");
        } catch (e) {
          console.log(e);
          res.status(500).send("Error en el service");
        }
      } else {
        res.status(400).send("Error en la carga de ID");
      }
    } else {
      res.status(401).send("No hay user logueado");
    }
  }
}

module.exports = MovieController;

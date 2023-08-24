const { Router } = require("express");
const UsersController = require("../controller/UsersController");

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.delete("/:user_id", usersController.delete);

module.exports = usersRoutes;
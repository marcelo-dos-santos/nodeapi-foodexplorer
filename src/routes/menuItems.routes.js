const { Router } = require("express");
const MenuItemsController = require("../controller/MenuItemsController");

const menuitemsController = new MenuItemsController();

const menuitemsRoutes = Router();

menuitemsRoutes.post("/", menuitemsController.create);
menuitemsRoutes.get("/", menuitemsController.index);
menuitemsRoutes.patch("/:id", menuitemsController.update);
menuitemsRoutes.delete("/:id", menuitemsController.remove);

module.exports = menuitemsRoutes;
const { Router } = require("express");
const CartItemsController = require("../controller/CartItemsController");

const cartitemsController = new CartItemsController();

const cartitemsRoutes = Router();

cartitemsRoutes.post("/:user_id", cartitemsController.addToCart);
cartitemsRoutes.delete("/:user_id/:item_id", cartitemsController.removeFromCart);
cartitemsRoutes.get("/:user_id", cartitemsController.index);

module.exports = cartitemsRoutes;
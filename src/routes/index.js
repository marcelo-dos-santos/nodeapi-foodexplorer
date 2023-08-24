const { Router } = require("express");

const routes = Router();

const usersRouter = require("./users.routes");
const menuitemsRouter = require("./menuitems.routes");
const cartitemsRouter = require("./cartItems.routes");
const { ordersRoutes, orderItemsRoutes } = require("./orders.routes");

routes.use("/users", usersRouter);
routes.use("/menu_items", menuitemsRouter);
routes.use("/cart_items", cartitemsRouter);
routes.use("/orders", ordersRoutes);
routes.use("/order_items", orderItemsRoutes);

module.exports = routes;

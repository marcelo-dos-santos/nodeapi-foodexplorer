const { Router } = require("express");
const { OrdersController, OrderItemsController } = require("../controller/OrdersController");

const ordersController = new OrdersController();
const orderItemsController = new OrderItemsController();

const ordersRoutes = Router();
const orderItemsRoutes = Router();

// Orders Routes
ordersRoutes.post("/:user_id", ordersController.createOrder);
ordersRoutes.get("/:order_id", ordersController.getOrder);
ordersRoutes.delete("/:order_id", ordersController.deleteOrder);

// Orders Items Routes
orderItemsRoutes.post("/:user_id", orderItemsController.createOrderItem);
orderItemsRoutes.delete("/:order_id/:order_item_id", orderItemsController.deleteOrderItem);

module.exports = {
  ordersRoutes,
  orderItemsRoutes,
};

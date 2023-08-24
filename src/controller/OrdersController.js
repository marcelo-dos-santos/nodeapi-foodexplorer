const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrdersController {
  async createOrder(req, res) {
    const { user_id, total_amount, order_items } = req.body;

    // Criar o pedido
    const [order_id] = await knex("orders").insert({
      user_id,
      total_amount,
      order_date: knex.fn.now(),
    });
    
    console.log("Order created with ID:", order_id);

    // Criar os itens do pedido
    await Promise.all(
      order_items.map(async (item) => {
        const { item_id, quantity } = item;

        // Verificar se o item existe na tabela "menu_items"
        const menu_item = await knex("menu_items").where("id", item_id).first();
        if (!menu_item || quantity < 1) {
          throw new AppError("Item inválido no pedido.");
        }

        // Inserir o item do pedido na tabela "order_items"
        await knex("order_items").insert({
          order_id,
          item_id,
          quantity,
        });

        console.log("Order item inserted:", { order_id, item_id, quantity });
      })
    );

    res.json({ message: "Pedido criado com sucesso.", order_id });
  }

  async getOrder(req, res) {
    const { order_id } = req.params;
  
    // Buscar o pedido no banco de dados
    const order = await knex("orders").where("order_id", order_id).first();
    if (!order) {
      throw new AppError("Pedido não encontrado.");
    }
  
    // Buscar os itens do pedido e somar as quantidades
    const order_items = await knex("order_items")
      .select("menu_items.name")
      .sum("order_items.quantity as quantity")
      .join("menu_items", "menu_items.id", "order_items.item_id")
      .where("order_items.order_id", order_id)
      .groupBy("menu_items.name");
  
    res.json({ order, order_items });
  }

  async deleteOrder(req, res) {
    const { order_id } = req.params;

    // Verificar se o pedido existe
    const order = await knex("orders").where("order_id", order_id).first();
    if (!order) {
      throw new AppError("Pedido não encontrado.");
    }

    // Excluir os itens do pedido
    await knex("order_items").where("order_id", order_id).delete();

    // Excluir o pedido
    await knex("orders").where("order_id", order_id).delete();

    res.json({ message: "Pedido excluído com sucesso." });
  }
}

class OrderItemsController {
  async createOrderItem(req, res) {
    const { order_id, item_id, quantity } = req.body;

    // Verificar se o pedido existe
    const order = await knex("orders").where("order_id", order_id).first();
    if (!order) {
      throw new AppError("Pedido não encontrado.");
    }

    console.log("Order found:", order);

    // Verificar se o item existe na tabela "menu_items"
    const menu_item = await knex("menu_items").where("id", item_id).first();
    if (!menu_item || quantity < 1) {
      throw new AppError("Item inválido no pedido.");
    }

    console.log("Menu item found:", menu_item);

    // Inserir o item do pedido na tabela "order_items"
    await knex("order_items").insert({
      order_id,
      item_id,
      quantity,
    });

    console.log("Order item inserted:", { order_id, item_id, quantity });

    res.json({ message: "Item de pedido criado com sucesso." });
  }

  async deleteOrderItem(req, res) {
    const { order_item_id } = req.params;

    // Verificar se o item de pedido existe
    const orderItem = await knex("order_items").where({order_item_id}).first();
    if (!orderItem) {
      throw new AppError("Item de pedido não encontrado.");
    }

    // Excluir o item de pedido
    await knex("order_items").where({order_item_id}).delete();

    res.json({ message: "Item de pedido excluído com sucesso." });
  }
}

module.exports = {
  OrdersController,
  OrderItemsController,
};

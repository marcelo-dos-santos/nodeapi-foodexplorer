const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class CartItemsController {
  async addToCart(req, res) {
    const { item_id, quantity } = req.body;
    const { user_id } = req.params;

    // Verificar se o item existe na tabela "menu_items"
    const item = await knex("menu_items").where({ id: item_id }).first();
    if (!item || quantity < 1) {
      throw new AppError("O item selecionado não está disponível.");
    }

    // Verificar se já existe um item com o mesmo usuário e item ID no carrinho
    const existingCartItem = await knex("cart_items")
      .where({ user_id, item_id })
      .first();

    if (existingCartItem) {
      // Atualizar a quantidade se o item já estiver no carrinho
      await knex("cart_items")
        .where({ user_id, item_id })
        .update({ quantity: existingCartItem.quantity + quantity });
    } else {
      // Inserir um novo item no carrinho
      await knex("cart_items").insert({
        user_id,
        item_id,
        quantity,
      });
    }

    res.json({ message: "Item adicionado ao carrinho com sucesso." });
  }

  async removeFromCart(req, res) {
    const { user_id, item_id } = req.params;

    // Verificar se o item está presente no carrinho do usuário
    const existingCartItem = await knex("cart_items")
      .where({ user_id, item_id })
      .first();

    if (!existingCartItem) {
      throw new AppError("O item não está presente no carrinho do usuário.");
    }

    // Remover o item do carrinho
    await knex("cart_items")
      .where({ user_id, item_id })
      .del();

    res.json({ message: "Item removido do carrinho com sucesso." });
  }

  async index(req, res) {
    const { user_id } = req.params;

    const cartItems = await knex("cart_items")
      .join("menu_items", "cart_items.item_id", "=", "menu_items.id")
      .where({ user_id })
      .select("cart_items.*", "menu_items.name as item_name");
  
    res.json({ cartItems });
  }
}

module.exports = CartItemsController;

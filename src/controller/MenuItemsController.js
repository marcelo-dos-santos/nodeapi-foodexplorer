const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MenuItemsController {
    async create(req, res) {
        const {name, category, description, ingredients, price} = req.body;
        const {admin} = req.query;

        if(!admin || admin !== 'true'){
            throw new AppError("É necessário ser administrador pra criar um item.")
        }

        const [item_id] = await knex("menu_items").insert({
            name,
            category,
            description,
            price
        })

        const ingredientsInsert = ingredients.map(name => {
            return {
                item_id,
                name,
            }
        });

        await knex("ingredients").insert(ingredientsInsert)

        const responseData = {
            message: "O Item foi criado com sucesso!",
            item: {
                name,
                category,
                item_id,
                description,
                ingredients,
                price
            }
        };

        res.json(responseData);
    };

    async index(req, res) {
        const menuItems = await knex("menu_items").select("*");
        res.json({menuItems});
    }

    async update(req, res) {
        const { name, category, description, price, ingredients } = req.body;
        const { id } = req.params;

        await knex("menu_items")
        .where({id})
        .update({
            name, 
            category, 
            description, 
            price, 
            updated_at: knex.fn.now()
        });

        if (Array.isArray(ingredients)) {
            if (ingredients.length > 0) {
              // Delete existing tags only if new tags are provided
              await knex("ingredients").where({ item_id: id }).del();
              
              // Insert new tags
              const newIngredients = ingredients.map((name) => {
                return {
                  item_id: id,
                  name,
                };
              });

              await knex("ingredients").insert(newIngredients);
            }
        }

            const responseData = {
                message: "O item foi alterado com sucesso!",
                item: {
                  name,
                  description,
                  category,
                  price,
                  item_id: id,
                  ingredients,
                },
            };

        res.json(responseData);
    };

    async remove(req, res) {
        const { id } = req.params;
    
        await knex("menu_items").where({id}).del();
    
        res.json({ message: "Item removido com sucesso." });
    }
}

module.exports = MenuItemsController;
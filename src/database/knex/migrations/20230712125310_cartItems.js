exports.up = knex => knex.schema.createTable("cart_items", table => {
    table.increments("cart_item_id");
    table.integer("user_id").references("id").inTable("users");
    table.integer("item_id").references("id").inTable("menu_items");
    table.integer("quantity");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("cart_items");

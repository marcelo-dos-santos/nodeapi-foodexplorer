exports.up = knex => knex.schema.createTable("order_items", table => {
    table.increments("order_item_id")
    table.integer("order_id")
    table.integer("item_id").references("id").inTable("menu_items")
    table.integer("quantity")
});


exports.down = knex => knex.schema.dropTable("order_items")


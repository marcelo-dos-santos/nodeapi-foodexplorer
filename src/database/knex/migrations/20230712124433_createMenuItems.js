exports.up = knex => knex.schema.createTable("menu_items", table => {
    table.increments("id")
    table.varchar("name")
    table.varchar("category")
    table.varchar("description")
    table.decimal("price")
    table.varchar("image")
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable("menu_items")


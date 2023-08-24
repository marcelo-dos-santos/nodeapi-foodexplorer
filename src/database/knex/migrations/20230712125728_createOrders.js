exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("order_id")
    table.integer("user_id").references("id").inTable("users")
    table.decimal("total_amount")
    table.timestamp("order_date").default(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable("orders")


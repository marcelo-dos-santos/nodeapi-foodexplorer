
exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id");
    table.varchar("name").notNullable();

    table.integer("item_id").references("id").inTable("menu_items").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");

});


exports.down = knex => knex.schema.dropTable("ingredients");
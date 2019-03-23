exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments();
    tbl
      .string('name', 255)
      .notNullable()
      .unique();
    tbl.string('description', 255).notNullable();
    tbl
      .boolean('completed')
      .defaultTo(false)
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};

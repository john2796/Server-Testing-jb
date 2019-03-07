
exports.up = knex => knex.schema.createTable('students', (tbl) => {
  tbl.increments();
  tbl.string('name').notNullable();
  tbl.string('cohort').notNullable();
});

exports.down = knex => knex.schema.dropTableIfExists('students');


exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.json('stages_settings').defaultTo('[{"name":"Applied","backgroundColor":"#FFC107","textColor":"black"},{"name":"Phone Interview","backgroundColor":"#2196F3","textColor":"white"},{"name":"Onsite Interview","backgroundColor":"#9C27B0","textColor":"white"},{"name":"Offered","backgroundColor":"#009688","textColor":"white"},{"name":"Declined","backgroundColor":"#F44336","textColor":"white"}]');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('applications', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.string('stage', 50).defaultTo('Applied');
      table.string('job_posting_link').nullable();
      table.string('company_name', 50).nullable();
      table.string('job_title', 50).nullable();
      table.string('location', 100).nullable();
      table.string('job_posting_source', 50).nullable();
      table.string('job_posting_to_pdf_link').nullable();
      table.timestamp('applied_at').defaultTo(knex.fn.now());
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('histories', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('application_id').references('applications.id').onDelete('CASCADE');
      table.string('event').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTableIfNotExists('notes', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('application_id').references('applications.id').onDelete('CASCADE');
      table.string('note').nullable();
      table.string('type', 50).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('contacts', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('application_id').references('applications.id').onDelete('CASCADE');
      table.string('role', 50).nullable();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('email', 100).nullable();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('histories'),
    knex.schema.dropTable('notes'),
    knex.schema.dropTable('contacts'),
    knex.schema.dropTable('applications'),
    knex.schema.dropTable('profiles')
  ]);
};

export const up = async (knex) => {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id").notNullable().unique()
    table.text("name").notNullable()
    table.timestamp("createdAt").defaultTo(knex.fn.now())
  })

  await knex.schema.createTable("users", (table) => {
    table.increments("id").unique()
    table.text("username").unique().notNullable()
    table.text("email").unique().notNullable()
    table.string("passwordHash", 1000).unique().notNullable()
    table.string("passwordSalt", 1000).unique().notNullable()
    table.integer("roleId").notNullable()
    table
      .foreign("roleId")
      .references("id")
      .inTable("roles")
      .onDelete("SET NULL")
  })

  await knex.schema.createTable("posts", (table) => {
    table.increments("id").unique()
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.integer("userId").notNullable()
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
  })

  await knex.schema.createTable("comments", (table) => {
    table.increments("id").notNullable().unique()
    table.text("content").notNullable()
    table.integer("postId").notNullable()
    table.integer("userId").notNullable()
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL")
    table
      .foreign("postId")
      .references("id")
      .inTable("posts")
      .onDelete("SET NULL")
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("comments")
  await knex.schema.dropTable("roles")
  await knex.schema.dropTable("posts")
  await knex.schema.dropTable("users")
}

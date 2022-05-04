export const up = async (knex) => {
  await knex("roles").insert([
    { name: "reader" },
    { name: "author" },
    { name: "admin" },
  ])

  await knex("users").insert([
    {
      username: "utilisateurUn",
      email: "utilisateur@gmail.fr",
      passwordHash: "",
      passwordSalt: "",
      roleId: 1,
    },
  ])

  await knex("posts").insert([
    {
      title: "Un titre",
      content: "Content",
      userId: 1,
    },
    {
      title: "Un autre titre",
      content: "Content",
      userId: 1,
    },
  ])
}

export const down = async (knex) => {
  await knex("posts").del()
  await knex("users").del()
  await knex("roles").del()
}

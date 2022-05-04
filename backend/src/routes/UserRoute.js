import UserModel from "../models/User.js"

const UsersRoute = ({ app }) => {
  app.get("/users", async (req, res) => {
    const users = await UserModel.query().where({})

    res.send({ status: "OK", users: users })
  })

  app.get("/users/:id", async (req, res) => {
    const {
      params: { id },
    } = req
    const user = await UserModel.query().findById(id)

    if (!user) {
      res.send({ message: "NO" })
    }

    res.send({
      message: "OK",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.roleId,
      },
    })
  })

  app.delete("/users/:id", async (req, res) => {
    const {
      params: { id },
    } = req

    await UserModel.query().where({ id: id }).delete()

    res.send({ message: "OK" })
  })

  app.put("/users/:id", async (req, res) => {
    const {
      params: { id },
      body: { username, email, password },
    } = req

    const user = await UserModel.query().findOne({ email })

    if (user.email === email && user.id !== parseInt(id)) {
      res.send({ status: "NO" })
    }

    const [hash, salt] = UserModel.getHashPassword(password)

    await UserModel.query().where({ id: id }).update({
      username: username,
      email: email,
      passwordHash: hash,
      passwordSalt: salt,
    })
    res.send({ status: "OK" })
  })

  app.put("/users/:id/admin", async (req, res) => {
    const {
      params: { id },
      body: { role },
    } = req

    const user = await UserModel.query().findById(id)

    if (!user) {
      res.send({ status: "KO" })
    }

    await UserModel.query().where({ id: id }).update({
      roleId: role,
    })
    res.send({ status: "OK" })
  })
}

export default UsersRoute

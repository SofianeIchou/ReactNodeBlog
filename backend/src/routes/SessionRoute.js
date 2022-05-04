import jsonwebtoken from "jsonwebtoken"
import UserModel from "../models/User.js"

const SessionRoute = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: { username, email, password },
    } = req
    const user = await UserModel.query().findOne({ email })

    if (!user) {
      const [hash, salt] = UserModel.getHashPassword(password)
      await UserModel.query().insert({
        username: username,
        email: email,
        passwordHash: hash,
        passwordSalt: salt,
        roleId: 1,
      })

      res.status(200).send({ status: "OK" })

      return
    }

    res.send({ status: 403, message: "email already used" })
  })

  app.post("/sign-in", async (req, res) => {
    const {
      body: { email, password },
    } = req
    const user = await UserModel.query().findOne({ email })

    if (!user || !user.checkPassword(password)) {
      res.send({ status: "NO" })

      return
    }

    const jwt = jsonwebtoken.sign(
      {
        payload: {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
            role: user.roleId,
          },
        },
      },
      process.env.JWT_SESSION_SECRET,
      { expiresIn: "5 hours" }
    )

    res.send({
      status: "OK",
      auth: jwt,
      user: { id: user.id, username: user.username, role: user.roleId },
    })
  })
}

export default SessionRoute

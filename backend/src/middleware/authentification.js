import jsonwebtoken from "jsonwebtoken"
import UserModel from "../models/User.js"

const { JsonWebTokenError } = jsonwebtoken

const auth = async (res, req, next) => {
  const {
    headers: { authentication },
  } = req

  try {
    const {
      payload: {
        user: { email },
      },
    } = jsonwebtoken.verify(authentication, process.env.JWT_SESSION_SECRET)

    req.user = await UserModel.query().findOne({ email })
    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).send({ message: "Forbidden" })

      return
    }

    res.status(500).send({ message: "Internal server error" })
  }
}

export default auth

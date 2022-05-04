import CommentModel from "../models/Comment.js"
import PostModel from "../models/Post.js"

const CommentRoute = ({ app }) => {
  app.post("/comments", async (req, res) => {
    const {
      body: { content, userId, postId },
    } = req
    await CommentModel.query().insert({
      content,
      userId: userId,
      postId: postId,
    })

    res.send({ status: 200 })
  })
  app.get("/comments/:id", async (req, res) => {
    const {
      params: { id },
    } = req

    const comment = await CommentModel.query().findById(id)

    if (!comment) {
      res.send({ status: 404, message: "not found" })

      return
    }

    res.send({ status: 200, comment })
  })

  app.delete("/comments/:id", async (req, res) => {
    const {
      params: { id },
    } = req

    const comment = CommentModel.query().findById(id)

    if (!comment) {
      res.send({ status: 404, message: "not found" })

      return
    }

    PostModel.query().where({ id }).delete()

    res.send({ status: 200, message: "OK" })
  })
  app.put("/comments/:id", async (req, res) => {
    const {
      params: { id },
      body: { content },
    } = req

    const comment = PostModel.query().findById(id)

    if (!comment) {
      res.send({ status: 404, message: "not found" })

      return
    }

    await CommentModel.query()
      .update({
        content: content,
      })
      .where({ id })
    res.send({ status: 200, message: "OK" })
  })
}

export default CommentRoute

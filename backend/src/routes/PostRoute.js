import CommentModel from "../models/Comment.js"
import PostModel from "../models/Post.js"

const PostRoute = ({ app }) => {
  app.get("/posts", async (req, res) => {
    const posts = await PostModel.query()
      .select("posts.*", "users.username as author")
      .leftJoinRelated("users")
      .orderBy("createdAt", "desc")

    res.send({ status: 200, posts: posts })
  })

  app.get("/posts/:id", async (req, res) => {
    const {
      params: { id },
    } = req

    const post = await PostModel.query()
      .findById(id)
      .select("posts.*", "users.username as author")
      .leftJoinRelated("users")
      .orderBy("posts.createdAt", "desc")

    const comments = await CommentModel.query()
      .where({ postId: id })
      .select("comments.*", "users.username as author")
      .leftJoinRelated("users")
      .orderBy("comments.createdAt", "desc")

    if (!post) {
      res.send({ status: 404, message: "post not found" })

      return
    }

    res.send({ status: 200, post: { ...post, comments: comments } })
  })
  app.post("/posts", async (req, res) => {
    const {
      body: { title, content, userId },
    } = req
    await PostModel.query().insert({
      title: title,
      content: content,
      userId: userId,
    })
    res.send({ status: 200, message: "OK" })
  })
  app.get("/users/:id/posts", async (req, res) => {
    const {
      params: { id },
    } = req

    const posts = await PostModel.query()
      .select("posts.*", "users.username as author", "users.id as authorId")
      .where({ userId: id })
      .leftJoinRelated("users")
      .orderBy("createdAt", "desc")

    res.send({ message: "OK", posts: posts })
  })

  app.put("/posts/:id", async (req, res) => {
    const {
      params: { id },
      body: { title, content },
    } = req

    const post = PostModel.query().findById(id)

    if (!post) {
      res.send({ status: 200, message: "not found" })

      return
    }

    await PostModel.query()
      .update({
        title: title,
        content: content,
      })
      .where({ id })

    res.send({ status: 200 })
  })

  app.delete("/posts/:id", async (req, res) => {
    const {
      params: { id },
    } = req
    const post = PostModel.query().findById(id)

    if (!post) {
      res.send({ status: "not found" })

      return
    }

    await PostModel.query().deleteById(id)

    res.send({ status: 200 })
  })
}

export default PostRoute

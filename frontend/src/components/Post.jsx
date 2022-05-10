import moment from "moment"
import "moment/locale/fr"
import Link from "next/link"
import { useCallback, useContext } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import appContext from "./AppContext"

const Post = (props) => {
  moment.locale("fr")
  const { session, router, deletePost } = useContext(appContext)
  const { post } = props

  const handleDeleteClick = useCallback(
    async (id) => {
      await deletePost(id)
      router.reload()
    },
    [router, deletePost]
  )

  return (
    <div className="">
      <Link href={"/post/" + post.id}>
        <a className="">{post.title}</a>
      </Link>
      <div>{post.content}</div>
      <div className="">
        par {post.author} le{" "}
        {moment(post.createdAt).format("dddd DD MMM yyyy à HH:mm")}
        {session &&
        (session.payload.user.id === post.userId ||
          session.payload.user.role === 3) ? (
          <div className="">
            <Link href={"/post/" + post.id + "/edit"}>
              <AiFillEdit className="" />
            </Link>
            <AiFillDelete
              className=""
              onClick={() => handleDeleteClick(post.id)}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Post

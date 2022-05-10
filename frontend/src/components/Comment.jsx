import moment from "moment"
import Link from "next/link"
import { useCallback, useContext } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import AppContext from "./AppContext"

const Comment = (props) => {
  const { session } = useContext(AppContext)
  const { comment } = props

  const handleDeleteClick = useCallback((id) => {}, [])

  return (
    <>
      <div className="">
        <Link href={"/profile/" + comment.userId}>
          <a className="">{comment.author}</a>
        </Link>
        <div>{comment.content}</div>
        <div className="">
          {moment(comment.createdAt).format("dddd MMM yyyy - HH:mm")}
          {comment.userId === session.payload.user.id ||
          comment.post === session.payload.user.id ||
          session.payload.user.role === 3 ? (
            <div className="">
              <Link
                href={
                  "/post/" + comment.postId + "/comment/" + comment.id + "/edit"
                }
              >
                <a>
                  <AiFillEdit className="" />
                </a>
              </Link>
              <AiFillDelete
                className=""
                onClick={() => handleDeleteClick(comment.id)}
              />
            </div>
          ) : (
            <div>.</div>
          )}
        </div>
      </div>
    </>
  )
}

export default Comment

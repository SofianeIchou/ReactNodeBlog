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
      <div className="flex flex-col border-2 border-black w-1/2 rounded p-2">
        <Link href={"/profile/" + comment.userId}>
          <a className="text-2xl text-bold hover:underline">{comment.author}</a>
        </Link>
        <div>{comment.content}</div>
        <div className="flex justify-end text-gray-600 text-sm italic">
          {moment(comment.createdAt).format("dddd MMM yyyy - HH:mm")}
          {comment.userId === session.payload.user.id ||
          comment.post === session.payload.user.id ||
          session.payload.user.role === 3 ? (
            <div className="flex text-2xl">
              <Link
                href={
                  "/post/" + comment.postId + "/comment/" + comment.id + "/edit"
                }
              >
                <a>
                  <AiFillEdit className="hover:text:bg-green-700" />
                </a>
              </Link>
              <AiFillDelete
                className="hover:text:bg-green-700"
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

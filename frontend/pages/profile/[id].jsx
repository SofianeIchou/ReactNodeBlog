import { Field, Formik } from "formik"
import Link from "next/link"
import { useCallback, useContext, useEffect, useState } from "react"
import AppContext from "../../src/components/AppContext"
import Button from "../../src/components/Button"
import Post from "../../src/components/Post"
import api from "../../src/utils/api"

const Id = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const { router, session, editAdmin, deleteUser } = useContext(AppContext)
  const { id } = router.query
  const handleDeleteClick = useCallback(
    async (id) => {
      await deleteUser(id)
      router.push("/")
    },
    [router, deleteUser]
  )
  const handleFormSubmit = useCallback(
    async ({ role }) => {
      await editAdmin(role, user.id)
      router.reload()
    },
    [router, editAdmin, user]
  )

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    api.get("/users/" + id).then((res) => {
      const {
        data: { user },
      } = res
      setUser(user)
    })

    api.get("/users/" + id + "/posts").then((res) => {
      const {
        data: { posts },
      } = res
      setPosts(posts)
    })
  }, [id, router.isReady, session])

  if (!user) {
    return <div>Utilisateur non trouvé</div>
  }

  return (
    <>
      {user ? (
        <>
          <div className="flex flex-col rounded border-2 border-black mx-auto w-3/4 my-8 p-2">
            <div className="text-center text-2xl font-bold">Mon compte</div>
            <div className="text-bold text-xl">username : {user.username}</div>
            <div className="text-bold text-xl">E-mail : {user.email}</div>
            <div className="text-bold text-xl">
              Role :{" "}
              {user.role === 1
                ? "Lecteur"
                : user.role === 2
                ? "Auteur"
                : "Admin"}
            </div>
            {session.payload.user.id === user.id && (
              <div className="flex gap-x-5 w-full">
                <Link href={"/profile/" + user.id + "/edit"}>
                  <a>
                    <Button className="bg-blue-300">Modifier</Button>
                  </a>
                </Link>
                <Button>Supprimer</Button>
              </div>
            )}
            {session && session.payload.user.role === 3 && (
              <div className="text-xl flex justify-end border-t-2 border-black my-2 p-2">
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={{ role: user.role }}
                >
                  {({ handleSubmit, isSubmitting, isValid }) => (
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="role">
                        Selectionner rôle :
                        <Field
                          as="select"
                          name="role"
                          className="p-2 border-2 border-black rounded ml-5"
                        >
                          <option value={1}>Lecteur</option>
                          <option value={2}>Auteur</option>
                          <option value={3}>Admin</option>
                        </Field>
                      </label>
                      <Button
                        disabled={isSubmitting && !isValid}
                        className="bg-blue-200 ml-5 text-sm p-1 border-2 border-black shadow"
                        type="submit"
                      >
                        Modifier rôle !
                      </Button>
                      <Link href={"/profile/" + user.id + "/edit"}>
                        <a>
                          <Button
                            className="bg-blue-200 text-sm p-1 border-2 border-black shadow"
                            disabled={isSubmitting && !isValid}
                          >
                            Modifier
                          </Button>
                        </a>
                      </Link>
                      <Button
                        disabled={isSubmitting && !isValid}
                        onClick={() => handleDeleteClick(user.id)}
                        className="text-sm p-1 border-2 border-black shadow"
                      >
                        Supprimer
                      </Button>
                    </form>
                  )}
                </Formik>
              </div>
            )}
          </div>

          {session.payload.user.id === user.id && (
            <div className="flex flex-col mx-auto w-3/4 my-8 gap-y-2 items-center">
              <div className="text-center text-2xl font-bold">Mes Articles</div>
              {posts ? (
                posts.map((post) => <Post key={post.id} post={post} />)
              ) : (
                <div>Il n'y a aucun article</div>
              )}
            </div>
          )}
        </>
      ) : null}
    </>
  )
}
export default Id

import { useCallback, useContext, useEffect, useState } from "react"
import { Field, Formik } from "formik"
import * as Yup from "yup"
import api from "../src/utils/api"
import AppContext from "../src/components/AppContext"
import FormField from "../src/components/FormField"
import Button from "../src/components/Button"
import TextArea from "../src/components/TextArea"
import Input from "../src/components/Input"
import Post from "../src/components/Post"

const IndexHome = () => {
  const { session, createPost, router } = useContext(AppContext)
  const [posts, setPosts] = useState([])
  const [id, setId] = useState(0)
  const handleFormSubmit = useCallback(
    async ({ title, content }) => {
      await createPost(title, content, id)
      router.reload()
    },
    [createPost, id, router]
  )
  const postSchema = Yup.object()
    .shape({
      title: Yup.string().max(72).required("Le champ est requis"),
      content: Yup.string().required("Le champ est requis"),
    })
    .required()

  useEffect(() => {
    api.get("/posts").then((res) => {
      setPosts(res.data.posts)
    })
  }, [posts])
  useEffect(() => {
    if (!session) {
      return
    }

    setId(session.payload.user.id)
  }, [session])

  return (
    <>
      <div className="flex flex-col gap-y-2">
        {session && session.payload.user.role !== 1 && (
          <div className="pt-16">
            <Formik
              initialValues={{ title: "", content: "" }}
              validationSchema={postSchema}
              onSubmit={handleFormSubmit}
            >
              {({ handleSubmit, isSubmitting, isValid }) => (
                <form
                  className="flex flex-col items-center gap-y-7"
                  onSubmit={handleSubmit}
                >
                  <div className="text-3xl">Ajouter un article !</div>

                  <FormField name="title" as={Input} placeholder="Titre" />
                  <FormField
                    name="content"
                    as={TextArea}
                    placeholder="Contenu"
                  />
                  <Button
                    disabled={isSubmitting && !isValid}
                    className="self-center"
                    type="submit"
                  >
                    Valider !
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        )}
        {posts.length > 0 ? (
          <div className="flex flex-col items-center gap-5">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-2xl text-center text-red-500">
            Il n'y a pas d'articles
          </div>
        )}
      </div>
    </>
  )
}

export default IndexHome

import { Formik } from "formik"
import { useCallback, useContext, useEffect, useState } from "react"
import * as Yup from "yup"
import AppContext from "../../../src/components/AppContext"
import Button from "../../../src/components/Button"
import FormField from "../../../src/components/FormField"
import Input from "../../../src/components/Input"
import TextArea from "../../../src/components/TextArea"
import api from "../../../src/utils/api"

const EditPost = () => {
  const { session, editPost, router } = useContext(AppContext)
  const [post, setPost] = useState(null)
  const { id } = router.query
  const handleFormSubmit = useCallback(
    async ({ title, content }) => {
      await editPost(title, content, id)
      router.reload()
    },
    [editPost, id, router]
  )
  const postSchema = Yup.object()
    .shape({
      title: Yup.string().max(72).required("Invalid"),
      content: Yup.string().required("Invalid"),
    })
    .required()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    api.get("/posts/" + id).then((res) => {
      setPost(res.data.post)
    })
  }, [id, router, router.isReady])

  return (
    <>
      {post && session.payload.user.id === post.userId ? (
        <div className="pt-16">
          <Formik
            initialValues={{
              title: post.title,
              content: post.content,
            }}
            validationSchema={postSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isSubmitting, isValid }) => (
              <form
                className="flex flex-col items-center gap-y-7"
                onSubmit={handleSubmit}
              >
                <div className="text-3xl">Modifier mon article !</div>

                <FormField name="title" as={Input} placeholder="Titre" />
                <FormField name="content" as={TextArea} placeholder="Contenu" />
                <Button
                  disabled={isSubmitting && !isValid}
                  className="self-center"
                  type="submit"
                >
                  Modifier !
                </Button>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        <div>Forbidden</div>
      )}
    </>
  )
}

export default EditPost

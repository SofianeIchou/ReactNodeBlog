import { Formik } from "formik"
import { useCallback, useContext, useState } from "react"
import * as Yup from "yup"
import AppContext from "../../../src/components/AppContext"
import Button from "../../../src/components/Button"
import ErrorMessage from "../../../src/components/ErrorMessage"
import FormField from "../../../src/components/FormField"

const AccountEdit = () => {
  const { router, session, editAccount } = useContext(AppContext)
  const { id } = router.query
  const [displayErr, setDisplayErr] = useState(false)
  const editAccountSchema = Yup.object().shape({
    username: Yup.string()
      .matches("[a-zA-Z]", "No special characters allowed")
      .max(255)
      .required("Le champ est requis"),
    email: Yup.string()
      .email("Invalid email")
      .max(255)
      .required("Le champ est requis"),
    password: Yup.string().required("Le champ est requis"),
  })

  const handleFormSubmit = useCallback(
    async ({ username, email, password }, { resetForm }) => {
      const result = editAccount(id, username, email, password)

      if (result) {
        resetForm()
      }
    },
    [editAccount, id]
  )

  return (
    <>
      <ErrorMessage display={displayErr}>Email déjà utilisé.</ErrorMessage>
      <div className="flex flex-col p-4 rounded-lg border-2 border-black justify-center w-3/4 mx-auto my-5 items-center gap-y-10">
        <div className="text-3xl font-bold">Modifier mon compte</div>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={editAccountSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <form
              noValidate
              className="flex flex-col gap-y-7 items-center h-25 w-80"
              onSubmit={handleSubmit}
            >
              <FormField name="username" placeholder="username" />
              <FormField name="email" placeholder="E-mail" />
              <FormField
                name="password"
                placeholder="Password"
                type="password"
              />

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
    </>
  )
}

export default AccountEdit

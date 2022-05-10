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
      .required("Invalid"),
    email: Yup.string().email("Invalid email").max(255).required("Invalid"),
    password: Yup.string().required("Invalid"),
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
      <div className="">
        <div className="">Modifier mon compte</div>
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
            <form noValidate className="" onSubmit={handleSubmit}>
              <FormField name="username" placeholder="username" />
              <FormField name="email" placeholder="E-mail" />
              <FormField
                name="password"
                placeholder="Password"
                type="password"
              />

              <Button
                disabled={isSubmitting && !isValid}
                className=""
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

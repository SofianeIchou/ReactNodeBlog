import { Formik } from "formik"
import { useCallback, useContext, useState } from "react"
import * as Yup from "yup"
import AppContext from "../src/components/AppContext"
import Button from "../src/components/Button"
import ErrorMessage from "../src/components/ErrorMessage"
import FormField from "../src/components/FormField"

const SignUp = () => {
  const { signUp } = useContext(AppContext)
  const [displayErr, setDisplayErr] = useState(false)
  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .matches("[a-zA-Z]", "No special characters allowed")
      .max(255)
      .required("Invalid"),
    email: Yup.string().email("Invalid email").max(255).required("Invalid"),
    password: Yup.string().required("Invalid"),
  })

  const handleFormSubmit = useCallback(
    async ({ username, email, password }, { resetForm }) => {
      const result = signUp(username, email, password)

      if (result) {
        setDisplayErr(true)
        resetForm()
      }
    },
    [signUp]
  )

  return (
    <>
      <ErrorMessage display={displayErr}>Veuillez réessayez.</ErrorMessage>
      <div className="">
        <div className="">Faire parti de la presse</div>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={signUpSchema}
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
                Rejoindre la presse
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default SignUp

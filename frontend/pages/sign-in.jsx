import { useCallback, useContext, useState } from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../src/components/AppContext"
import FormField from "../src/components/FormField"
import ErrorMessage from "../src/components/ErrorMessage"
import Button from "../src/components/Button"

const SignIn = () => {
  const { signIn } = useContext(AppContext)
  const [displayErr, setDisplayErr] = useState(false)
  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      const result = await signIn(email, password)

      if (!result) {
        setDisplayErr(true)
      }
    },
    [signIn]
  )

  const signInSchema = Yup.object()
    .shape({
      email: Yup.string().email("Invalid email").max(255).required("Invalid"),
      password: Yup.string().required("Invalid"),
    })
    .required()

  return (
    <>
      <ErrorMessage display={displayErr}>
        Les informations ne sont pas conformes
      </ErrorMessage>
      <div className="flex justify-center ">
        <div className="text-3xl">Sign in</div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signInSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isSubmitting, isValid }) => (
            <form noValidate className="" onSubmit={handleSubmit}>
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
                Connexion
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default SignIn

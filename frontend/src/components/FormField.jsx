import Input from "./Input"
import classNames from "classnames"
import { Field } from "formik"

const FormField = (props) => {
  const { name, as: Component = Input, className, ...otherProps } = props

  return (
    <Field name={name}>
      {({ field, meta: { error, touched } }) => (
        <div className={classNames(className)}>
          <label className="text-black">
            <Component {...field} className="" {...otherProps} />
          </label>
          {touched && error ? <p className="">{error}</p> : null}
        </div>
      )}
    </Field>
  )
}

export default FormField

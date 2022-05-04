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
            <Component
              {...field}
              className="border-2 w-80 border-black rounded-xl h-14 pr-2 pl-2 text-md placeholder:text-green-700"
              {...otherProps}
            />
          </label>
          {touched && error ? (
            <p className=" rounded w-full text-red-600 font-bold">{error}</p>
          ) : null}
        </div>
      )}
    </Field>
  )
}

export default FormField

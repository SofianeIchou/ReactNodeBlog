import classNames from "classnames"

const ErrorMessage = (props) => {
  const { display, ...otherProps } = props

  return (
    <div
      className={classNames(
        "w-full bg-green-600 text-black h-8 font-bold text-xl text-center",
        {
          hidden: !display,
        }
      )}
      {...otherProps}
    />
  )
}

export default ErrorMessage

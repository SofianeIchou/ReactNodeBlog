import classNames from "classnames"

const ErrorMessage = (props) => {
  const { display, ...otherProps } = props

  return (
    <div
      className={classNames("", {
        hidden: !display,
      })}
      {...otherProps}
    />
  )
}

export default ErrorMessage

function ErrorMessage({ message, className }) {
    return (
        <p className={`text-red-500 text-xl mt-2 ${className}`}>{message}</p>
    )
}

export default ErrorMessage

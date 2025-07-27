import clsx from 'clsx';

const variants = {
  primary: 'text-2xl cursor-pointer bg-rose-600 text-white px-8 py-3 my-3 rounded-md hover:bg-rose-700 transition',
  secondary: 'bg-white border border-gray-600 text-black hover:bg-gray-200',
  outline: 'bg-transparent border border-gray-600 text-gray-800 hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
};

function Button({ children, onClick, disabled = false, className = '', variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-4 py-2 rounded-md cursor-pointer',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;

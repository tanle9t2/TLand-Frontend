import clsx from 'clsx';

const variants = {
  primary: 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm hover:shadow-md',
  secondary: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300',
  outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
};

function Button({ type = "button", children, onClick, disabled = false, className = '', variant = 'primary' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-6 py-2.5 my-2 rounded-xl text-[1.4rem] font-medium transition-all duration-200',
        variants[variant],
        className,
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      )}
    >
      {children}
    </button>
  );
}

export default Button;

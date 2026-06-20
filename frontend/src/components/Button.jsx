export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        rounded-xl px-5 py-3
        font-medium
        transition-all duration-200
        shadow-sm

        bg-blue-600 text-white

        hover:bg-blue-700
        hover:shadow-lg

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full rounded-xl border border-slate-300
          px-4 py-3
          focus:border-blue-500
          focus:ring-4 focus:ring-blue-100
          transition
        "
      />
    </div>
  );
}

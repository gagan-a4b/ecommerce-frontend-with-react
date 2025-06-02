export default function Input({ type, placeholder, required, onChange, label, value }) {
  return (
    <div>
      <label className="block mb-1 text-gray-600">{label}</label>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={onChange}
      />
    </div>
  );
}

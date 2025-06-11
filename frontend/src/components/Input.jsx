export default function Input({ label, id, ...props }) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm text-left font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

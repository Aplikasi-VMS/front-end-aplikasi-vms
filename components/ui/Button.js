export default function Button({ onClick, className = "", children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
        You do not have permission to access this page.
      </p>
      <Link
        href="/dashboard"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Go Back To Dashboard
      </Link>
    </div>
  );
}

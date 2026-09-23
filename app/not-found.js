import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#F8F9FA] min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🦷</div>
        <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It may have been moved or the link might be incorrect.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-8 py-3 rounded-xl shadow hover:scale-105 transition font-medium"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

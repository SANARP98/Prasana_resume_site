import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-custom py-32 text-center">
      <h1 className="text-6xl font-black mb-4">404</h1>
      <p className="text-xl text-mediumGray mb-8">Page not found</p>
      <Link
        href="/"
        className="inline-block px-8 py-3 bg-darkGray text-cream rounded-md hover:bg-accent transition-colors uppercase text-sm font-bold"
      >
        Go Home
      </Link>
    </div>
  );
}

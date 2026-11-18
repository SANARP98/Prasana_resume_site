import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-custom py-32 text-center">
      <p className="font-mono text-sm text-muted">HTTP 404 · route not provisioned</p>
      <h1 className="mt-4 text-5xl">This page never made it past staging.</h1>
      <Link href="/" className="btn-primary mt-10">Back to home</Link>
    </div>
  );
}

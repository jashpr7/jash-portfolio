import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404 / LOST FRAME</span>
      <h1>This page moved out of the composition.</h1>
      <Link className="button button--solid" href="/">
        Back to portfolio
      </Link>
    </main>
  );
}

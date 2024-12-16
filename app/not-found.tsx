// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        h-[100vh]
        text-center"
    >
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <Link href="/" className="text-blue-500 underline">
        Go back to the homepage
      </Link>
    </div>
  );
}

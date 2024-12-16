import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'sign in with google',
};

export default function IndexLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

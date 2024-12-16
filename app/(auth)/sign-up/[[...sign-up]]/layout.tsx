import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'sign up with google',
};

export default function IndexLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

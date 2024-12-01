import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Simplify your workflow and get things done effortlessly. Designed for individuals",
};

export default function IndexLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
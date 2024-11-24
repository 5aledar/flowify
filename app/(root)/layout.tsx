import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "description",
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
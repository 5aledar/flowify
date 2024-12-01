import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: '%s | Flowify',
        default: 'Dashboard'
      },
    description: "user dashboard",
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
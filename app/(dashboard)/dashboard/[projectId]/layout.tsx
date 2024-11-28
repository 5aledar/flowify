import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project",
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
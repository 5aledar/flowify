// middleware/auth.ts
import { prisma } from "../lib/prisma";

export async function afterAuth({ user }: any) {
    const { emailAddresses, firstName, lastName } = user;

    const email = emailAddresses[0]?.emailAddress;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    email,
                    username: `${firstName || ""} ${lastName || ""}`.trim(),
                },
            });
        }
    } catch (error) {
        console.error("Error saving user:", error);
    }
}

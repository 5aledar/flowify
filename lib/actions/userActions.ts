// lib/saveUser.ts
import { prisma } from "./../prisma";

export const saveUserToDatabase = async (clerkUser: any) => {
  try {
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new Error("User email not found.");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {

      await prisma.user.create({
        data: {
          email,
          username: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          googleId: clerkUser.id
        },
      });
      console.log(`User saved: ${email}`);
    }
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

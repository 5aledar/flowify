// lib/saveUser.ts
import { prisma } from "./prisma";
import { User } from "@clerk/nextjs/server";

export const saveUserToDatabase = async (clerkUser: User) => {
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

        },
      });
      console.log(`User saved: ${email}`);
    }
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

// app/contact/actions.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  try {
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to send message." };
  }
}

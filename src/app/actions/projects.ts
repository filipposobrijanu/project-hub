"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || "";
  await prisma.project.create({
    data: {
      name,
      description,
      ownerId: session.user.id,
      members: {
        create: { userId: session.user.id, role: "OWNER" },
      },
    },
  });
  revalidatePath("/dashboard");
}

export async function getMyProjects() {
  const session = await auth();
  if (!session?.user?.id) return [];
  return prisma.project.findMany({
    where: { members: { some: { userId: session.user.id } } },
    include: { _count: { select: { tasks: true } } },
  });
}

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addTask(projectId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  if (!title?.trim()) return;

  // Προαιρετικά: έλεγξε ότι ο χρήστης είναι μέλος του project
  const membership = await prisma.member.findFirst({
    where: { projectId, userId: session.user.id },
  });
  if (!membership) throw new Error("Not a member");

  await prisma.task.create({
    data: {
      title: title.trim(),
      projectId,
    },
  });

  revalidatePath(`/projects/${projectId}`);
}
export async function cycleTaskStatus(taskId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { project: true },
  });
  if (!task) return;

  // Έλεγχος ότι ο χρήστης είναι μέλος του project
  const membership = await prisma.member.findFirst({
    where: { projectId: task.projectId, userId: session.user.id },
  });
  if (!membership) throw new Error("Not a member");

  const nextStatus =
    task.status === "TODO"
      ? "IN_PROGRESS"
      : task.status === "IN_PROGRESS"
        ? "DONE"
        : "TODO";

  await prisma.task.update({
    where: { id: taskId },
    data: { status: nextStatus },
  });

  revalidatePath(`/projects/${task.projectId}`);
}
export async function deleteTask(taskId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Βρες το task και το project του
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { project: true },
  });
  if (!task) return;

  // Έλεγχος ότι ο χρήστης είναι ο ιδιοκτήτης του project
  if (task.project.ownerId !== session.user.id) {
    throw new Error("Only the project owner can delete tasks");
  }

  await prisma.task.delete({
    where: { id: taskId },
  });

  revalidatePath(`/projects/${task.projectId}`);
}

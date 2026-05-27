export async function inviteMember(projectId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauth");
  const email = formData.get("email") as string;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");
  // έλεγξε αν είναι ήδη μέλος
  const existing = await prisma.member.findFirst({
    where: { projectId, userId: user.id },
  });
  if (existing) throw new Error("Already a member");
  await prisma.member.create({
    data: { projectId, userId: user.id, role: "MEMBER" },
  });
  revalidatePath(`/projects/${projectId}`);
}

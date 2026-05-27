import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { addTask, deleteTask, cycleTaskStatus } from "@/app/actions/tasks";
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Users,
  BarChart3,
  Clock,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: { orderBy: { createdAt: "asc" } },
      members: { include: { user: true } },
    },
  });

  if (!project) notFound();

  const isMember = project.members.some((m) => m.userId === session.user?.id);
  if (!isMember)
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-3 md:px-4">
        <div className="glass-card p-4 p-md-5 rounded-5 text-center max-w-md w-full border border-white/10">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            You do not have access
          </h2>
          <p className="text-white/50 text-sm mb-4">
            You are not a member of this project.
          </p>
          <a
            href="/dashboard"
            className="btn-glass rounded-5 px-5 py-3 py-md-2 w-100 d-inline-block text-decoration-none font-semibold text-sm"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(
    (t) => t.status === "DONE",
  ).length;
  const inProgressTasks = project.tasks.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;
  const todoTasks = project.tasks.filter((t) => t.status === "TODO").length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl w-full flex flex-col min-h-[80vh] gap-4 px-3 md:px-4 text-start animate-fade-in-up mt-4 md:mt-5 mb-5 overflow-hidden">
      <div className="text-center mb-2 md:mb-3">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Your Project
        </h1>
      </div>

      {/* ========== ΚΕΦΑΛΙΔΑ & ΣΤΑΤΙΣΤΙΚΑ ========== */}
      <div className="glass-card px-4 py-4 py-md-5 rounded-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
              {project.name}
            </h1>
            {project.description && (
              <p className="text-white-50 m-0 text-xs md:text-sm font-medium">
                {project.description}
              </p>
            )}
          </div>

          {/* Μέλη με βελτιωμένο Stacking */}
          <div className="d-flex align-items-center gap-2 badge glass-card py-2 px-3 rounded-5 align-self-start align-self-md-auto">
            <Users className="text-white-50" size={16} />
            <div className="d-flex align-items-center">
              {project.members.slice(0, 5).map((member, index) => (
                <div
                  key={member.userId}
                  className="avatar-circle font-semibold"
                  style={{
                    width: "28px",
                    height: "28px",
                    fontSize: "0.7rem",
                    marginLeft: index === 0 ? "0" : "-10px",
                    zIndex: 5 - index,
                    border: "2px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  title={member.user.name || member.user.email}
                >
                  {(member.user.name || member.user.email || "?")
                    .charAt(0)
                    .toUpperCase()}
                </div>
              ))}
              {project.members.length > 5 && (
                <div
                  className="avatar-circle font-bold"
                  style={{
                    width: "28px",
                    height: "28px",
                    fontSize: "0.7rem",
                    marginLeft: "-10px",
                    background: "rgba(255,255,255,0.15)",
                    zIndex: 0,
                  }}
                >
                  +{project.members.length - 5}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Μπάρα Προόδου & Micro-Stats Grid */}
        <div
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
          className="row mt-3 pt-4 g-4 align-items-center"
        >
          <div className="col-lg-4 col-12">
            <div className="d-flex align-items-center gap-2 text-white-50 mb-2">
              <BarChart3 size={14} />
              <span
                className="small font-semibold tracking-wide uppercase"
                style={{ fontSize: "0.65rem" }}
              >
                Project progress
              </span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div
                className="flex-grow-1 rounded-full overflow-hidden bg-white/10"
                style={{ height: "6px" }}
              >
                <div
                  className="h-100 bg-white rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${progressPercentage}%`, opacity: 0.85 }}
                ></div>
              </div>
              <span className="text-white font-mono font-bold text-sm shrink-0">
                {progressPercentage}%
              </span>
            </div>
          </div>

          <div className="col-lg-8 col-12">
            {/* Changed from col-3 to col-6 for mobile wrapping */}
            <div className="row g-3 text-start text-lg-center">
              <div className="col-6 col-md-3">
                <div
                  className="text-white-50 uppercase font-medium tracking-wider mb-1"
                  style={{ fontSize: "0.6rem" }}
                >
                  Total
                </div>
                <div className="text-white font-bold text-base md:text-lg">
                  {totalTasks}
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div
                  className="text-white-50 uppercase font-medium tracking-wider mb-1"
                  style={{ fontSize: "0.6rem" }}
                >
                  About to start
                </div>
                <div className="text-white-50 font-bold text-base md:text-lg">
                  {todoTasks}
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div
                  className="text-white-50 uppercase font-medium tracking-wider mb-1"
                  style={{ fontSize: "0.6rem" }}
                >
                  In progress
                </div>
                <div className="text-white-50 font-bold text-base md:text-lg">
                  {inProgressTasks}
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div
                  className="text-white-50 uppercase font-medium tracking-wider mb-1"
                  style={{ fontSize: "0.6rem" }}
                >
                  Completed
                </div>
                <div className="text-white-50 font-bold text-base md:text-lg">
                  {completedTasks}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== ADD TASK FORM ========== */}
      <div className="glass-card p-3 rounded-5">
        <form
          action={addTask.bind(null, id)}
          className="d-flex flex-column flex-md-row gap-2 md:gap-3"
        >
          <input
            name="title"
            placeholder="Add new task..."
            className="flex-grow-1 input-glass rounded-5 px-4 py-3 py-md-2 text-white text-sm placeholder:text-white/30"
            required
          />
          <button
            type="submit"
            className="btn-glass rounded-5 px-4 py-3 py-md-2 d-flex align-items-center justify-content-center gap-1 fw-bold "
            style={{ minWidth: "100px" }}
          >
            <Plus size={20} /> ADD TASK
          </button>
        </form>
      </div>

      {/* ========== TASKS LIST ========== */}
      <div className="flex flex-col gap-2">
        {project.tasks.length === 0 ? (
          <div className="glass-card p-5 rounded-5 text-center opacity-70">
            <CheckCircle2
              className="text-white/30 mx-auto mb-3 stroke-[1.5]"
              size={40}
            />
            <p className="text-white/80 font-medium mb-0 text-sm">
              There are no jobs yet.
            </p>
            <p className="text-white-50 text-xs md:text-sm mb-0 mt-1">
              Add your first task above.
            </p>
          </div>
        ) : (
          project.tasks.map((task) => (
            <div
              key={task.id}
              className="glass-card threed-card-shit p-3 p-md-4 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 group hover:bg-white/5 transition-all duration-200 rounded-5"
            >
              <div className="d-flex align-items-start align-items-md-center gap-3 w-100 min-w-0">
                {/* Dynamic Status Icon Colors */}
                <div className="shrink-0 mt-1 mt-md-0">
                  {task.status === "DONE" ? (
                    <CheckCircle2 className="text-white-50" size={20} />
                  ) : task.status === "IN_PROGRESS" ? (
                    <Clock className="text-white-50" size={20} />
                  ) : (
                    <Circle className="text-white-50" size={20} />
                  )}
                </div>

                <div className="min-w-0 flex-grow-1">
                  <p
                    className={`mb-0 text-sm font-semibold text-wrap break-words ${
                      task.status === "DONE"
                        ? "text-decoration-line-through text-white-50 font-normal"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </p>

                  {/* Dynamic Badges */}
                  <div className="mt-2 mt-md-1">
                    <span
                      className={`badge rounded-pill glass-card px-2 py-1 text-white-50 uppercase ${
                        task.status === "TODO"
                          ? "bg-white/5"
                          : task.status === "IN_PROGRESS"
                            ? ""
                            : ""
                      }`}
                      style={{ fontSize: "0.65rem" }}
                    >
                      {task.status === "TODO"
                        ? "About to start"
                        : task.status === "IN_PROGRESS"
                          ? "In progress"
                          : "Completed"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Pushed to right on mobile */}
              <div className="d-flex gap-2 w-100 justify-content-end justify-content-md-start mt-1 mt-md-0 w-md-auto shrink-0">
                <form action={cycleTaskStatus.bind(null, task.id)}>
                  <button
                    type="submit"
                    className="btn-glass rounded-5 px-4 px-md-3 py-2 py-md-1 text-xs font-bold h-100"
                  >
                    {task.status === "TODO"
                      ? "START"
                      : task.status === "IN_PROGRESS"
                        ? "COMPLETE"
                        : "RESET"}
                  </button>
                </form>
                <form action={deleteTask.bind(null, task.id)}>
                  <button
                    type="submit"
                    className="btn-glass rounded-4 px-3 px-md-2 py-2 py-md-1 text-xs text-danger border-danger/20 hover:bg-danger/10 h-100"
                  >
                    <Trash2 size={16} className="md:w-3.5 md:h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

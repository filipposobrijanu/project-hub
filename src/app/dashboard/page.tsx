import { auth } from "@/lib/auth";
import { getMyProjects, createProject } from "@/app/actions/projects";
import Link from "next/link";
import {
  Plus,
  Folder,
  BookOpen,
  ListTodo,
  Briefcase,
  Zap,
  ShieldCheck,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default async function DashboardPage() {
  const session = await auth();
  if (!session)
    return (
      <p className="text-center mt-20 text-white/50 font-medium">
        Please login
      </p>
    );

  const projects = await getMyProjects();
  const userName = session.user?.name || "Χρήστης";
  const initialLetter = userName.charAt(0).toUpperCase();
  const userEmail = session.user?.email || "";

  const stats = [
    { label: "Active Projects", value: projects.length, icon: BookOpen },
    {
      label: "Total Tasks",
      value: projects.reduce((acc: number, p: any) => acc + p._count.tasks, 0),
      icon: ListTodo,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[85vh] px-4 mx-auto max-w-5xl w-full animate-fade-in-up mt-5 mb-5">
      <div className="text-center mb-3">
        <h1 className="text-4xl font-bold text-white">Project Dashboard</h1>
        <p className="text-white-50 mt-2">
          Manage your tasks, track team progress, and stay on top of your goals.
        </p>
      </div>
      {/* 🛠️ CHANGED HERE: Changed 'align-items-stretch' to 'align-items-start' */}
      <div className="row w-100 mb-4 g-4 justify-content-center align-items-start">
        {/* Left Column: Profile Card */}
        <div className="col-lg-4 col-md-5">
          {/* 🛠️ CHANGED HERE: Removed 'h-100' so it shrinks down to its natural size */}
          <div className="glass-card p-4 p-md-5 d-flex flex-column text-center ">
            <div className="py-2">
              <div className="d-flex justify-content-center mb-3">
                <div className="avatar-circle font-bold text-xl shadow-inner">
                  {initialLetter}
                </div>
              </div>

              <h4 className="mb-1 text-white font-bold tracking-tight">
                {userName}
              </h4>

              <p className="text-white-50 small mb-4 font-mono">
                @{userEmail.split("@")[0]}
              </p>

              {/* Enhanced Plan Badge with Live Pulse Indicator */}
              <span
                className="badge top-0 end-0 rounded-4 py-2 px-3 d-inline-flex align-items-center gap-1"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <ShieldCheck size={16} className="text-white/60" />
                <div className="text-white font-semibold text-sm">
                  FREE PLAN
                </div>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Projects List */}
        <div className="col-lg-8 col-md-7">
          {/* Kept h-100 here so the layout engine processes the right card correctly */}
          <div className="glass-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between text-start ">
            <div>
              <h3 className="mb-4 text-white d-flex align-items-center gap-2 text-xl font-bold tracking-tight">
                <Zap size={28} className="mb-1 fill-amber-400/20" />
                <span>Available Actions</span>
              </h3>

              <div className="row g-3">
                {/* Create project form */}
                <div className="col-12">
                  <form action={createProject} className="flex gap-3 mb-2">
                    <input
                      name="name"
                      placeholder="New project name..."
                      className="input-glass rounded-5 px-4 py-2 text-white w-50"
                      required
                    />
                    <button
                      type="submit"
                      className="btn-glass rounded-5 px-4 py-2 d-flex align-items-center justify-content-center gap-1 fw-bold"
                    >
                      <Plus size={20} /> CREATE PROJECT
                    </button>
                  </form>
                </div>

                {/* Projects list */}
                {projects.length === 0 ? (
                  <div className="col-12 text-center py-5 opacity-60">
                    <Folder className="text-white/40 mb-3 mx-auto" size={44} />
                    <p className="text-white/80 text-sm mb-0">
                      There are no projects yet. Create your first one above!
                    </p>
                  </div>
                ) : (
                  <div className="col-12 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                    <div className="row g-2">
                      {projects.map((project: any) => (
                        <div className="col-12" key={project.id}>
                          <Link
                            href={`/projects/${project.id}`}
                            className="action-link-card d-flex align-items-center gap-3 p-3 rounded-5 no-underline group transition-all"
                          >
                            <div className="action-icon-box shrink-0 transition-transform group-hover:scale-105">
                              <Folder size={20} className="text-white/70" />
                            </div>
                            <div>
                              <h5 className="m-0 mb-0.5 text-white text-base font-semibold group-hover:text-white transition-colors">
                                {project.name}
                              </h5>
                              <p className="mb-0 small text-white/40">
                                {project._count.tasks}{" "}
                                {project._count.tasks === 1 ? "task" : "tasks"}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Grid Aligned Stat Cards */}
      <div className="w-100 mt-2">
        <div className="row g-3 text-white justify-content-center">
          {stats.map((stat, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="stat-card d-flex align-items-center justify-content-start gap-3 px-4 py-3 rounded-5 transition-all duration-300 hover:bg-white/5">
                <div className="action-icon-box shrink-0">
                  <stat.icon size={20} className="text-white/80" />
                </div>
                <div className="text-start">
                  <h5 className="mb-0 fw-bold text-lg text-white">
                    {stat.value}
                  </h5>
                  <p
                    className="text-white/40 small mb-0 font-medium tracking-wide uppercase"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

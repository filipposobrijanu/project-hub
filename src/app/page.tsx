import Link from "next/link";
import { auth } from "@/lib/auth";
import { Shield, Zap, Smile, ExternalLink, Code2, Layers } from "lucide-react";
import FeatureGrid from "@/components/FeatureGrid/FeatureGrid";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[90vh] px-4 animate-fade-in-up">
      <small className="inline-flex items-center gap-2 text-sm md:text-base text-white glass-card rounded-2xl mb-3 px-4 py-2 tracking-widest">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          className="bi bi-asterisk"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
        </svg>
        Welcome to the future of team collaboration
      </small>
      {/* Slogan */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white max-w-4xl leading-tight">
        Organize your projects with style.
      </h1>

      {/* Paragraph */}
      <p className="mt-6 text-lg md:text-xl text-white-50 max-w-2xl">
        A minimal, glass-like project management platform designed for creative
        teams who want speed, transparency, and total control.
      </p>

      {/* CTA Button */}
      <div className="mt-3 mb-5">
        {session ? (
          <Link href="/dashboard">
            <button className="inline-flex items-center gap-0 btn-glass rounded-5 px-4 py-2 font-bold">
              <svg
                style={{ transform: "rotate(-45deg)" }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-right-short "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
              DASHBOARD
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="btn-glass rounded-5 px-4 py-2 text-lg font-bold">
              GET STARTED
            </button>
          </Link>
        )}
      </div>

      {/* Feature Grid */}
      <FeatureGrid />
    </div>
  );
}

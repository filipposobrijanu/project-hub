import { Comfortaa } from "next/font/google";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ColorBends from "@/components/ColorBends/ColorBends";
import p_logo from "@/assets/p_logo.png";
import Image from "next/image";
import NavLink from "@/components/NavLink/NavLink";
import { ExternalLink, Code2 } from "lucide-react";
import CreditCards from "@/components/CreditCards/CreditCards";
import type { Metadata } from "next";
import ShinyText from "@/components/ShinyText/ShinyText";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ProjectHub — Project Management with Style",
    template: "%s | ProjectHub",
  },
  description:
    "A minimal, glass-like project management platform for creative teams. Organize projects, tasks, and collaborate easily.",
  keywords: [
    "project management",
    "tasks",
    "cooperation",
    "projects",
    "management",
  ],
  authors: [
    { name: "Filippos Obrijanu", url: "https://github.com/yourusername" },
  ],
  creator: "Filippos Obrijanu",
  openGraph: {
    title: "ProjectHub — Project Management with Style",
    description:
      "Organize projects and tasks with a glassy, ​​modern application.",
    url: "https://το-σάιτ-σου.vercel.app",
    siteName: "ProjectHub",
    images: [
      {
        url: "/p_logo.png", // φτιάξε μια εικόνα 1200x630 και βάλτη στο public/
        width: 1200,
        height: 630,
        alt: "ProjectHub Preview",
      },
    ],
    locale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProjectHub — Project Management with Style",
    description:
      "Organize projects and tasks with a glassy, ​​modern application.",
    images: ["/p_logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Πάρε τα αρχικά του χρήστη για το avatar
  const userName = session?.user?.name || "User";
  const initialLetter = userName.charAt(0).toUpperCase();
  const userEmail = session?.user?.email || "";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="src/app/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${comfortaa.className} relative`}>
        <ColorBends
          colors={["#222222", "#0c0c0c", , "#000000"]}
          transparent={true}
          speed={0.2}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.3}
          noise={0.12}
          intensity={1.5}
          bandWidth={6}
          scale={0.9}
          iterations={1}
        />
        {/* Header με glass effect */}
        <div className="relative" style={{ zIndex: 1 }}>
          <header className="top-0 animate-fade-in-down z-50 glass-card mx-auto mt-3 rounded-2xl px-5 py-3 flex items-center justify-between w-full max-w-[50%]">
            <Link
              href="/"
              className="d-inline-flex header_logo items-center gap-2 fs-5 font-extrabold tracking-tight no-underline"
            >
              <Image
                src={p_logo}
                alt="ProjectHub Logo"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <div className="mt-1">
                <ShinyText
                  text="ProjectHub"
                  speed={2.5}
                  color="#d1d5db"
                  shineColor="#ffffff"
                  className="fw-bold"
                />
              </div>
            </Link>

            <nav className="flex items-center gap-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              {session?.user ? (
                <>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                  <NavLink href="/pricing">Pricing</NavLink>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                  >
                    <button
                      type="submit"
                      className="btn-glass rounded-5 px-4 py-2 text-sm"
                    >
                      LOGOUT
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login">
                  <button className="btn-glass rounded-5 px-4 py-2 text-sm">
                    SIGN IN
                  </button>
                </Link>
              )}
            </nav>
          </header>

          <main className="container mx-auto px-4 py-3">{children}</main>
          <footer className="glass-foot mx-auto mt-2 w-full   pt-4 pb-4 w-full max-w-[85%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center md:text-left items-center text-white/50 text-sm px-4 ">
              <Link
                href="/"
                className="d-inline-flex mb-2  header_logo items-center justify-center gap-2 fs-5 font-extrabold tracking-tight text-white no-underline"
              >
                <Image
                  src={p_logo}
                  style={{ opacity: 0.5 }}
                  alt="ProjectHub Logo"
                  width={36}
                  height={36}
                  className="h-9 w-9"
                />
                <div className="mt-1 text-white-50">ProjectHub</div>
              </Link>
              <h4 className="text-5xl md:text-7xl mt-3 mb-3 lg:text-8xl font-extrabold tracking-tighter text-white max-w-4xl leading-tight">
                Let’s build the future of work together.
              </h4>
              <Link
                href="/contact"
                className="btn-glass mb-4 text-decoration-none d-flex align-items-center rounded-5 px-4 py-2 m-0 text-sm w-fit justify-self-center md:justify-self-start"
              >
                CONTACT US
              </Link>
              <hr
                style={{ borderColor: "gray" }}
                className="border-t  w-full mx-auto my-8 mb-3"
              />

              <div className="flex mb-3 items-center justify-center md:justify-start gap-4">
                <Link
                  href="/"
                  className="hover:text-white hover-nav-link-active text-white transition-colors no-underline"
                >
                  Home
                </Link>
                {session?.user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="hover:text-white hover-nav-link-active text-white transition-colors no-underline"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/pricing"
                      className="hover:text-white hover-nav-link-active text-white transition-colors no-underline"
                    >
                      Pricing
                    </Link>
                  </>
                ) : null}
                <Link
                  href="/contact"
                  className="hover:text-white hover-nav-link-active text-white transition-colors no-underline"
                >
                  Contact
                </Link>
                <Link
                  href="https://github.com/filipposobrijanu"
                  className="hover:text-white hover-nav-link-active text-white transition-colors no-underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </Link>
              </div>
              <div className="mb-3">
                <CreditCards />
              </div>
              <div className="flex justify-center md:justify-end">
                <small style={{ fontSize: "0.8em" }} className="text-white-50">
                  © 2025 ProjectHub. All rights reserved.
                </small>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

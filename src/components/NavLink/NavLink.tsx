"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavLink.css";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm text-decoration-none font-medium transition-colors ${
        isActive ? "hover-nav-link-active" : "hover-nav-link"
      }`}
    >
      {children}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface navLinkProps {
  href: string;
  name: string;
}

export default function NavLink({ href, name }: navLinkProps) {
  return (
    <Link className={`navbar-link`} href={href}>
      <span className={usePathname() == href ? "current" : ""}>{name}</span>
    </Link>
  );
}

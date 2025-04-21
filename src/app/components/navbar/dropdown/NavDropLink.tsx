"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface navLinkProps {
  href: string;
  name: string;
  children: ReactNode;
}

export default function NavDropLink({ href, name, children }: navLinkProps) {
  return (
    <div className="group/navlink">
      <Link className="navbar-link" href={href} replace={true}>
        <span className={usePathname().startsWith(href) ? "current" : ""}>
          {name}
        </span>
        <i className="arrow rotate-45"></i>
      </Link>
      <div
        className={`
          fixed left-0 top-12 w-screen hidden group-hover/navlink:flex
          text-white font-normal bg-gray-900 border-solid border-b 
          border-red-500
        `}
      >
        {children}
      </div>
    </div>
  );
}

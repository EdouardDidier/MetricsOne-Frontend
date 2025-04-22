"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useRef } from "react";

interface navLinkProps {
  href: string;
  name: string;
  children?: ReactNode;
}

export const DropContext = createContext<() => void>(() => {});

export default function NavLink({ href, name, children }: navLinkProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  if (children == null) {
    return (
      <Link className={`navbar-link`} href={href}>
        <span className={pathname == href ? "current" : ""}>{name}</span>
      </Link>
    );
  }

  function openDropdown() {
    if (ref.current == null) return;
    ref.current.classList.remove("invisible");
  }

  function closeDropdown() {
    if (ref.current == null) return;
    ref.current.classList.add("invisible");
  }

  return (
    <div
      className="group/navlink"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <Link
        className="navbar-link"
        href={href}
        replace={true}
        onClick={closeDropdown}
      >
        <span className={pathname.startsWith(href) ? "current" : ""}>
          {name}
        </span>
        <i className="arrow rotate-45"></i>
      </Link>
      <div
        ref={ref}
        className={`
          fixed left-0 top-12 w-screen flex flex-col invisible
          text-white font-normal bg-gray-900 border-solid border-b 
          border-red-500
        `}
      >
        <DropContext.Provider value={closeDropdown}>
          {children}
        </DropContext.Provider>
      </div>
    </div>
  );
}

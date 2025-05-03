"use client";

import Link from "next/link";
import { ReactNode, useContext } from "react";

import { DropContext } from "../NavLink";

interface navLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavDropMainLink({ href, children }: navLinkProps) {
  const closeFunc = useContext<() => void>(DropContext);

  return (
    <Link href={href} onClick={closeFunc}>
      <div className="group inline-flex flex-col ">
        <div>
          {children}
          <i className="arrow border-red-600 scale-125 -rotate-45 relative bottom-0.5 ml-3 mr-1"></i>
        </div>
        <div className="self-center w-0 group-hover:w-full transition-[width] border-b-4 border-solid border-red-600"></div>
      </div>
    </Link>
  );
}

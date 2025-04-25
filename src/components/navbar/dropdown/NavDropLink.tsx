"use client";

import Link from "next/link";
import { ReactNode, useContext } from "react";

import { DropContext } from "../NavLink";

interface NavDropLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavDropLink({ href, children }: NavDropLinkProps) {
  const closeFunc = useContext<() => void>(DropContext);

  return (
    <Link href={href} onClick={closeFunc}>
      {children}
    </Link>
  );
}

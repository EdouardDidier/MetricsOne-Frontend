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
      {children}
    </Link>
  );
}

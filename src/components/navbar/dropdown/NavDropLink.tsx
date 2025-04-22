"use client";

import Link from "next/link";
import { ReactNode, useContext } from "react";

import { DropContext } from "../NavLink";
import { Driver } from "@/types/Driver";

interface NavDropLinkProps {
  driver: Driver;
  children: ReactNode;
}

export default function NavDropLink({ driver, children }: NavDropLinkProps) {
  const closeFunc = useContext<() => void>(DropContext);

  return (
    <Link
      href={`/drivers/${driver.full_name.toLowerCase().replace(" ", "-")}`}
      onClick={closeFunc}
    >
      {children}
    </Link>
  );
}

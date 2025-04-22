"use client";

import Link from "next/link";
import { ReactNode, useContext } from "react";

import { DropContext } from "../Navlink";

// TODO: Move to a generic type file
interface Driver {
  first_name: string;
  last_name: string;
  full_name: string;
  team_colour: string;
  headshot_url: string;
}

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

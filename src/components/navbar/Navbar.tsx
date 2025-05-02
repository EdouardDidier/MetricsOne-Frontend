import { Suspense } from "react";

import NavHome from "./NavHome";
import NavLink from "./NavLink";

import NavDropDrivers from "./dropdown/NavDropDrivers";
import NavDropTeams from "./dropdown/NavDropTeams";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-12 m-0 flex flex-row bg-red-600 text-white shadow-lg">
      <NavHome />
      <NavLink href="/races" name="Races" />
      <NavLink href="/drivers" name="Drivers">
        <Suspense fallback={<div>Loading...</div>}>
          <NavDropDrivers />
        </Suspense>
      </NavLink>
      <NavLink href="/teams" name="Teams">
        <Suspense fallback={<div>Loading...</div>}>
          <NavDropTeams />
        </Suspense>
      </NavLink>
    </nav>
  );
}

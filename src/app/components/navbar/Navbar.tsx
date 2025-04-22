import { Suspense } from "react";

import NavLink from "./Navlink";
import NavDropLink from "./dropdown/NavDropLink";
import NavDropDrivers from "./dropdown/NavDropDrivers";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-12 m-0 flex flex-row bg-red-600 text-white shadow-lg">
      <NavLink href="/" name="Metrics One" />
      <NavLink href="/races" name="Races" />
      <NavLink href="/drivers" name="Drivers">
        <Suspense fallback={<div>Loading...</div>}>
          <NavDropDrivers />
        </Suspense>
      </NavLink>
      <NavLink href="/teams" name="Teams">
        <Suspense fallback={<div>Loading...</div>}>Test Teams</Suspense>
      </NavLink>
    </nav>
  );
}

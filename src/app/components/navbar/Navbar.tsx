import { Suspense } from "react";

import NavLink from "./Navlink";
import NavDropLink from "./dropdown/NavDropLink";
import NavDropDrivers from "./dropdown/NavDropDrivers";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-12 m-0 flex flex-row bg-gray-900 text-white shadow-lg">
      <NavLink href="/" name="Metrics One" />
      <NavLink href="/races" name="Races" />
      <NavDropLink href="/drivers" name="Drivers">
        <Suspense fallback={<div>Loading...</div>}>
          <NavDropDrivers />
        </Suspense>
      </NavDropLink>
      <NavDropLink href="/teams" name="Teams">
        <Suspense fallback={<div>Loading...</div>}>Test Teams</Suspense>
      </NavDropLink>
      <div className="flex grow bg-red-600"></div>
    </nav>
  );
}

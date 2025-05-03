import { Team } from "./Team";

export interface Driver {
  first_name: string;
  last_name: string;
  url: string;
  number: number;
  year: number;
  images?: DriversImages;
  team?: Team;
}

interface DriversImages {
  headshot_url: string;
  profile_url: string;
}

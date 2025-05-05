export interface Team {
  name: string;
  url: string;
  colour: string;
  year: number;
  images?: TeamsImages;
}

interface TeamsImages {
  car_url: string;
  logo_url: string;
}

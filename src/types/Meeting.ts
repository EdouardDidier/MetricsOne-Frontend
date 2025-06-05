import { Session } from "./Session";

export interface Meeting {
  key: number;
  number: number;
  location: string;
  official_name: string;
  name: string;
  year: number;
  sessions?: Array<Session>;
}

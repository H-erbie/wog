import { home } from "./schemas/home";
import { events } from "./schemas/events";
import { about } from "./schemas/about";
import { sponsors } from "./schemas/sponsors";
import { gallery } from "./schemas/gallery";
import { siteInfo } from "./schemas/site-info";
import { stat } from "./schemas/stat";
import {  team } from "./schemas/team";

export const schema = {
  types: [about, sponsors, gallery, siteInfo, team, stat, home, events],
}


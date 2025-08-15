export interface MenuItem {
  path: string;
  label: string;
}

export const menuItems: MenuItem[] = [
  { path: "/", label: "Home" },
  { path: "/series", label: "Series" },
  { path: "/movies", label: "Movies" },
  { path: "/anime", label: "Anime" },
];

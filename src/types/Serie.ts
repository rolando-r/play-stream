export interface Genre {
  id: number;
  name: string;
}

export interface Serie {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  logo_path?: string;
  adult?: boolean;
}

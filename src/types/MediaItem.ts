export interface Genre {
  id: number;
  name: string;
}

export interface MediaItem {
  id: number;

  // Películas
  title?: string;
  release_date?: string;
  runtime?: number;

  // Series
  name?: string;
  first_air_date?: string;
  episode_run_time?: number[];

  overview: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  logo_path?: string;
  adult?: boolean;
}
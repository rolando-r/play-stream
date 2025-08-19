export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  poster_path: string;
  backdrop_path: string; 
  genres: Genre[];
  logo_path?: string;
  adult?: boolean;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovieTrailer = async (movieId: number) => {
  const movieRes = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  const movie = await movieRes.json();

  const videoRes = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
  const videos = await videoRes.json();
  const trailer = videos.results.find(
    (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return { movie, trailerKey: trailer ? trailer.key : null };
};

export const getDetailsWithLogos = async (id: number, type: "movie" | "tv") => {
  try {
    const [detailsRes, videosRes, imagesRes] = await Promise.all([
      fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`),
      fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`),
      fetch(`${BASE_URL}/${type}/${id}/images?api_key=${API_KEY}`),
    ]);

    const details = await detailsRes.json();
    const videos = await videosRes.json();
    const images = await imagesRes.json();

    const trailerKey =
      videos.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube")?.key ?? null;

    const logo =
      images.logos?.find((l: any) => l.iso_639_1 === "en")?.file_path ||
      images.logos?.find((l: any) => l.iso_639_1 === null)?.file_path ||
      null;

    return {
      item: {
        ...details,
        logo_path: logo,
      },
      trailerKey,
    };
  } catch (error) {
    console.error(`Error fetching ${type} details:`, error);
    return null;
  }
};


export const getTrending = async () => {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return [];
  }
};


export const getPopularMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getPopularSeries = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching popular series:", error);
    return [];
  }
};

export const getPopularAnime = async () => {
  try {
    const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=1`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching popular anime:", error);
    return [];
  }
};
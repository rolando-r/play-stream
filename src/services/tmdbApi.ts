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


export const getTrending = async (
  mediaType: "movie" | "tv" = "movie",
  timeWindow: "day" | "week" = "day"
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}&language=en-US`
    );
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

export const getSimilarMovies = async (movieId: number) => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return [];
  }
};


export const getSimilarSeries = async (seriesId: number) => {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${seriesId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching recommended series:", error);
    return [];
  }
};

export const getWatchProviders = async (
  id: number,
  mediaType: "movie" | "tv"
) => {
  if (!id) return {};
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results || {};
};

export const searchMulti = async (query: string, page: number = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}&include_adult=false`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching media:", error);
    return [];
  }
};

export const getInitialSearchResults = async () => {
  try {
    const res = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching initial search results:", error);
    return [];
  }
};

export const getItemImages = async (item: any) => {
  try {
    const type = item.media_type === "tv" ? "tv" : "movie";
    const res = await fetch(
      `${BASE_URL}/${type}/${item.id}/images?api_key=${API_KEY}&include_image_language=en,US,null`
    );
    return await res.json();
  } catch (err) {
    console.error("Error fetching images:", err);
    return null;
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return [];
  }
};
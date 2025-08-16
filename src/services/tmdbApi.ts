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

export const getMovieDetailsWithLogos = async (movieId: number) => {
  try {
    const [movieRes, videoRes, imagesRes, releaseRes] = await Promise.all([
      fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
      fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`),
      fetch(`${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/movie/${movieId}/release_dates?api_key=${API_KEY}`),
    ]);

    const movie = await movieRes.json();
    const videos = await videoRes.json();
    const images = await imagesRes.json();
    const releaseDates = await releaseRes.json();

    const trailer = videos.results.find(
      (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    const logo = images.logos?.find((logo: any) => logo.iso_639_1 === "en") || images.logos?.[0];
    movie.logo_path = logo?.file_path || null;

    const certificationData = releaseDates.results.find((r: any) => r.iso_3166_1 === "US");
    const certification = certificationData?.release_dates?.[0]?.certification || "";

    return { movie, trailerKey: trailer ? trailer.key : null, certification };
  } catch (error) {
    console.error(error);
    return null;
  }
};

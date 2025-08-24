const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_BASE_URL = "https://www.omdbapi.com/";

export const getOmdbInfo = async (imdbId: string) => {
  try {
    const res = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}`);
    const data = await res.json();
    if (data.Response === "False") throw new Error(data.Error);
    return data;
  } catch (error) {
    console.error("Error fetching OMDb info:", error);
    return null;
  }
};

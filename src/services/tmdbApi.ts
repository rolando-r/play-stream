import axios from 'axios';

const API_KEY = 'TU_API_KEY';
const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'es-ES',
  },
});

export const getPopularMovies = () => tmdb.get('/movie/popular');

export const getMovieById = (id: string | number) =>
  tmdb.get(`/movie/${id}`);

export const searchMovies = (query: string) =>
  tmdb.get('/search/movie', { params: { query } });

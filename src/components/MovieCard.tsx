import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieById } from '../services';
import type { Movie } from '../types/Movie';


function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    getMovieById(id)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error cargando detalles:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-white">Cargando...</p>;
  if (!movie) return <p className="text-center text-red-500">No se encontró la película.</p>;

  return (
    <div className="p-4 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full max-w-sm mb-4"
      />
      <p className="mb-2"><strong>Sinopsis:</strong> {movie.overview}</p>
      <p className="mb-2"><strong>Puntuación:</strong> {movie.vote_average} / 10</p>
      <p className="mb-2"><strong>Fecha de estreno:</strong> {movie.release_date}</p>
      <p className="mb-2"><strong>Duración:</strong> {movie.runtime} minutos</p>
      <p className="mb-2"><strong>Géneros:</strong> {movie.genres.map(g => g.name).join(', ')}</p>

      {/* Aquí podrías agregar un botón para ver trailer o más info */}
    </div>
  );
}

export default MovieDetailsPage;

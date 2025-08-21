import { Routes, Route } from "react-router-dom";
import { HomePage, MoviesPage, SeriesPage, AnimePage, MoviesDetail, SeriesDetail, SearchPage } from "../pages/";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/series" element={<SeriesPage />} />
      <Route path="/anime" element={<AnimePage />} />
      <Route path="/search" element={<SearchPage />} />

      {/* Dynamic Routes */}
      <Route path="/movie/:id" element={<MoviesDetail />} />
      <Route path="/tv/:id" element={<SeriesDetail />} />
    </Routes>
  );
};

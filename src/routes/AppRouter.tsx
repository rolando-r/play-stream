import { Routes, Route } from "react-router-dom";
import { HomePage, MoviesPage, SeriesPage, AnimePage } from "../pages/";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/series" element={<SeriesPage />} />
      <Route path="/anime" element={<AnimePage />} />
    </Routes>
  );
};

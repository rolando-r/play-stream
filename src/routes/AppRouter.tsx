import { Routes, Route } from 'react-router-dom';
import { HomePage} from '../features/MovieDetails/pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
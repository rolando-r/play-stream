import { Routes, Route } from 'react-router-dom';
import { HomePage} from '../features/Home/pages';

export const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
  );
}
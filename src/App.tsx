import './styles/global.css'
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './layout';
import { AppRouter } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App

import './styles/global.css'
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Footer } from './layout';
import { AppRouter } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

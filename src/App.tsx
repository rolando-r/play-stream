import './styles/global.css'
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Footer } from './layout';
import { AppRouter } from './routes';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <ScrollToTop/>
      <AppRouter/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

import './styles/global.css'
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Footer } from './layout';
import { AppRouter } from './routes';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <ScrollToTop />
        <main className="flex-grow">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}


export default App

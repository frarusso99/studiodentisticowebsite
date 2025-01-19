import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'; // Importa ScrollToTop
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Studio from './components/Studio';
import Location from './components/Location';
import BlogCarousel from './components/BlogCarousel';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Team />
      <Studio />
      <Location />
      <BlogCarousel />
    </>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-grow relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter basename="/studiodentisticowebsite">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
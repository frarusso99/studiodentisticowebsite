import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import TemporaryLandingPage from './components/TemporaryLandingPage';
import Hero from './components/Hero';
import Services from './components/Services';
// import Team from './components/Team';
import Studio from './components/Studio';
import Location from './components/Location';
import BlogCarousel from './components/BlogCarousel';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import IubendaCookieBanner from './components/IubendaCookieBanner';

// Pagina temporanea che mostra solo landing page e sezione location
const TemporaryHome = () => {
  return (
    <>
      <TemporaryLandingPage />
    </>
  );
};

// Pagina completa originale (per quando vorrai tornare al sito completo)
const FullHome = () => {
  return (
    <>
      <Hero />
      <Services />
      {/* <Team /> */}
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

// Layout senza navbar per la landing page temporanea
const TemporaryLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <main className="flex-grow relative">
        <Outlet />
      </main>
+
    </div>
  );
};

function App() {
  // Imposta su true per mostrare la landing page temporanea
  const showTemporary = false;

  return (
    <BrowserRouter>
      <IubendaCookieBanner /> {/* Aggiungi qui il banner cookie */}
      <ScrollToTop />
      <Routes>
        {showTemporary ? (
          <Route path="/" element={<TemporaryLayout />}>
            <Route index element={<TemporaryHome />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
          </Route>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<FullHome />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
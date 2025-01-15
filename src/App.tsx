import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Studio from './components/Studio';
import Location from './components/Location';
import BlogCarousel from './components/BlogCarousel';
import Footer from './components/Footer';



function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Team />
      <Studio />
      <Location />
      <BlogCarousel />
      <Footer />
    </div>
  );
}

export default App;
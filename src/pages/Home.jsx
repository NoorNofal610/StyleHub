import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Brands from '../components/Brands';
import WhatsNew from '../components/WhatsNew';
import AboutUs from '../components/AboutUs';
import Category from '../components/Category';
import Footer from '../components/Footer';

function Home({ favoriteItems, onToggleFavorite }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <div id="home"><Header /></div>
      <div id="brands"><Brands /></div>
      <div id="about"><AboutUs /></div>
      <div id="whatsnew">
        <WhatsNew 
          favoriteItems={favoriteItems} 
          onToggleFavorite={onToggleFavorite} 
        />
      </div>
      <div id="category"><Category /></div>
      <div id="contact"><Footer /></div>
    </>
  );
}

export default Home;

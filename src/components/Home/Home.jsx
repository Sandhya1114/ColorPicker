import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <>
      <div className="homeContainer">
        <div className="heroSection">
          <div className="ImgHeading">
            {/* <img
              src="https://png.pngtree.com/png-clipart/20230323/original/pngtree-happy-holi-colors-splash-powder-festival-of-india-png-image_9001435.png"
              alt="Holi splash"
              height={250}
              width={300}
            /> */}
            <h1 className="mainHeading">Color Palettes</h1>
          </div>

          <p className="description">
            Find the perfact color palettes for your projects.
            perfect for designers, developers, and creatives. Create the perfect palette or get inspired by thousands of beautiful color schemes.
          </p>

          <Link to="/upload">
            <button className="mainButton">Explore</button>
          </Link>
        </div>
        <img
              src="./homepage_hero_palettes.png"
              alt="Holi splash"
              height={486}
              width={545}
              className='HeroImg'
            />
      </div>

      {/* Services Section */}
      <div className="servicesSection">
        <h2 className="servicesHeading">Our Offerings</h2>
        <div className="servicesList">
          <div className="serviceBox">
            <h3>Generate Color Palettes</h3>
            <p>Create custom palettes based on your image colors for UI/UX or branding.</p>
          </div>
          <div className="serviceBox">
            <h3>Extract Dominant Colors</h3>
            <p>Upload any image and instantly get the top 4 visible colors in HEX format.</p>
          </div>
          
          <div className="serviceBox">
            <h3>Download or Share</h3>
            <p>Save your palette or copy hex codes to use in your projects or share with your team.</p>
          </div>
          <div className="serviceBox">
            <h3>Extract Dominant Colors</h3>
            <p>Upload any image and instantly get the top 4 visible colors in HEX format.</p>
          </div>
          <div className="serviceBox">
            <h3>Generate Color Palettes</h3>
            <p>Create custom palettes based on your image colors for UI/UX or branding.</p>
          </div>
          <div className="serviceBox">
            <h3>Download or Share</h3>
            <p>Save your palette or copy hex codes to use in your projects or share with your team.</p>
          </div>
        </div>
      </div>

      {<Footer/>}
      
    </>
  );
}

export default Home;


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
            <h1 className="mainHeading">Welcome to Color Picker</h1>
          </div>

          <p className="description">
            This tool uses smart color detection to give you the core color palette of your images —
            perfect for designers, developers, and creatives. Just upload a photo, and we’ll handle the rest.
          </p>

          <Link to="/upload">
            <button className="mainButton">Get Started</button>
          </Link>
        </div>
        <img
              src="https://tse4.mm.bing.net/th?id=OIP.QM-C3Ytmqz6IwyPlb-Q3tAHaHa&pid=Api&P=0&w=300&h=300"
              alt="Holi splash"
              height={350}
              width={400}
              className='HeroImg'
            />
      </div>

      {/* Services Section */}
      <div className="servicesSection">
        <h2 className="servicesHeading">What You Can Do</h2>
        <div className="servicesList">
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


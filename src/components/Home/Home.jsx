// import { Link } from 'react-router-dom';
// import './Home.css';
// import Footer from '../Footer/Footer';

// function Home() {
//   return (
//     <>
//       <div className="homeContainer">
//         <div className="heroSection">
//           <div className="ImgHeading">
//             {/* <img
//               src="https://png.pngtree.com/png-clipart/20230323/original/pngtree-happy-holi-colors-splash-powder-festival-of-india-png-image_9001435.png"
//               alt="Holi splash"
//               height={250}
//               width={300}
//             /> */}
//             <h1 className="mainHeading">Color Palettes</h1>
//           </div>

//           <p className="description">
//             Find the perfact color palettes for your projects.
//             perfect for designers, developers, and creatives. Create the perfect palette or get inspired by thousands of beautiful color schemes.
//           </p>

//           <Link to="/upload">
//             <button className="mainButton">Explore</button>
//           </Link>
//         </div>
//         <div>
//              <img
//               // src="./homepage_hero_palettes.png"
//               // src="./plant.jpg"
//               src="./palette.jpg"
//               alt="Holi splash"
//               height={500}
//               // width={345}
//               className='HeroImg'
//             />
//         </div>
         
//       </div>
      
      // {/* scroll */}
      // <div className='pickergen'>
      //  <h1>Extract a beautiful color palette from your photos </h1>
      //   <p>A world of colors on the palette remaining... wandering... on canvases still emerging.Extract a beautiful color palette from your photos with our image color picker and palette extracting tool. </p>
      // </div>
      
      //   <div className="cards-container">
          
        //   <div className="card" style={{ backgroundImage: "url('./plant.jpg')" }}>
        //     <div className="card-content">
        //       {/* <h3 className="card-title">Plant</h3>
        //       <p className="card-desc">A beautiful plant image.</p> */}
        //     </div>
        //   </div>
        //   {/* <div className="card" style={{ backgroundImage: "url('./pink.jpg')" }}>
        //     <div className="card-content">
        //       <h3 className="card-title">Pink</h3>
        //       <p className="card-desc">A vibrant pink image.</p>
        //     </div>
        //   </div> */}
        //   <div className="card" style={{ backgroundImage: "url('./oceanGreen.jpg')" }}>
        //     <div className="card-content">
        //       {/* <h3 className="card-title">Pink</h3>
        //       <p className="card-desc">A vibrant pink image.</p> */}
        //     </div>
        //   </div>
        //   <div className="card" style={{ backgroundImage: "url('./rainyPlant.jpg')" }}>
        //     <div className="card-content">
        //       {/* <h3 className="card-title">Pink</h3>
        //       <p className="card-desc">A vibrant pink image.</p> */}
        //     </div>
        //   </div>
        //   <div className="card" style={{ backgroundImage: "url('./lily.jpg')" }}>
        //     <div className="card-content">
        //       {/* <h3 className="card-title">Pink</h3>
        //       <p className="card-desc">A vibrant pink image.</p> */}
        //     </div>
        //   </div>
        //   <div className="card" style={{ backgroundImage: "url('./purple.jpg')" }}>
        //     <div className="card-content">
        //       {/* <h3 className="card-title">Purple</h3>
        //       <p className="card-desc">A stunning purple image.</p> */}
        //     </div>
        //   </div>
        //   <div className="card" style={{ backgroundImage: "url('./ocean.jpg')" }}>
        //     <div className="card-content">
        //       {/* <h3 className="card-title">Ocean</h3>
        //       <p className="card-desc">A serene ocean image.</p> */}
        //     </div>
        //   </div>
        // </div>
        // <div className='forPalettes'>
        //     <Link to="/upload">
        //     <button className="mainButton ">Get Started</button>
        //     </Link>
      //   </div>
        

//       {/* Services Section */}
      // <div className="servicesSection">
      //   <h2 className="servicesHeading">Our Offerings</h2>
        
      //   <div className="servicesList">
      //     <div className="serviceBox">
      //       <h3>Generate Color Palettes</h3>
      //       <p>Create custom palettes based on your image colors for UI/UX or branding.</p>
      //     </div>
      //     <div className="serviceBox">
      //       <h3>Extract Dominant Colors</h3>
      //       <p>Upload any image and instantly get the top 4 visible colors in HEX format.</p>
      //     </div>
          
      //     <div className="serviceBox">
      //       <h3>Download or Share</h3>
      //       <p>Save your palette or copy hex codes to use in your projects or share with your team.</p>
      //     </div>
      //     <div className="serviceBox">
      //       <h3>Colors Picker with it Shades </h3>
      //       <p>Genrate multiple shades of it's color in HEX format.</p>
      //     </div>
      //     <div className="serviceBox">
      //       <h3>Generate Color Gradient</h3>
      //       <p>Create custom Gradient get it's code</p>
      //     </div>
      //     <div className="serviceBox">
      //       <h3>Get thousands of Palettes</h3>
      //       <p>Save your palette or copy hex codes to use in your projects or share with your team.</p>
      //     </div>
      //   </div>
      // </div>

//       {<Footer/>}
      
//     </>
//   );
// }

// export default Home;

/// src/components/Home/Home.jsx
import { useNavigate,Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Import the Supabase client
import './Home.css';
import Footer from '../Footer/Footer';

function Home() {
  const navigate = useNavigate();

  const handleExploreClick = async () => {
    const { data: { user } } = await supabase.auth.getUser (); // Use getUser () to retrieve the current user
    if (user) {
      navigate('/upload'); // Navigate to upload if user is authenticated
    } else {
      navigate('/auth'); // Redirect to AuthPage if not authenticated
    }
  };

  return (
    <>
      <div className="homeContainer">
        <div className="heroSection">
          <div className="ImgHeading">
            <h1 className="mainHeading">Color Palettes</h1>
          </div>

          <p className="description">
            Find the perfect color palettes for your projects.
            Perfect for designers, developers, and creatives. Create the perfect palette or get inspired by thousands of beautiful color schemes.
          </p>

          <button className="mainButton" onClick={handleExploreClick}>
            Explore
          </button>
        </div>
        <div>
          <img
            src="./palette.jpg"
            alt="Holi splash"
            height={500}
            className='HeroImg'
          />
        </div>
      </div>

      {/* Other sections remain unchanged */}
      <div className='pickergen'>
        <h1>Extract a beautiful color palette from your photos</h1>
        <p>A world of colors on the palette remaining... wandering... on canvases still emerging. Extract a beautiful color palette from your photos with our image color picker and palette extracting tool.</p>
      </div>

      <div className="cards-container">
       
          <div className="card" style={{ backgroundImage: "url('./plant.jpg')" }}>
            <div className="card-content">
              {/* <h3 className="card-title">Plant</h3>
              <p className="card-desc">A beautiful plant image.</p> */}
            </div>
          </div>
          {/* <div className="card" style={{ backgroundImage: "url('./pink.jpg')" }}>
            <div className="card-content">
              <h3 className="card-title">Pink</h3>
              <p className="card-desc">A vibrant pink image.</p>
            </div>
          </div> */}
          <div className="card" style={{ backgroundImage: "url('./oceanGreen.jpg')" }}>
            <div className="card-content">
              {/* <h3 className="card-title">Pink</h3>
              <p className="card-desc">A vibrant pink image.</p> */}
            </div>
          </div>
          <div className="card" style={{ backgroundImage: "url('./rainyPlant.jpg')" }}>
            <div className="card-content">
              {/* <h3 className="card-title">Pink</h3>
              <p className="card-desc">A vibrant pink image.</p> */}
            </div>
          </div>
          <div className="card" style={{ backgroundImage: "url('./lily.jpg')" }}>
            <div className="card-content">
              {/* <h3 className="card-title">Pink</h3>
              <p className="card-desc">A vibrant pink image.</p> */}
            </div>
          </div>
          <div className="card" style={{ backgroundImage: "url('./purple.jpg')" }}>
            <div className="card-content">
              {/* <h3 className="card-title">Purple</h3>
              <p className="card-desc">A stunning purple image.</p> */}
            </div>
          </div>
          <div className="card" style={{ backgroundImage: "url('./ocean.jpg')" }}>
            <div className="card-content">
              {/* <h3 className="card-title">Ocean</h3>
              <p className="card-desc">A serene ocean image.</p> */}
            </div>
          </div>
        </div>
        <div className='forPalettes'>
            <Link to="/upload">
            <button className="mainButton ">Get Started</button>
            </Link>
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
            <h3>Colors Picker with it Shades </h3>
            <p>Genrate multiple shades of it's color in HEX format.</p>
          </div>
          <div className="serviceBox">
            <h3>Generate Color Gradient</h3>
            <p>Create custom Gradient get it's code</p>
          </div>
          <div className="serviceBox">
            <h3>Get thousands of Palettes</h3>
            <p>Save your palette or copy hex codes to use in your projects or share with your team.</p>
          </div>
        </div>
      </div>


      <Footer />
    </>
  );
}

export default Home;

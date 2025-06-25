import './Footer.css';

export default function Footer() {
  return (
    <footer className="footerWrapper">
      <div className="footerGrid">
        <div className="footerColumn">
          <h4>Tools</h4>
          <ul>
            <li>Generate your palettes</li>
            <li>Explore popular palettes</li>
            <li>Extract palette from image</li>
            <li>Contrast checker</li>
            <li>Preview palettes on designs</li>
            <li>Recolor your own design</li>
            <li>Color picker</li>
            <li>Browse free fonts</li>
          </ul>
        </div>

        <div className="footerColumn">
          <h4>More</h4>
          <ul>
            <li>List of colors</li>
            <li>Browse gradients</li>
            <li>Create a gradient</li>
            <li>Make a gradient palette</li>
            <li>Image converter</li>
            <li>Create a collage</li>
            <li>Font Generator</li>
          </ul>
        </div>

        <div className="footerColumn">
          <h4>Apps</h4>
          <ul>
            <li>iOS App</li>
            <li>Android App</li>
            <li>Figma Plugin</li>
            <li>Adobe Extension</li>
            <li>Chrome Extension</li>
            <li>Instagram Page</li>
          </ul>
        </div>

        <div className="footerColumn">
          <h4>Company</h4>
          <ul>
            <li>Pricing</li>
            <li>License</li>
            <li>Terms of service</li>
            <li>Privacy policy</li>
            <li>Cookie policy</li>
            <li>Manage cookies</li>
            <li>Help center</li>
            <li>Advertise</li>
            <li>Affiliate</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      {/* <div className="footerBottom">
        <p>
          &copy; {new Date().getFullYear()} Color Picker  <strong> All rights reserved</strong>. Let's make something cool!
           
        </p>
      </div> */}
    </footer>
  );
}

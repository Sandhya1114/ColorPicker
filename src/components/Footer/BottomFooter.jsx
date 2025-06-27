import './footer.css';
export default function BottomFooter(){
    return(
        <>  
           <div className="footerBottom">
            <p>
                 &copy; {new Date().getFullYear()} Color Picker  <strong> All rights reserved</strong>. Let's make something cool!
           
             </p>
          </div>
        </>
    )
}

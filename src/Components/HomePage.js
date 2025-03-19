import React from "react";
import homeImg from "../Images/amazonlogo.jpg";
import Product from "./product";
import "./Home.css";
import shortid from "shortid"
import ProductImg1 from "../Images/product/1.png";
import ProductImg2 from "../Images/product/2.png";
import ProductImg3 from "../Images/product/3.png";
import ProductImg4 from "../Images/product/4.png";
import ProductImg5 from "../Images/product/5.png";
import ProductImg6 from "../Images/product/6.png";



const Homepage = () => {
  
  return (
    <div className="home">
      <div className="home-container">
        <img className="home-image" src={homeImg} alt="home-img" />
        <div className="home-row">
        <Product 
        id={shortid.generate()} 
        image={ProductImg1}
        price={1000}
        title="OneOdio Wired Over Ear Headphones Studio Monitor & Mixing DJ Stereo Headsets with 50mm Neodymium Drivers and 1/4 to 3.5mm Jack for AMP Computer Recording Podcast Keyboard Guitar Laptop - Black" 
        rating={5}/>    

 <Product 
        id={shortid.generate()} 
        image={ProductImg2}
        price={200}
        title="NO MORE ADAPTER: DJ style coiled cord (9.8Ft Stretched) easily reaches from the TV or stereo to your chair. A standard-sized 6.35mm plug and a 3.5mm plug are included. They both are completely detachable, you can plug in the mixer you want to use.with 50mm Neodymium Drivers and 1/4 to 3.5mm Jack for AMP Computer Recording Podcast Keyboard Guitar Laptop - Black" 
        rating={7}/> 
        
        </div>

        <div className="home-row">
        <Product 
        id={shortid.generate()} 
        image={ProductImg3}
        price={880}
        title="OneOdio Wired Over Ear Headphones  Monitor & Mixing DJ Stereo Headsets with 50mm Neodymium Drivers and 1/4 to 3.5mm Jack for AMP Computer Recording Podcast Keyboard Guitar Laptop - Black" 
        rating={3}/> 

         <Product 
        id={shortid.generate()} 
        image={ProductImg4}
        price={667}
        title="OneOdio Wired Over Ear Headphones Studio Monitor & Mixing DJ Stereo Headsets with 50mm Neodymium Drivers and 1/4 to 3.5mm Jack for AMP Computer Recording Podcast Keyboard Guitar Laptop - Black" 
        rating={5}/> 

         <Product 
        id={shortid.generate()} 
        image={ProductImg5}
        price={120}
        title="OneOdio Wired Over Ear Headphones Studio Monitor & Mixing DJ Stereo Headsets with 50mm Neodymium Drivers and 1/4 to 3.5mm Jack for AMP Computer Recording Podcast Keyboard Guitar Laptop - Black" 
        rating={8}/> 

        </div>
        <div className="home-row">
 <Product 
        id={shortid.generate()} 
        image={ProductImg6}
        price={90}
        title="OneOdio Wired Over Ear Headphones Studio Monitor & Mixing DJ Stereo Headsets with 50mm Neodymium Drivers and 1/4 to 3.5mm Jack for AMP Computer Recording Podcast Keyboard Guitar Laptop - Black" 
        rating={5}/>        
         </div>

      </div>
    </div>
  );
};

export default Homepage;

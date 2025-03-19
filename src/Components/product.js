import React from "react";
import starIcon from "../Images/start.png";
import "./product.css";
import {useAuth} from "../context/GlobalStae"




const Product = ({ title, price, image, rating, id }) => {
const {dispatch , basket}= useAuth();
  const AddTOBasket =()=>{
    dispatch({
      type:"ADD_TO_BASKET",
      item:{
        id:id,
        title:title,
        price:price,
        image:image,
        rating:rating,
      }
    }) 
  }
  //console.log(basket)
  
  return (
    <div className="product">
    <div className="product-info">
      <p>{title}</p>
      <p className="product-price">
        <small>$</small>
        <strong>{price}</strong>
      </p>
    </div>
    <div className="product-rating">
      {Array(rating)
        .fill()
        .map((_, i) => (
          <p key={i}>
            <img src={starIcon} alt="start" />
          </p>
        ))}
    </div>
    <img src={image} alt="product-img" />
    <button onClick={AddTOBasket}>Add to Basket</button>
  </div>
);
  
};

export default Product;
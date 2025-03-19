import React from 'react';
import starIcon from "../Images/start.png";
import "./CheckoutProduct.css";
import {useAuth} from "../context/GlobalStae"
function CheckoutProduct({ id, image, title, price, rating, hiddenButton }) {

 const {dispatch} = useAuth()
  const removeFromeBasket = ()=>{
    dispatch({
      type:"REMOVE_FROM_BASKET",
      id:id,//action.id
    })

 }
 
  return  (
        <div className="checkoutProduct">
          <img className="checkoutProduct-image" src={image} alt='checkout'/>
          <div className="checkoutProduct-info">
            <p className="checkoutProduct-title">{title}</p>
            <p className="checkoutProduct-price">
              <small>$</small>
              <strong>{price}</strong>
            </p>
            <div className="checkoutProduct-rating">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <p>
                    <img src={starIcon} alt='start'/>
                  </p>
                ))}
            </div>
         
            {!hiddenButton && (
          <button onClick={removeFromeBasket}>Remove from Basket</button>
        )}
          
          </div>
        </div>
      );
}

export default CheckoutProduct;
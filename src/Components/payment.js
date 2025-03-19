import { CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import { React, useEffect, useState} from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/GlobalStae";
import CheckoutProduct from "./checkoutProduct";
import "./payment.css";
import { getBasketTotal } from "../context/AppReducer";
import axios from "./axiosComponent"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";




const Payment = () => {

  const { basket, user, dispatch } = useAuth();
  const [clientSecret, setClientSecret] = useState();//clientSecret a partir backend (functions a partir file index.js)
  const navigate = useNavigate();

  // Etape 6 : confirmation de payment method (confirm chekout complete:)
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);// if payment method succeeded or no
  const [processing, setProcessing] = useState("");// handling payment method
  const stripe = useStripe();
  const elements = useElements();// elements  it's a master card eli nesta3mlouha (card smart or visa etc...)
 

  useEffect(() => {

    // Etape 4: send session ID (secret key = response )
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      return response;
      //response = secret Key
    };

    getClientSecret();
  }, [basket]);
  
  
//console.log(user)

  //Etape 6:  method confirmation de payment if(sucses) :
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
        
      })
      
      .then(({ paymentIntent }) => {
      // start data base
      const ref = doc(db , "users", user?.uid , "orders", paymentIntent?.id)
      setDoc(ref,{
        basket:basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      })
      // end Data base

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",// 
        });
        navigate("/orders", { replace: true });// { replace: true } : Directs you to page orders
      });
  };
 // role de function if user change carte
  const handleChange = (event) => {
   setDisabled(event.empty);// whene we change a master new card ,change disable a false and return state empty.
   setError(error ? error.message : ""); //whene we change a master card, if we have a error send a message, if no return empty string ( "" ).
  };
  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>
        {/* Delivery Address */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>Monastir, Tunisia</p>
          </div>
        </div>
        {/* Review Items*/}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment method*/}
        <div className="payment-section">
          <h3>Payment Method</h3>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  type="submit"
                  disabled={ processing || disabled || succeeded}// handling button if user he have a bad internet( handling more request )
                >
                  <span>{processing ? <p>processing</p> : "Buy Now" }</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
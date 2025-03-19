import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import { useAuth } from "./context/GlobalStae";
import { auth } from "./Firebase";
import Homepage from "./Components/HomePage";
import Checkout from "./Components/checkout";
import Payment from "./Components/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./Components/orders";

function App() {
  const { dispatch } = useAuth();

  // etape 6 wrap component payment:
  const stripePromise = loadStripe(
    "pk_test_51OqxXjD43yl7fXAHrXqKZE39o06Q8rW6VtM4owHdf1H84JkS8GOY67oe2PuiYEyyAe8DqNIlAnwErK0o7R36xUpX00SYXwFlgD"
  );

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Homepage />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements  stripe={stripePromise}> {/* nthifo code hatha fil file mta3 payment 3la 5ater howa eli bech tsir fih payment methode */}
              <Payment />

              </Elements>
              
            </>
          }
        />
         <Route path="/orders" element={
          <>
          <Header />
          <Orders />
          </>
         } />
        <Route path="*" element={<h1>Page Not Found</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

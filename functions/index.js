
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// App config ( initialise pour application )
const app = express();

// middlewares

app.use(cors({origin: true}));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World"));


{/* Etape 2  (create a session)*/}

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;// total eli yab3ethou front end
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  // Ok - created
  res.status(201).send({
    // etape 4: send session ID( secret key ) :
    clientSecret: paymentIntent.client_secret,
  });
});

// example endpoint
// http://127.0.0.1:5001/shoping-8c622/us-central1/api

// Listen command
exports.api = functions.https.onRequest(app);

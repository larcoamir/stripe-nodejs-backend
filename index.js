const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const whiteList = ['http://localhost:4200'];
const corsOption = {
    origin: function(origin, callback){
        let isWhiteListed  = whiteList.indexOf(origin) !== -1;
        callback(null, isWhiteListed);
    },
    credentials: true
};
const PORT = 3000;

const Stripe = require("stripe");
const stripe = Stripe("sk_test_51INvQhAst71u30GLdePShTOYKriUANCq2Z51rPVBUH9xuRXPZB66C10XtZ6peZZumFxWCeLWPFXQRnBtE0Ki49ZP002jfcVLEM");

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOption));
app.post("/create-payment-intent", (req, res) => {
  stripe.paymentIntents.create(
    {
      amount: parseInt(req.body.amount),
      currency: "inr",
      payment_method_types: ["card"],
    },
    function (err, paymentIntent) {
      if (err) {
        res.status(500).json(err.message);
      } else {
        res.status(201).json(paymentIntent);
      }
    }
  );
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
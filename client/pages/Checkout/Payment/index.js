import React, { useState, useEffect } from "react";
import CheckoutStatus from "../Components/CheckoutStatus";
import CheckoutDetails from "../Components/CheckoutDetails";
import OrderSummary from "../Components/OrderSummary";

import { parseCookies } from "../../../Library/parseCookies";
import CheckoutHeader from "../Components/CheckoutHeader";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";
import { MdOutlineArrowBackIos } from "react-icons/md";
import LoadingSvg from "../../../Components/Loading";
import Link from "next/link";
const stripePromise = loadStripe(
  "pk_test_51KsFpgEewcpAM4MfHcckSLrjYlKuTbCn5VXIzJ0wkmmIUJYgJglzwLbzQf81ZNo5cx3GjTmECc9QBBdcSMHiqZbN00zISL6a1r"
);
const port = "http://localhost:4242";

const Payment = ({
  shippingMethodProp,
  customerInfoProp,
  customerChargesProp,
}) => {
  const [customerInfo, setCustomerInfo] = useState(() =>
    JSON.parse(customerInfoProp)
  );
  const [shippingMethod, setShippingMethod] = useState(() =>
    JSON.parse(shippingMethodProp)
  );
  const [customerCharges, setCustomerCharges] = useState(() =>
    JSON.parse(customerChargesProp)
  );

  const { items, emptyCart } = useCart();

  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    fetch(port + "/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: {
          items: items,
          shippingMethod: shippingMethod,
          tax: customerCharges.tax,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex flex-col justify-between w-screen bg-white h-fit">
      <CheckoutHeader />
      <div className="flex flex-col justify-between w-screen min-h-screen mx-auto border-b-2 border-gray-200 lg:flex-row max-1700">
        <div className="order-2 w-full h-screen mx-auto border-gray-200 lg:w-1/2 md:border-r-2">
          <div className="w-11/12 mx-auto">
            <CheckoutStatus page="3" />
          </div>
          <div className="flex flex-row items-center w-5/6 mx-auto mt-6">
            <CheckoutDetails
              page="3"
              customerInfo={customerInfo}
              shippingMethod={shippingMethod}
            />
          </div>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>

        <OrderSummary page="3" dynamicShipping={shippingMethod} />
      </div>
      <h2 className="w-5/6 mx-auto mt-6 mb-2 text-center text-c1 text-md font-f2">
        By placing your order you agree to Yardflo’s Terms and Conditions,
        Privacy Notice and Cookie Policy.
      </h2>
    </div>
  );
};

Payment.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    customerInfoProp: cookies.customerInfo,
    shippingMethodProp: cookies.shippingMethod,
    customerChargesProp: cookies.customerCharges,
  };
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");

          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/Checkout/Complete",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between w-5/6 mx-auto ">
        <div className="flex flex-col w-full mt-3 ">
          <h1 className="text-2xl font-f2 text-c1">Payment</h1>
          <h2 className="mb-3 text-md font-f2 text-c1">
            All transactions are secure and encrypted.
          </h2>

          <div
            id="payment-form"
            className="w-full px-3 pt-3 border-2 border-gray-300 rounded-lg "
          >
            <PaymentElement id="payment-element" className="w-full" />

            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between w-full mt-3 md:flex-row">
          <button
            onClick={handlePaymentSubmit}
            disabled={isLoading || !stripe || !elements}
            className="relative flex flex-row items-center order-1 w-full p-3 mb-3 bg-black rounded-lg md:mb-0 md:order-2 md:w-fit"
          >
            {isLoading ? (
              <>
                <div className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <LoadingSvg />
                </div>
                <h2 className="invisible w-full text-xl text-center text-white font-f2 whitespace-nowrap">
                  Place Order
                </h2>
                <MdOutlineArrowBackIos className="invisible hidden w-6 h-6 rotate-180 fill-white md:block" />
              </>
            ) : (
              <>
                <h2 className="w-full text-xl text-center text-white font-f2 whitespace-nowrap">
                  Place Order
                </h2>
                <MdOutlineArrowBackIos className="hidden w-6 h-6 rotate-180 fill-white md:block" />
              </>
            )}
          </button>
          <Link href={"/Checkout/Shipping"}>
            <a className="flex flex-row items-center order-2 md:order-1">
              <MdOutlineArrowBackIos className="w-5 h-5 md:w-6 md:h-6 fill-black" />
              <h2 className="text-sm text-black md:text-xl whitespace-nowrap">
                Return to shipping
              </h2>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Payment;

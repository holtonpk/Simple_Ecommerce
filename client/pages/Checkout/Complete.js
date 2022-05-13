import React, { useEffect } from "react";
import CheckoutStatus from "./Components/CheckoutStatus";
import Header from "../../Components/Header";
import { useCart } from "react-use-cart";
const Complete = () => {
  const { emptyCart } = useCart();

  useEffect(() => {
    emptyCart();
  });

  return (
    <>
      <Header />
      <CheckoutStatus page="4" />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-fit h-fit top-1/3 left-1/2">
        <h1 className="mx-auto font-semibold text-black text-7xl w-fit">
          Your order has been placed!
        </h1>
        <h1 className="mx-auto text-2xl font-semibold text-black w-fit">
          Check your email for an order confirmation
        </h1>
      </div>
    </>
  );
};

export default Complete;

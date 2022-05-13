import React, { useState, useEffect } from "react";
import CheckoutStatus from "../Components/CheckoutStatus";
import CheckoutDetails from "../Components/CheckoutDetails";
import OrderSummary from "../Components/OrderSummary";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { SiFedex, SiUsps, SiUps } from "react-icons/si";
import Link from "next/link";
import Cookie from "js-cookie";
import LoadingSvg from "../../../Components/Loading";
import { useRouter } from "next/router";
import CheckoutHeader from "../Components/CheckoutHeader";
import { useCart } from "react-use-cart";
import { parseCookies } from "../../../Library/parseCookies";
const Information = ({ customerInfoProp }) => {
  const [shippingMethod, setShippingMethod] = useState({
    title: false,
    rate: "Selected an option",
  });
  const router = useRouter();

  const { cartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  const [customerInfo, setCustomerInfo] = useState(() =>
    JSON.parse(customerInfoProp)
  );

  const handleStart = () => {
    setLoading(true);
  };

  const shippingOptions = [
    {
      id: "option1",
      title: "Fedex Delivery",
      rate: 0,
      display: "Free",
      time: "4-6 business days",
      icon: <SiFedex className="w-10 h-10 fill-inherit" />,
    },
    {
      id: "option2",
      title: "UPS Standard Delivery",
      rate: 6.99,
      display: "$6.99",
      time: "2-5 business days",
      icon: <SiUps className="w-10 h-10 fill-inherit" />,
    },
    {
      id: "option3",
      title: "USPS Express Delivery",
      rate: 12.99,
      display: "$12.99",

      time: "1-3 business days",
      icon: <SiUsps className="w-10 h-10 fill-inherit" />,
    },
  ];

  useEffect(() => {}, [loading]);

  const selectShippingOption = (shippingOption) => {
    document.querySelectorAll(".shippingOption").forEach((option) => {
      option.classList.remove("a");
    });
    document.getElementById(shippingOption.id).classList.add("bg-c1_50");
    setShippingMethod({ ...shippingOption });
  };

  const nextPage = () => {
    if (shippingMethod.title) {
      document.getElementById("errorText").classList.add("hide");

      Cookie.set(
        "shippingMethod",
        JSON.stringify({
          title: shippingMethod.title,
          rate: shippingMethod.rate,
          time: shippingMethod.time,
          display: shippingMethod.display,
        })
      );

      Cookie.set(
        "customerCharges",
        JSON.stringify({
          subtotal: cartTotal,
          tax: cartTotal * 0.0509,
          delivery: shippingMethod.rate,
          total: cartTotal + cartTotal * 0.0509 + shippingMethod.rate,
        })
      );

      router.push("/Checkout/Payment");
      router.events.on("routeChangeStart", handleStart);
    } else {
      document.getElementById("errorText").classList.remove("hide");
    }
  };

  return (
    <>
      <CheckoutHeader />
      <div className="flex flex-col items-center w-full mx-auto overflow-hidden border-b-2 border-b-gray-200">
        <div className="flex flex-col justify-between w-full mx-auto lg:flex-row max-1700 ">
          <div className="order-2 w-full px-6 mx-auto mb-3 border-gray-200 md:border-r-2 h-fit lg:w-1/2 ">
            <CheckoutStatus page="2" />

            <div className="flex flex-col items-center w-full mx-auto mt-6 ">
              <CheckoutDetails page="2" customerInfo={customerInfo} />
            </div>

            <div className="flex flex-col items-center justify-between w-full mx-auto">
              <div className="w-full mx-auto">
                <h1 className="flex flex-row items-center mt-3 text-2xl text-black ">
                  Shipping Methods
                </h1>
                <h1
                  id="errorText"
                  className="flex flex-row items-center mt-3 text-red-500 text-md hide"
                >
                  *Select a shipping method below
                </h1>
                {shippingOptions.map((option, i) => {
                  if (option.id == shippingMethod.id) {
                    return (
                      <button
                        key={i}
                        id={option.id}
                        onClick={() => selectShippingOption(option)}
                        className={
                          "items-center justify-center pl-6 mt-3 border-c1 rounded-md shippingGrid border-1 shippingOption py-2 w-full bg-black fill-white"
                        }
                      >
                        {option.icon}
                        <div className="flex flex-col items-start">
                          <h1 className="text-lg text-white w-fit whitespace-nowrap">
                            {option.title}
                          </h1>
                          <h2 className="text-sm text-white w-fit whitespace-nowrap">
                            {"Delivery: " + option.time}
                          </h2>
                        </div>
                        <div className="w-3/5 ">
                          <h1 className="mx-auto text-lg text-white ">
                            {option.display}
                          </h1>
                        </div>
                      </button>
                    );
                  } else {
                    return (
                      <button
                        key={i}
                        id={option.id}
                        onClick={() => selectShippingOption(option)}
                        className={
                          "items-center justify-center pl-6 mt-3 border-c1 rounded-md shippingGrid border-1 md:hover:bg-gray-200 shippingOption py-2 w-full "
                        }
                      >
                        {option.icon}
                        <div className="flex flex-col items-start">
                          <h1 className="text-lg text-left text-black w-fit whitespace-nowrap">
                            {option.title}
                          </h1>
                          <h2 className="text-sm text-black whitespace-nowrap">
                            {"Delivery: " + option.time}
                          </h2>
                        </div>
                        <div className="w-3/5 ">
                          <h1 className="mx-auto text-lg text-black ">
                            {option.display}
                          </h1>
                        </div>
                      </button>
                    );
                  }
                })}
              </div>

              <div className="flex flex-col items-center justify-between w-11/12 mt-3 md:flex-row">
                <Link href="/Checkout/Information">
                  <a className="flex flex-row items-center order-2 w-fit md:order-1 ">
                    <MdOutlineArrowBackIos className="w-5 h-5 md:w-6 md:h-6 fill-c1" />
                    <h2 className="text-sm text-black md:text-xl whitespace-nowrap">
                      Return to information
                    </h2>
                  </a>
                </Link>

                <button
                  onClick={() => nextPage()}
                  className="relative flex flex-row items-center order-1 w-full p-3 mb-3 bg-black rounded-lg md:mb-0 md:w-fit md:order-2"
                >
                  {(() => {
                    if (loading) {
                      return (
                        <>
                          <div className="flex flex-row items-center invisible mx-auto w-fit">
                            <h2 className="text-lg text-white font-f2 ">
                              Continue To Payment
                            </h2>
                            <MdOutlineArrowBackIos className="w-6 h-6 rotate-180 fill-white " />
                          </div>

                          <div className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <LoadingSvg />
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <div
                          id="nextPageText"
                          className="flex flex-row items-center mx-auto w-fit"
                        >
                          <h2 className="text-lg text-white font-f2 ">
                            Continue To Payment
                          </h2>
                          <MdOutlineArrowBackIos className="w-6 h-6 rotate-180 fill-white " />
                        </div>
                      );
                    }
                  })()}
                </button>
              </div>
            </div>
          </div>

          <OrderSummary page="2" dynamicShipping={shippingMethod} />
        </div>
      </div>
      <h2 className="w-5/6 mx-auto mt-6 text-center text-black text-md ">
        By placing your order you agree to Yardflo’s Terms and Conditions,
        Privacy Notice and Cookie Policy.
      </h2>
    </>
  );
};

Information.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    customerInfoProp: cookies.customerInfo,
  };
};

export default Information;

import React from "react";
import { moneyFormat } from "../../Library/Logic";
import Footer from "../../Components/Footer";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "react-use-cart";
import Header from "../../Components/Header";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import {
  SiAmericanexpress,
  SiVenmo,
  SiGooglepay,
  SiVisa,
  SiMastercard,
  SiApplepay,
  SiPaypal,
  SiEthereum,
  SiBitcoin,
  SiDiscover,
} from "react-icons/si";

const Checkout = () => {
  const { isEmpty, cartTotal, items, removeItem, updateItemQuantity } =
    useCart();
  const [emptyCart, setEmptyCart] = useState(true);
  useEffect(() => {
    setEmptyCart(isEmpty);
  }, [isEmpty]);

  const configShoppingBag = () => {
    if (emptyCart) {
      return (
        <h1 className="pr-3 mr-3 text-xl text-black w-fit ">
          Your bag is currently empty. Continue browsing here.
        </h1>
      );
    } else {
      return (
        <>
          <div className="justify-start w-11/12 bg-gray-200 checkOut_Grid">
            <h2 className="pl-3 text-lg text-black md:text-xl ">ITEM</h2>
            <h2 className="hidden text-xl text-center text-black md:block ">
              QUANTITY
            </h2>
            <h2 className="hidden text-xl text-center text-black md:block ">
              SUBTOTAL
            </h2>
          </div>
          <div className="w-11/12 mx-auto border-gray-200 border-1 ">
            {items.map((item, i) => (
              <div
                key={i}
                className="relative items-center justify-start w-full p-3 mx-auto bg-white border-gray-200 checkOut_Grid border-b-1"
              >
                <div className="flex flex-row justify-start ">
                  <div className="relative w-1/4 h-full mx-3 md:w-1/6">
                    <Image
                      src={"/productImgs/" + item.img}
                      layout="responsive"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div className="flex flex-col items-start w-3/4 md:w-1/2 ">
                    <Link
                      href={
                        "/Product/" +
                        item.title.slice(0, 25).replaceAll(" ", "_")
                      }
                    >
                      <a>
                        <h2 className="w-full text-xl text-black ">
                          {item.title}
                        </h2>
                      </a>
                    </Link>

                    <h1 className="text-xl text-center text-black">
                      {"$" + moneyFormat(item.price) + " USD"}
                    </h1>
                    <div className="flex flex-col w-fit md:hidden ">
                      <div
                        id="quantity2"
                        className="flex flex-row justify-between w-fit "
                      >
                        <div className="flex flex-row justify-start w-fit">
                          <AiOutlineMinus
                            onClick={() => {
                              updateItemQuantity(item.id, item.quantity - 1);
                            }}
                            className="w-6 h-10 py-2 border-gray-200 cursor-pointer border-1 fill-gray-500"
                          />
                          <h2 className="h-10 px-3 py-1 text-lg text-center text-gray-500 border-gray-200 border-t-1 border-b-1">
                            {item.quantity}
                          </h2>
                          <AiOutlinePlus
                            onClick={() => {
                              updateItemQuantity(item.id, item.quantity + 1);
                            }}
                            className="w-6 h-10 py-2 border-gray-200 cursor-pointer border-1 fill-gray-500"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-lg text-center text-gray-500 w-fit"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden w-full h-full mx-auto border-gray-200 border-l-1 border-r-1 md:block">
                  <div className="flex flex-col pt-10 mx-auto w-fit">
                    <div
                      id="quantity"
                      className="flex flex-row justify-between w-fit "
                    >
                      <div className="flex flex-row justify-start w-fit">
                        <AiOutlineMinus
                          onClick={() => {
                            updateItemQuantity(item.id, item.quantity - 1);
                          }}
                          className="w-8 py-2 border-2 cursor-pointer h-fit fill-black border-gray"
                        />
                        <h2 className="px-3 py-2 text-xl text-center border-2 border-gray">
                          {item.quantity}
                        </h2>
                        <AiOutlinePlus
                          onClick={() => {
                            updateItemQuantity(item.id, item.quantity + 1);
                          }}
                          className="w-8 py-2 border-2 cursor-pointer h-fit fill-black border-gray"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-3 mr-1 text-lg text-center text-black w-fit"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <h1 className="text-2xl text-center text-black">
                    {"$" + moneyFormat(item.price * item.quantity) + " USD"}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-between w-11/12 py-3 pl-3 mx-auto border-gray-200 border-b-1 border-l-1 border-r-1">
            <h2 className="hidden w-2/3 text-lg text-black underline md:block ">
              Continue Shopping
            </h2>

            <div className="flex flex-row items-center justify-between w-full md:w-fit">
              <h1 className="pr-6 text-2xl font-bold text-center text-black whitespace-nowrap w-fit">
                Total
              </h1>
              <h1 className="pr-6 text-2xl font-bold text-center text-black whitespace-nowrap w-fit">
                {"$" + moneyFormat(cartTotal) + " USD"}
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between mx-auto mt-4 md:flex-row w-fit md:w-11/12">
            <h2 className="mb-3 text-sm text-black w-fit">
              FREE STANDARD SHIPPING WHEN YOU SPEND $75
            </h2>
            <div className="grid grid-cols-7 mb-3 w-fit">
              <SiGooglepay className="w-10 h-10 mr-3 fill-black" />
              <SiVenmo className="w-10 h-10 mr-3 fill-black" />
              <SiAmericanexpress className="w-10 h-10 mr-3 fill-black" />
              <SiVisa className="w-10 h-10 mr-3 fill-black" />
              <SiMastercard className="w-10 h-10 mr-3 fill-black" />
              <SiApplepay className="w-10 h-10 mr-3 fill-black" />
              <SiDiscover className="w-10 h-10 mr-3 fill-black" />
            </div>

            <Link href={"/Checkout/Information"}>
              <a className="w-full px-10 py-3 mb-3 text-xl text-center text-white bg-black rounded-full md:w-fit">
                Checkout
              </a>
            </Link>
            <h2 className="text-lg text-black underline w-fit md:hidden ">
              Continue Shopping
            </h2>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center w-screen mx-auto mb-10 max-1700">
        <div className="flex flex-row items-center my-3">
          <h1 className="pr-3 mr-3 text-4xl text-black w-fit ">Shopping Bag</h1>
        </div>
        {configShoppingBag()}
      </div>

      <Footer />
    </>
  );
};

export default Checkout;

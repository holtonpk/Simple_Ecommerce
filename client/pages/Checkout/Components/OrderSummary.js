import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { RiCouponLine } from "react-icons/ri";

import { MdKeyboardArrowDown, MdOutlineClose } from "react-icons/md";
import { moneyFormat } from "../../../Library/Logic";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import Image from "next/image";

const OrderSummary = ({ page, dynamicShipping }) => {
  const { cartTotal, items, removeItem } = useCart();
  const [cartItems, setCartItems] = useState({});
  return (
    <>
      <button
        onClick={() => {
          document.getElementById("orderSummary").classList.toggle("hidden");
          document.getElementById("sDropArrow").classList.toggle("rotate-180");
        }}
        className="z-30 flex flex-row justify-between w-full px-6 py-4 bg-gray-100 border-gray-400 h-fit lg:hidden border-t-1 border-b-1 "
      >
        <div className="flex flex-row items-center w-fit ">
          <BsCart className="w-6 h-6 mb-1 mr-3 fill-black" />
          <h1 className="text-lg text-black whitespace-nowrap">
            Show order summary
          </h1>
          <MdKeyboardArrowDown id="sDropArrow" className="w-6 h-6 fill-black" />
        </div>

        {(() => {
          if (dynamicShipping && dynamicShipping.rate != "Selected an option") {
            return (
              <h2 className="text-lg font-bold text-black w-fit">
                {"$" +
                  moneyFormat(
                    cartTotal + cartTotal * 0.0509 + dynamicShipping.rate
                  )}
              </h2>
            );
          } else {
            return (
              <h2 className="text-lg font-bold text-black w-fit">
                {"$" + moneyFormat(cartTotal + cartTotal * 0.0509)}
              </h2>
            );
          }
        })()}
      </button>

      <div
        id="orderSummary"
        className="relative flex-col items-center justify-start order-1 hidden p-4 pt-10 mx-auto bg-gray-100 border-gray-500 lg:order-2 fade-in-full lg:mb-10 w-fit lg:flex lg:items-start lg:w-1/2 lg:border-l-1 border-c3"
      >
        <div className="md:overflow-y-scroll lg:w-3/4 border-b-1 border-c3 md:max-h-80 max-h-fit ">
          <div className="flex flex-col justify-start h-fit md:pt-3">
            {(() => {
              return items.map((item, i) => (
                <div
                  key={i}
                  className="w-full pb-3 mb-3 order-grid orderSumGrid"
                >
                  <div className="relative w-20 h-20 ">
                    <Image src={"/productImgs/" + item.img} layout="fill" />
                    <h3 className="absolute top-0 w-6 h-6 text-lg text-center text-white -translate-x-1/2 -translate-y-1/2 bg-gray-500 rounded-full left-full">
                      {item.quantity}
                    </h3>
                  </div>

                  <div className="relative flex flex-col justify-between ml-3 h-fit">
                    <h2 className="text-black text-md font-f2">{item.title}</h2>
                    <h3 className="text-gray-600 text-md font-f2">
                      {"size: " + item.option}
                    </h3>
                  </div>
                  <div className="relative flex flex-row items-center">
                    <h2 className="font-bold text-black text-md">
                      {"$" + moneyFormat(item.price * item.quantity)}
                    </h2>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
        <div className="flex flex-row items-center justify-start py-3 mb-3 w-fit lg:w-3/4 border-b-1 border-c3 ">
          <div className="flex flex-row items-center w-3/4 h-full px-2 py-2 bg-white border-2 border-gray-500 couponInput">
            <RiCouponLine className="w-6 h-6 mr-3 fill-gray-300" />
            <input
              type="text"
              className="text-black bg-white text-md font-f2"
              placeholder="Coupon code"
            />
          </div>
          <button className="px-3 py-1 ml-3 text-lg text-gray-600 bg-gray-400 rounded-full h-fit font-f2">
            Apply
          </button>
        </div>

        <div className="flex flex-col w-full lg:w-3/4">
          <div className="flex flex-row items-center justify-between w-full pt-3">
            <h2 className="text-lg text-c4 font-f2">Subtotal</h2>
            <h2 className="text-lg text-c4 font-f2">
              {"$" + moneyFormat(cartTotal)}
            </h2>
          </div>
          <div className="flex flex-row items-center justify-between w-full pt-3">
            <h2 className="text-lg text-c4 font-f2">Tax</h2>
            <h2 className="text-lg text-c4 font-f2">
              {"$" + moneyFormat(cartTotal * 0.0509)}
            </h2>
          </div>

          {(() => {
            if (
              dynamicShipping &&
              dynamicShipping.rate != "Selected an option"
            ) {
              return (
                <>
                  <div className="flex flex-row items-center justify-between w-full pt-3">
                    <h2 className="text-lg text-c4 font-f2">Delivery</h2>
                    <h2 className="text-lg text-c4 font-f2">
                      {dynamicShipping.display}
                    </h2>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full py-3 mt-3 border-t-2 border-black">
                    <h2 className="text-xl font-bold text-black">Total</h2>
                    <h2 className="text-xl font-bold text-black">
                      {"$" +
                        moneyFormat(
                          cartTotal + cartTotal * 0.0509 + dynamicShipping.rate
                        )}
                    </h2>
                  </div>
                </>
              );
            } else {
              let rate = " Calculated at next step";
              if (dynamicShipping) {
                rate = "Selected an option";
              }

              return (
                <>
                  <div className="flex flex-row items-center justify-between w-full pt-3">
                    <h2 className="text-lg text-c4 font-f2">Delivery</h2>
                    <h2 className="text-lg text-c4 font-f2">{rate}</h2>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full py-3 mt-3 border-t-2 border-black">
                    <h2 className="text-xl font-bold text-black">Total</h2>
                    <h2 className="text-xl font-bold text-black">
                      {"$" + moneyFormat(cartTotal + cartTotal * 0.0509)}
                    </h2>
                  </div>{" "}
                </>
              );
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default OrderSummary;

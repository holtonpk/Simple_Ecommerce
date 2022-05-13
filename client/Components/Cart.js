import React, { useEffect, useState } from "react";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { CartProvider, useCart } from "react-use-cart";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { moneyFormat } from "../Library/Logic";
import LinkButton from "./LinkButton";
import Image from "next/image";

const Cart = () => {
  const { isEmpty, cartTotal, items, updateItemQuantity, removeItem } =
    useCart();

  const [emptyCart, setEmptyCart] = useState(true);

  useEffect(() => {
    setEmptyCart(isEmpty);
  }, [isEmpty]);

  const configBag = () => {
    if (emptyCart) {
      return (
        <h1 className="text-xl text-center text-black">
          YOUR BAG IS CURRENTLY EMPTY
        </h1>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center ">
            {items.map((cartItem, i) => (
              <div key={i} className="flex flex-row ">
                <div className="p-4">
                  <div className="relative w-28 h-28 ">
                    <Image
                      src={"/productImgs/" + cartItem.img}
                      alt="img"
                      layout="fill"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg text black">{cartItem.title}</h1>
                  <h1 className="text-lg text black">
                    {"size: " + cartItem.option}
                  </h1>
                  <h1 className="text-lg text black">{"$" + cartItem.price}</h1>
                  <div
                    id="quantity"
                    className="flex flex-row justify-between w-fit "
                  >
                    <div className="flex flex-row justify-start h-10 w-fit">
                      <AiOutlineMinus
                        onClick={() => {
                          updateItemQuantity(
                            cartItem.id,
                            cartItem.quantity - 1
                          );
                        }}
                        className="w-8 h-full py-2 border-2 cursor-pointer fill-black border-grey"
                      />
                      <h2 className="h-full px-3 py-2 text-xl text-center border-2 border-grey">
                        {cartItem.quantity}
                      </h2>
                      <AiOutlinePlus
                        onClick={() => {
                          updateItemQuantity(
                            cartItem.id,
                            cartItem.quantity + 1
                          );
                        }}
                        className="w-8 h-full py-2 border-2 cursor-pointer fill-black border-grey "
                      />
                    </div>
                  </div>
                  <h2
                    onClick={() => removeItem(cartItem.id)}
                    className="float-right w-10 h-10 cursor-pointer fill-grey"
                  >
                    Remove
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row items-center justify-between w-full px-6 py-6 border-b-2 border-grey-200">
            <h1 className="text-xl font-semibold text-black">Total</h1>
            <h1 className="text-2xl font-semibold text-black">
              {"$" + moneyFormat(cartTotal) + " USD"}
            </h1>
          </div>

          <LinkButton
            text="Checkout"
            href="/Checkout/Information"
            style="w-11/12 p-3 mx-auto mt-6 text-xl text-center text-white rounded-full h-fit bg-gray-700"
            loaderStyle="h-8 w-8"
          />
          <LinkButton
            text="Your Bag"
            href="/Checkout"
            style="w-11/12 p-3 mx-auto my-6 text-xl text-center text-white rounded-full bg-gray-300 h-fit"
            loaderStyle="h-8 w-8"
          />
        </div>
      );
    }
  };

  return (
    <div id="Cart" className="fixed z-40 hidden h-screen">
      <button
        onClick={() => {
          document.getElementById("Cart").classList.add("hidden");
        }}
        className="fixed top-0 w-screen h-full bg-black opacity-60 fade-in"
      ></button>

      <div className="fixed flex flex-col w-3/4 h-full px-2 overflow-y-scroll bg-white md:px-4 md:w-1/3 left-full slide-left">
        <div className="py-3 border-b-2 border-grey-200">
          <h1 className="mx-auto text-2xl text-center text-black">Your Bag</h1>
          <MdOutlineClose
            onClick={() => {
              document.getElementById("Cart").classList.add("hidden");
            }}
            className="float-right w-10 h-10 cursor-pointer fill-grey"
          />
        </div>
        {configBag()}
      </div>
    </div>
  );
};

export default Cart;

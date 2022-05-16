import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import Link from "next/link";
import { GoPackage } from "react-icons/go";
import { MdMenu, MdOutlineClose } from "react-icons/md";

import Cart from "./Cart";
import { BsHandbag, BsSearch, BsPerson } from "react-icons/bs";
import {
  IoPersonOutline,
  IoBagHandleOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { useCart } from "react-use-cart";
import Signin from "./Signin";
const Header = () => {
  const { totalItems, isEmpty, cartTotal } = useCart();
  const [emptyCart, setEmptyCart] = useState(true);

  const onhover = (event, elem) => {
    if (event == "in") {
      elem.classList.add("bounce-top");
      elem.getElementsByTagName("h1").item(0).classList.remove("hide");
    } else {
      elem.classList.remove("bounce-top");
      elem.getElementsByTagName("h1").item(0).classList.add("hide");
    }
  };
  const hamburgerClick = () => {
    document.getElementById("hamburgerMenuDrop").classList.toggle("hidden");
  };

  useEffect(() => {
    document.querySelectorAll(".navButton").forEach((item) => {
      item.addEventListener("mouseover", () => onhover("in", item));
      item.addEventListener("mouseout", () => onhover("out", item));
    });
    setEmptyCart(isEmpty);
  }, [isEmpty]);
  return (
    <>
      <Cart />
      <Signin />
      <div id="hamburgerMenu" className="absolute z-40 xl:hidden ">
        <button
          onClick={hamburgerClick}
          className="fixed p-3 my-auto -translate-y-full bg-white border-2 border-black rounded-full h-fit top-90 left-2"
        >
          <MdMenu className="w-12 h-12 fill-black xl:hidden" />
        </button>
        <div id="hamburgerMenuDrop" className="fixed z-50 hidden ">
          <button
            onClick={hamburgerClick}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-60 fade-in"
          ></button>

          <div className="fixed top-0 left-0 flex flex-col h-full p-10 bg-white w-fit slide-in-left">
            <button onClick={hamburgerClick}>
              <MdOutlineClose className="w-16 h-16 fill-black" />
            </button>

            <Link href="/#">
              <a className="mt-6 text-4xl font-thin text-black opacity-100">
                Home
              </a>
            </Link>

            <Link href="/#">
              <a className="mt-6 text-4xl font-thin text-black ">About</a>
            </Link>

            <Link href="/Catalog/TintCase/TintCase-black">
              <a className="mt-6 text-4xl font-thin text-black ">Catalog</a>
            </Link>
            <Link href="/Catalog/TintCase/TintCase-black">
              <a className="mt-6 text-4xl font-thin text-black ">Sign in</a>
            </Link>
            <Link href="/Catalog/TintCase/TintCase-black">
              <a className="mt-6 text-4xl font-thin text-black ">
                Track Package
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="sticky z-30 w-full py-4 overflow-hidden bg-black -top-1 b-r">
        <div className="items-center justify-between w-full mx-auto headerGrid md:flex md:flex-row md:w-5/6 h-fit">
          <Navbar />
          <div className="order-1 ">
            <Link href="/#" className="order-1 md:order-2">
              <a>
                <h1 className="relative px-4 mx-auto text-3xl text-white w-fit cornerBox">
                  Specture.
                </h1>
              </a>
            </Link>
          </div>
          <div className="order-3 w-full md:w-fit">
            <div className="flex flex-row justify-between float-right pb-3 w-fit h-fit">
              {/* <BsSearch className="w-6 h-6 mr-8 fill-white " /> */}

              <Link href="/Order">
                <a
                  className="relative flex flex-col items-center p-2 mr-3 border-2 rounded-full navButton border-c1 w-fit"
                  id="tracking"
                >
                  <GoPackage
                    id="trackingIcon"
                    className="w-6 h-6 text-white navButtonIcon"
                  />
                  <h1 className="absolute mt-4 text-white font-f1 text-md top-6 hide whitespace-nowrap">
                    Track Package
                  </h1>
                </a>
              </Link>
              <button
                className="relative flex flex-col items-center p-2 mr-3 border-2 rounded-full navButton border-c1 w-fit"
                id="profile"
                onClick={() =>
                  document.getElementById("signIn").classList.toggle("hidden")
                }
              >
                <IoPersonOutline
                  id="profileIcon"
                  className="w-6 h-6 text-white navButtonIcon"
                />
                <h1 className="absolute mt-4 text-white font-f1 text-md top-6 hide">
                  Profile
                </h1>
              </button>

              <button
                onClick={() => {
                  document.getElementById("Cart").classList.remove("hidden");
                }}
                className="relative flex flex-col items-center p-2 border-2 rounded-full text-c1 navButton border-c1 w-fit "
                id="cart"
              >
                <IoBagHandleOutline
                  id="cartIcon"
                  className="w-6 h-6 text-white text-c1 navButtonIcon"
                />
                {(() => {
                  if (!emptyCart)
                    return (
                      <div className="absolute flex flex-row items-center w-4 h-4 mx-auto text-center text-black -translate-x-full -translate-y-1/2 bg-white rounded-full top-full left-full">
                        <h2 className="mx-auto text-xs">{totalItems}</h2>
                      </div>
                    );
                })()}
                <h1 className="absolute mt-4 text-white font-f1 text-md top-6 hide">
                  Bag
                </h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

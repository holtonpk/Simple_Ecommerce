import React from "react";
import {
  FaCcAmex,
  FaCcApplePay,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="relative bottom-0 flex flex-col justify-between w-full pt-10 bg-black h-fit">
      <div className="flex flex-row justify-between w-5/6 mx-auto mb-3 md:w-1/2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Help</h1>
          <a className="text-white text-md ">FAQ</a>
          <a className="text-white text-md ">Make a Return</a>
          <a className="text-white text-md ">Return Policy</a>
          <a className="text-white text-md ">Contact</a>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">MY ACCOUNT</h1>
          <a className="text-white text-md ">Login</a>
          <a className="text-white text-md ">Register</a>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Pages</h1>
          <a className="text-white text-md ">About</a>
          <a className="text-white text-md ">Catalog</a>
          <a className="text-white text-md ">Home</a>
          <a className="text-white text-md ">Contact</a>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-5/6 pt-3 mx-auto border-white border-t-1">
        <h2 className="text-white text-md">
          © 2022 | Company Name | All Rights Reserved{" "}
        </h2>
        <div className="flex flex-row justify-between w-1/3 md:w-1/5">
          <FaCcAmex className="w-10 h-10 fill-white" />
          <FaCcApplePay className="w-10 h-10 fill-white" />
          <FaCcVisa className="w-10 h-10 fill-white" />
          <FaCcMastercard className="w-10 h-10 fill-white" />
        </div>
      </div>
    </div>
  );
};

export default Footer;

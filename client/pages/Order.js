import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
const Order = () => {
  return (
    <div className="bg-black">
      <Header />
      <h1 className="py-10 mx-auto text-4xl text-gray-200 w-fit font-f1">
        Track Your Order
      </h1>
      <div className="flex flex-row justify-between w-5/6 mx-auto mb-20 trackPage h-5/6">
        <div className="flex flex-col items-start justify-between w-1/2 pr-4 border-r-2 border-gray-200">
          <h1 className="text-3xl text-gray-200 font-f1">
            Sign in to view order history
          </h1>
          <h1 className="w-full text-xl text-gray-200 font-f2">
            Use the same sign-in credentials for any brand in our family of
            brands.
          </h1>

          <input
            type="text"
            placeholder="Email"
            className="w-full h-16 pl-3 text-2xl text-gray-200 border-2 border-black font-f1 rounded-xl"
          />
          <input
            type="text"
            placeholder="Password"
            className="w-full h-16 pl-3 text-2xl text-gray-200 border-2 border-black font-f1 rounded-xl"
          />
          <button className="p-3 text-xl text-gray-200 bg-black border-2 text-f2 rounded-xl hover:bg-gray-200 hover:text-black">
            Sign In
          </button>
        </div>
        <div className="flex flex-col items-start justify-between w-1/2 pl-4 h-5/6">
          <h1 className="text-3xl text-gray-200 font-f1">Order Search</h1>
          <h1 className="w-full text-xl text-gray-200 font-f2">
            New orders may take up to 24 hours to appear while we complete
            processing.
          </h1>

          <input
            type="text"
            placeholder="Order Number"
            className="w-full h-16 pl-3 text-2xl text-gray-200 border-2 border-black font-f2 rounded-xl"
          />
          <button className="p-3 text-xl text-gray-200 bg-black border-2 border-gray-200 text-f2 rounded-xl hover:bg-gray-200 hover:text-black">
            Track Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;

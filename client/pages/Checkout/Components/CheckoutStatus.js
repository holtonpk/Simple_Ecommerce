import React from "react";
import Link from "next/link";
import { RiCheckFill } from "react-icons/ri";
const CheckoutStatus = ({ page }) => {
  console.log("page", page);
  return (
    <div className="z-30 flex flex-row items-center justify-between mx-auto mt-6 mb-3 bg-white md:w-5/6 h-fit w-fi ">
      <Link href="/Checkout/Information">
        <a className="flex flex-col items-center px-1 md:px-3">
          <div className="relative bg-black border-black rounded-full statusBubble fill-black">
            <RiCheckFill className="absolute w-6 h-4 -translate-x-1/2 -translate-y-1/2 fill-white top-1/2 left-1/2" />
          </div>
          <h2 className="text-sm text-black md:text-lg font-f2">Information</h2>
        </a>
      </Link>

      {(() => {
        if (page >= 2) {
          return (
            <>
              <div className="w-6 h-0 border-black md:w-1/5 border-b-1"></div>
              <Link href="/Checkout/Shipping">
                <a className="flex flex-col items-center px-1 md:px-3">
                  <div className="relative bg-black border-black rounded-full statusBubble fill-black">
                    <RiCheckFill className="absolute w-6 h-4 -translate-x-1/2 -translate-y-1/2 fill-white top-1/2 left-1/2" />
                  </div>
                  <h2 className="text-sm text-black md:text-lg font-f2">
                    Shipping
                  </h2>
                </a>
              </Link>
            </>
          );
        } else {
          return (
            <>
              <div className="w-6 h-0 md:w-1/5 border-b-1 border-slate-200"></div>
              <div className="flex flex-col items-center px-1 md:px-3">
                <div className="rounded-full statusBubble fill-slate-200 border-slate-200 after:bg-slate-200"></div>
                <h2 className="text-sm md:text-lg font-f2 text-slate-200">
                  Shipping
                </h2>
              </div>
            </>
          );
        }
      })()}

      {(() => {
        if (page >= 3) {
          return (
            <>
              <div className="w-6 h-0 border-black md:w-1/5 border-b-1"></div>

              <Link href="/Checkout/Payment">
                <a className="flex flex-col items-center px-1 md:px-3">
                  <div className="relative bg-black border-black rounded-full statusBubble fill-black">
                    <RiCheckFill className="absolute w-6 h-4 -translate-x-1/2 -translate-y-1/2 fill-white top-1/2 left-1/2" />
                  </div>
                  <h2 className="text-sm text-black md:text-lg font-f2">
                    Payment
                  </h2>
                </a>
              </Link>
            </>
          );
        } else {
          return (
            <>
              <div className="w-6 h-0 md:w-1/5 border-b-1 border-slate-200"></div>
              <div className="flex flex-col items-center px-1 md:px-3">
                <div className="rounded-full statusBubble fill-slate-200 border-slate-200 after:bg-slate-200"></div>
                <h2 className="text-sm md:text-lg font-t2 text-slate-200">
                  Payment
                </h2>
              </div>
            </>
          );
        }
      })()}

      {(() => {
        if (page == 4) {
          return (
            <>
              <div className="w-6 h-0 border-black md:w-1/5 border-b-1"></div>

              <a className="flex flex-col items-center px-1 md:px-3">
                <div className="relative bg-black border-black rounded-full statusBubble fill-black">
                  <RiCheckFill className="absolute w-6 h-4 -translate-x-1/2 -translate-y-1/2 fill-white top-1/2 left-1/2" />
                </div>
                <h2 className="text-sm text-black md:text-lg font-f2">
                  Complete
                </h2>
              </a>
            </>
          );
        } else {
          return (
            <>
              <div className="w-6 h-0 md:w-1/5 border-b-1 border-slate-200"></div>
              <div className="flex flex-col items-center px-1 md:px-3">
                <div className="rounded-full statusBubble fill-slate-200 border-slate-200 after:bg-slate-200"></div>
                <h2 className="text-sm md:text-lg font-f2 text-slate-200">
                  Complete
                </h2>
              </div>
            </>
          );
        }
      })()}
    </div>
  );
};

export default CheckoutStatus;

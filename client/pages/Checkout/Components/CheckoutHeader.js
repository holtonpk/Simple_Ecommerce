import React from "react";
import Link from "next/link";
const CheckoutHeader = () => {
  return (
    <div className="px-20 py-3 bg-black md:py-8 h-fit">
      <div className="flex flex-row items-center justify-between w-full mx-auto md:w-3/4 max-1700 ">
        <Link href="/#" className="order-1 md:order-2">
          <a>
            <h1 className="relative px-4 text-2xl text-white md:text-4xl w-fit cornerBox">
              S.
            </h1>
          </a>
        </Link>

        <h1 className="relative px-4 text-lg text-white md:text-4xl w-fit whitespace-nowrap">
          SHOP YOUR STYLE.
        </h1>
      </div>
    </div>
  );
};

export default CheckoutHeader;

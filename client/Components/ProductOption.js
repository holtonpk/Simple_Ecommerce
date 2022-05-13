import { MdArrowDropDown, MdOutlineClose } from "react-icons/md";
import React, { useState } from "react";
import ProductData from "../public/ProductData.json";
import Link from "next/link";
import Image from "next/image";
const ProductOption = ({
  product,
  productSizes,
  setSelectedOption,
  selectedOption,
}) => {
  return (
    <div className="flex flex-col w-full h-fit">
      <h1 className="text-xl capitalize ">{"Color: " + productSizes.color}</h1>
      <div className="grid grid-cols-7 gap-4 md:grid-cols-4 w-fit h-fit">
        {Object.keys(ProductData[product].Products).map((option, i) => {
          let border = "";
          if (productSizes.id == option) {
            border = " border-2 border-black ";
          }

          return (
            <Link key={i} href={"/Catalog/" + product + "/" + option}>
              <a>
                <button
                  className={
                    "border-black border-box w-16 h-16  p-3 justify-between  relative box-border " +
                    border
                  }
                >
                  <Image
                    layout="fill"
                    alt="img"
                    src={
                      "/productImgs/" +
                      ProductData[product].Products[option].img
                    }
                  />
                </button>
              </a>
            </Link>
          );
        })}
      </div>
      <h1 className="text-xl capitalize ">Sizes</h1>
      <h1
        id="selectSizeError"
        className="hidden text-lg text-red-600 capitalize"
      >
        *please select a size
      </h1>
      <div className="grid grid-cols-7 gap-4 md:grid-cols-4 w-fit h-fit">
        {productSizes.sizes.map((optionName, i) => {
          const bg = "";
          if (selectedOption == optionName) {
            bg = "bg-black text-white";
          }

          return (
            <button
              onClick={() => setSelectedOption(optionName)}
              key={i}
              className={
                "border-black border-2 h-fit w-16 p-3 justify-between  " + bg
              }
            >
              <h1 className="mx-auto text-lg capitalize ">{optionName}</h1>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductOption;

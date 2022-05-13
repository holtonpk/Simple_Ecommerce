import Footer from "../../../Components/Footer";
import { GoPackage } from "react-icons/go";
import { BsFillHandbagFill, BsCartFill } from "react-icons/bs";
import ProductData from "../../../public/ProductData.json";
import ReviewStars from "../../../Components/ReviewStars";

import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdRestartAlt,
  MdOutlineLocalShipping,
  MdOutlineClose,
} from "react-icons/md";

import Reviews from "../../../Components/Reviews";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import Header from "../../../Components/Header";
import ProductOption from "../../../Components/ProductOption";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { useRouter } from "next/router";

const Catalog = ({ product, product_id }) => {
  const router = useRouter();
  const { Product_id, Style } = router.query;
  const { addItem } = useCart();

  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.img);
  const [showingImages, setShowingImages] = useState(product.imgs.slice(0, 6));

  useEffect(() => {
    setMainImage(product.img);
    setShowingImages(product.imgs.slice(0, 6));

    const load = async () => {
      if (typeof window !== undefined) {
        const ScrollMagic = (await import("scrollmagic")).default;
        const controller = new ScrollMagic.Controller();
        // ScrollMagicPluginIndicator(ScrollMagic);

        // _______Card1

        new ScrollMagic.Scene({
          triggerElement: "#addToBag",
          triggerHook: 0,
          reverse: true,
        })

          .setClassToggle("#addToBagFixed", "buttonFix")
          .addTo(controller);
      }
    };
    load();
  }, [product]);

  const changeSecImages = (dir) => {
    var leftArrow = document.getElementById("leftArrow");
    var rightArrow = document.getElementById("rightArrow");
    if (dir > 0) {
      leftArrow.classList.remove("hidden");
      rightArrow.classList.add("hidden");
      document.getElementById("productImageSmallContainer").style.transform =
        "translateY(-600px)";
    } else {
      leftArrow.classList.add("hidden");
      rightArrow.classList.remove("hidden");
      document.getElementById("productImageSmallContainer").style.transform =
        "translateY(0px)";
    }
  };

  return (
    <div className="mx-auto ">
      <Header />
      <div className="flex flex-col justify-start w-full h-fit">
        <div
          id="listingContainer"
          className="flex flex-col justify-start w-full md:mx-auto h-fit md:flex-row md:mt-10 md:w-full md:h-fit"
        >
          <div className="flex flex-col justify-start w-full md:pl-10 h-fit md:w-fit md:flex-row">
            <div
              id="productImageSmall"
              className="relative order-2 mx-auto mt-3 mr-10 overflow-scroll md:h-full md:order-1 h-fit w-fit md:overflow-hidden md:mt-0"
            >
              <MdKeyboardArrowLeft
                onClick={() => changeSecImages(-1)}
                id="leftArrow"
                className="absolute z-10 hidden w-8 h-16 -translate-y-1/2 bg-gray-400 cursor-pointer fill-white md:top-0 -left-0 top-1/2 md:-translate-y-0 md:-translate-x-1/2 md:rotate-90 md:left-1/2 hover:opacity-40"
              />

              <MdKeyboardArrowRight
                id="rightArrow"
                onClick={() => changeSecImages(1)}
                className="absolute z-10 w-8 h-16 -translate-x-full -translate-y-1/2 bg-gray-400 cursor-pointer fill-white md:top-full left-full top-1/2 md:-translate-y-full md:-translate-x-1/2 md:left-1/2 md:rotate-90 hover:opacity-40"
              />
              <div
                id="productImageSmallContainer"
                className="absolute left-0 flex flex-row gap-6 md:flex-col "
              >
                {showingImages.map((image, i) => {
                  let border = "";
                  if (image == mainImage) {
                    border = "border-4 border-black  ";
                  }

                  return (
                    <button
                      onClick={() => setMainImage(image)}
                      key={i}
                      className={
                        "relative mx-auto productImageSmall box-border  " +
                        border
                      }
                    >
                      <Image src={"/productImgs/" + image} layout="fill" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div
              id="productImage"
              className="relative order-1 mx-auto md:order-2"
            >
              <Image src={"/productImgs/" + mainImage} layout="fill" />
            </div>
          </div>

          <div
            id="productInfo"
            className="flex flex-col justify-between px-2 mt-3 h-80 md:ml-10 md:mt-0"
          >
            <div id="reviews" className="flex flex-row items-center w-fit">
              <ReviewStars stars={4.5} size="h-6 w-6" fill="fill-black" />
              <h2 className="text-lg text-black ">
                {"(" + ProductData[product_id].Reviews.length + ")"}
              </h2>
            </div>
            <h1 className="text-3xl text-black ">{product.title}</h1>
            <div id="price" className="flex flex-row">
              <h1 className="text-3xl text-gray-700 ">
                {"$" + product.price + " USD"}
              </h1>
              {/* <div className="relative">
                <div className="absolute w-full h-0 border-2 border-black opacity-100 top-1/2"></div>
                <h1 className="text-2xl opacity-50 text-black-200">$60.00</h1>
              </div> */}
            </div>

            <div className="flex flex-col justify-between h-fit ">
              <ProductOption
                productSizes={product}
                product={product_id}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            <div id="addToBag" className="relative mt-3">
              <button
                onClick={() => {
                  if (!selectedOption) {
                    document
                      .getElementById("selectOption")
                      .classList.remove("hidden");
                  } else {
                    document
                      .getElementById("selectSizeError")
                      .classList.add("hidden");

                    addItem(
                      {
                        id: product.id + selectedOption,
                        title: product.title,
                        price: product.price,
                        img: product.img,
                        option: selectedOption,
                      },
                      quantity
                    );
                    document.getElementById("Cart").classList.remove("hidden");
                  }
                }}
                className="relative w-full p-4 mt-3 text-xl text-white bg-black rounded-full h-fit"
              >
                <div
                  id="addButton"
                  className="flex flex-row items-center mx-auto w-fit "
                >
                  <BsFillHandbagFill className="w-6 h-6 mr-3 fill-white" />
                  <h1>ADD TO BAG</h1>
                </div>
              </button>
              <button
                onClick={() => {
                  addItem(
                    {
                      id: product.id + selectedOption,
                      title: product.title,
                      price: product.price,
                      img: product.img,
                      option: selectedOption,
                    },
                    quantity
                  );
                  router.push("/Checkout/Information");
                }}
                className="relative w-full p-4 mt-3 text-xl text-white bg-gray-600 rounded-full h-fit"
              >
                <div
                  id="addButton"
                  className="flex flex-row items-center mx-auto w-fit "
                >
                  <BsCartFill className="w-6 h-6 mr-3 fill-white" />
                  <h1>Buy Now</h1>
                </div>
              </button>
              <button
                id="addToBagFixed"
                onClick={() => {
                  if (!selectedOption) {
                    document
                      .getElementById("selectOption")
                      .classList.remove("hidden");
                  } else {
                    document
                      .getElementById("selectSizeError")
                      .classList.add("hidden");

                    addItem(
                      {
                        id: product.id + selectedOption,
                        title: product.title,
                        price: product.price,
                        img: product.img,
                        option: selectedOption,
                      },
                      quantity
                    );
                    document.getElementById("Cart").classList.remove("hidden");
                  }
                }}
                className="fixed z-30 invisible w-11/12 p-4 text-xl text-white -translate-x-1/2 -translate-y-1/2 bg-black rounded-full md:w-full h-fit top-95 left-1/2 md:top-0 md:translate-y-0 md:relative md:mt-3"
              >
                <div
                  id="addButton"
                  className="flex flex-row items-center mx-auto w-fit "
                >
                  <BsFillHandbagFill className="w-6 h-6 mr-3 fill-white" />
                  <h1>ADD TO BAG</h1>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full p-10 mt-6 border-gray-600 border-t-1">
          <div className="flex flex-col xl:flex-row md:mt-10 md:w-5/6 md:mx-auto">
            <div className="flex flex-col justify-between p-10 mx-auto my-6 bg-gray-100 rounded-lg shadow-xl md:mr-10 h-fit descriptionBox">
              <div className="flex flex-row items-center mb-6">
                <MdRestartAlt className="w-10 h-10 mr-6 fill-black" />
                <h1 className="text-xl font-semibold text-black">
                  Free Return On All Orders
                </h1>
              </div>
              <div className="flex flex-row items-center mb-6">
                <GoPackage className="w-10 h-10 mr-6 fill-black" />
                <h1 className="text-xl font-semibold text-black">
                  Free Standard Over $75
                </h1>
              </div>
              <div className="flex flex-row items-center mb-6">
                <MdOutlineLocalShipping className="w-10 h-10 mr-6 fill-black" />
                <h1 className="text-xl font-semibold text-black">
                  Free Express over $150
                </h1>
              </div>
            </div>
            <div className="flex flex-col h-fit descriptionBox">
              <div className="flex flex-col w-full border-black h-fit border-y-2">
                <div
                  onClick={() => {
                    document
                      .getElementById("Description")
                      .classList.toggle("hidden");
                    document
                      .getElementById("desArrow")
                      .classList.toggle("rotate-90");
                  }}
                  className="flex flex-row items-center justify-between px-4"
                >
                  <h1 className="text-3xl font-semibold text-black">
                    Description
                  </h1>
                  <MdKeyboardArrowRight
                    id="desArrow"
                    className="w-12 h-12 fill-black "
                  />
                </div>
                <p id="Description" className="px-2 text-2xl text-black">
                  {product.description}
                </p>
              </div>
              <div className="flex flex-col w-full border-b-2 border-black h-fit">
                <div
                  onClick={() => {
                    document
                      .getElementById("Delivery")
                      .classList.toggle("hidden");
                    document
                      .getElementById("delArrow")
                      .classList.toggle("-rotate-90");
                  }}
                  className="flex flex-row items-center justify-between px-4 "
                >
                  <h1 className="text-3xl font-semibold text-black">
                    Delivery & Returns
                  </h1>
                  <MdKeyboardArrowRight
                    id="delArrow"
                    className="w-12 h-12 rotate-90 fill-black"
                  />
                </div>
                <p id="Delivery" className="hidden px-2 text-2xl text-black">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  ab, cumque minus quod optio similique, rerum magnam, facilis
                  voluptate molestiae eaque debitis commodi tempore laboriosam
                  ut error dolorum? Iure, dolorum.Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Quis ab, cumque minus quod optio
                  similique, rerum magnam, facilis voluptate molestiae eaque
                  debitis commodi tempore laboriosam ut error dolorum? Iure,
                  dolorum.Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Quis ab, cumque minus quod optio similique, rerum
                  magnam, facilis voluptate molestiae eaque debitis commodi
                  tempore laboriosam ut error dolorum? Iure, dolorum.
                </p>
              </div>
            </div>
          </div>
          <Reviews reviewData={ProductData[product_id].Reviews} />
          <div id="selectOption" className="fixed top-0 left-0 z-40 hidden ">
            <button
              onClick={() => {
                document.getElementById("selectOption").classList.add("hidden");
              }}
              className="fixed top-0 w-full h-screen bg-black opacity-60 fade-in"
            ></button>
            <div className="fixed w-full bg-white top-full h-fit rounded-t-xl slide-in-bottom">
              <div className="relative w-full h-fit">
                <button className="float-right p-3">
                  <MdOutlineClose
                    onClick={() => {
                      document
                        .getElementById("selectOption")
                        .classList.add("hidden");
                    }}
                    className="w-12 h-12 cursor-pointer fill-grey"
                  />
                </button>
                <div className="flex flex-row w-4/5 p-6 ">
                  <div className="px-4">
                    <div className="relative overflow-hidden rounded-lg w-28 h-28">
                      <Image
                        src={"/productImgs/" + product.img}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-lg text black">{product.title}</h1>

                    <h1 className="text-lg text black">
                      {"$" + product.price}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col w-full h-full ">
                  <h2 className="ml-6 text-lg font-bold text-black">
                    SELECT SIZE
                  </h2>

                  {product.sizes.map((size, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          document
                            .getElementById("selectSizeError")
                            .classList.add("hidden");
                          document
                            .getElementById("selectOption")
                            .classList.add("hidden");

                          addItem(
                            {
                              id: product.id + size,
                              title: product.title,
                              price: product.price,
                              img: product.img,
                              option: size,
                            },
                            quantity
                          );
                          document
                            .getElementById("Cart")
                            .classList.remove("hidden");
                        }}
                        className="flex flex-row justify-between px-4 py-4 border-2 border-t cursor-pointer"
                      >
                        <h2 className="text-lg font-bold text-black">{size}</h2>
                        <button className="flex flex-row items-center text-lg font-bold text-black">
                          Add to Bag
                          <AiOutlinePlus className="w-6 h-6 ml-2 fill-black" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;

export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:3000/ProductData.json`);
  const data = await req.json();

  const product = data[params.Product_id].Products[params.Style];

  return {
    props: { product: product, product_id: params.Product_id },
  };
}

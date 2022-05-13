import React, { useState, useEffect } from "react";
import CheckoutStatus from "../Components/CheckoutStatus";
import OrderSummary from "../Components/OrderSummary";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Cookie from "js-cookie";
import Link from "next/link";
import LoadingSvg from "../../../Components/Loading";
import { useCart } from "react-use-cart";
import { useRouter } from "next/router";
import CheckoutHeader from "../Components/CheckoutHeader";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";

const Information = () => {
  const [customerInfo, setCustomerInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { cartTotal, items, removeItem } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Cookie.set("customerInfo", JSON.stringify(customerInfo));
  }, [customerInfo]);

  const handleStart = () => {
    setLoading(true);
  };

  return (
    <>
      <CheckoutHeader />
      <div className="flex flex-col justify-between w-screen h-full bg-white border-b-2 border-b-gray-200">
        {/* <CheckoutHeader /> */}
        <div className="flex flex-col justify-between w-screen min-h-screen mx-auto lg:flex-row max-1700 h-fit ">
          <div className="order-2 w-full mx-auto mb-3 border-gray-200 h-fit lg:w-1/2 md:border-r-2">
            <div className="w-11/12 mx-auto">
              <CheckoutStatus page="1" />
            </div>
            <div className="flex flex-col items-center w-5/6 mx-auto mt-6 lg:w-1/2 ">
              <h1 className="mb-3 text-2xl font-f2 text-c1">
                Express Checkout
              </h1>
            </div>
            <div className="flex flex-row items-center justify-between w-1/2 mx-auto mt-3">
              <div className="w-1/3 h-0 border-b-1 border-t1"></div>
              <h1 className="text-xl font-f2 text-c1">OR</h1>

              <div className="w-1/3 h-0 border-b-1 border-t1"></div>
            </div>
            <div className="flex flex-col items-center justify-between w-11/12 mx-auto mt-3">
              <form
                className="w-full"
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  setLoading(true);
                  setCustomerInfo({ ...data });
                  router.push("/Checkout/Shipping");
                  router.events.on("routeChangeStart", handleStart);
                })}
              >
                <div className="flex flex-row items-center justify-between w-full mx-auto mb-3">
                  <h1 className="text-xl font-f2 text-c1 whitespace-nowrap">
                    Contact Information
                  </h1>
                  <h2 className="text-xs font-f2 text-c1">
                    Already have an account? Log in
                  </h2>
                </div>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                <div className="flex flex-row items-center justify-between w-full mx-auto mt-3 mb-3">
                  <h1 className="text-2xl font-f2 text-c1">Shipping address</h1>
                </div>
                <div className="grid w-full grid-cols-1 gap-4 h-fit">
                  <TextField
                    fullWidth
                    name="firstName"
                    type="text"
                    label="First Name"
                    variant="outlined"
                    error={!!errors.firstName}
                    {...register("firstName", { required: true })}
                  />
                  <TextField
                    fullWidth
                    name="lastName"
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    error={!!errors.lastName}
                    {...register("lastName", { required: true })}
                  />
                  <TextField
                    fullWidth
                    name="address1"
                    type="text"
                    label="Address Line 1"
                    variant="outlined"
                    error={!!errors.address1}
                    {...register("address1", { required: true })}
                  />
                  <TextField
                    fullWidth
                    name="address2"
                    type="text"
                    label="Address Line 1"
                    variant="outlined"
                    error={!!errors.address2}
                    {...register("address2")}
                  />
                  <TextField
                    fullWidth
                    name="city"
                    type="text"
                    label="City"
                    variant="outlined"
                    error={!!errors.city}
                    {...register("city", { required: true })}
                  />
                  <TextField
                    fullWidth
                    name="state"
                    type="text"
                    label="State"
                    variant="outlined"
                    error={!!errors.state}
                    {...register("state", { required: true })}
                  />
                  <TextField
                    fullWidth
                    name="zip"
                    type="text"
                    label="Zip / Postal Code"
                    variant="outlined"
                    error={!!errors.zip}
                    {...register("zip", { required: true })}
                  />
                  <TextField
                    fullWidth
                    name="phone"
                    type="text"
                    label="Phone Number"
                    variant="outlined"
                    error={!!errors.phone}
                    {...register("phone", {
                      required: true,
                      pattern:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                    })}
                  />
                </div>

                <div className="flex flex-col items-center justify-between w-full mt-3 md:flex-row">
                  <Link href="/Checkout">
                    <a className="flex flex-row items-center order-2 w-fit md:order-1">
                      <MdOutlineArrowBackIos className="w-6 h-6 fill-c1" />
                      <h2 className="text-lg font-f2 text-c1">
                        Return to cart
                      </h2>
                    </a>
                  </Link>

                  <button
                    type="submit"
                    className="relative flex flex-row items-center order-1 w-full p-3 mb-3 bg-black rounded-lg md:mb-0 md:w-fit md:order-2"
                  >
                    {(() => {
                      if (loading) {
                        return (
                          <>
                            <div className="flex flex-row items-center invisible mx-auto w-fit">
                              <h2 className="text-lg text-white font-f2 ">
                                Continue To Shipping
                              </h2>
                              <MdOutlineArrowBackIos className="w-6 h-6 rotate-180 fill-white " />
                            </div>

                            <div className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                              <LoadingSvg />
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <div className="flex flex-row items-center mx-auto w-fit">
                            <h2 className="text-lg text-white font-f2 ">
                              Continue To Shipping
                            </h2>
                            <MdOutlineArrowBackIos className="w-6 h-6 rotate-180 fill-white " />
                          </div>
                        );
                      }
                    })()}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <OrderSummary page="1" dynamicShipping={null} />
        </div>
      </div>
      <h2 className="w-5/6 mx-auto mt-6 mb-2 text-center text-c1 text-md font-f2">
        By placing your order you agree to Yardflo’s Terms and Conditions,
        Privacy Notice and Cookie Policy.
      </h2>
    </>
  );
};

export default Information;

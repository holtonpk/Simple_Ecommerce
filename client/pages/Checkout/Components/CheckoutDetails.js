import React from "react";
const CheckoutDetails = ({
  page,
  customerInfo = { email: null },
  shippingMethod,
}) => {
  return (
    <div className="flex flex-col items-center w-full px-3 py-3 border-2 rounded-lg md:px-6 border-c1">
      <div className="justify-between w-full checkoutGrid">
        <h1 className="text-sm text-black md:text-lg font-f2">Contact</h1>
        <h1 className="text-sm text-black md:text-lg font-f2">
          {customerInfo.email}
        </h1>
        {/* <h1 className="text-sm text-gray-600 md:text-lg font-f2">Change</h1> */}
      </div>
      <div className="w-full h-0 my-3 border-b-1 border-t1"></div>

      <div className="justify-between w-full checkoutGrid">
        <h1 className="text-sm text-black md:text-lg font-f2 whitespace-nowrap">
          Ship to
        </h1>
        <h1 className="text-sm text-black md:text-lg font-f2">
          {customerInfo.address1 +
            ", " +
            customerInfo.city +
            ", " +
            customerInfo.state +
            ", " +
            customerInfo.zip}
        </h1>
        {/* <h1 className="text-sm text-gray-600 md:text-lg font-f2">Change</h1> */}
      </div>

      {(() => {
        if (page >= 3) {
          return (
            <>
              <div className="w-full h-0 my-3 border-b-1 border-t1"></div>
              <div className="justify-between w-full checkoutGrid">
                <h1 className="text-sm text-black md:text-lg font-f2 ">
                  Method
                </h1>
                <h1 className="text-sm text-black md:text-lg font-f2">
                  {shippingMethod.title +
                    " (" +
                    shippingMethod.time +
                    " ) *Once your order has shipped · " +
                    "$" +
                    shippingMethod.rate}
                </h1>
                {/* <h1 className="text-sm text-gray-500 md:text-lg font-f2">
                  Change
                </h1> */}
              </div>
            </>
          );
        }
      })()}
    </div>
  );
};

export default CheckoutDetails;

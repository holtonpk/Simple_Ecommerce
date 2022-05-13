import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
const ReviewSlider = ({ position, width, id }) => {
  return (
    <div className={"relative rounded-full bg-gray-300 h-4 " + width}>
      <span
        style={{
          left: position + "%",
        }}
        className="absolute z-10 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-full top-1/2"
      ></span>
      <span className="h-full w-0.5 bg-gray-500 left-1/4 absolute"></span>
      <span className="h-full w-0.5 bg-gray-500 left-2/4 absolute"></span>
      <span className="h-full w-0.5 bg-gray-500 left-3/4 absolute"></span>
    </div>
  );
};

export default ReviewSlider;

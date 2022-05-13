import React from "react";
import { RiStarSFill, RiStarSLine, RiStarHalfSFill } from "react-icons/ri";

const ReviewStars = ({ stars, size, fill }) => {
  const roundedStarts = Math.round(stars * 2) / 2;
  const wholeStars = Math.floor(stars);
  const halfStars = (roundedStarts - wholeStars) / 0.5;
  const emptyStars = 5 - wholeStars - halfStars;

  const configStars = () => {
    let Stars = [];
    for (let i = 0; i < wholeStars; i++) {
      Stars.push(
        <RiStarSFill key={"whole-" + i} className={fill + " " + size} />
      );
    }
    for (let i = 0; i < halfStars; i++) {
      Stars.push(
        <RiStarHalfSFill key={"half-" + i} className={fill + " " + size} />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      Stars.push(
        <RiStarSLine key={"empty-" + i} className={fill + " " + size} />
      );
    }
    return Stars;
  };
  return <div className="flex flex-row">{configStars()}</div>;
};

export default ReviewStars;

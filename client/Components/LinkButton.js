import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingSvg from "./Loading";

const LinkButton = ({ text, href, style, loaderStyle }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const clickButton = () => {
    router.push(href);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
  };

  const handleComplete = () => {
    setLoading(false);
  };
  const handleStart = () => {
    setLoading(true);
  };

  const configButton = () => {
    if (!loading) {
      return (
        <button onClick={clickButton} className={style}>
          {text}
        </button>
      );
    } else {
      return (
        <button onClick={clickButton} className={style}>
          <div className={"mx-auto " + loaderStyle}>
            <LoadingSvg />
          </div>
        </button>
      );
    }
  };

  return <>{configButton()}</>;
};

export default LinkButton;

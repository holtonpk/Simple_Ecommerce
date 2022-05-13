import Header from "../Components/Header";
import { useEffect } from "react";
import Footer from "../Components/Footer";
// import * as ScrollMagic from "scrollmagic";

export default function Home() {
  useEffect(() => {});

  return (
    <>
      <Header />
      <div className="w-screen h-screen bg-black"></div>
      <Footer />
    </>
  );
}

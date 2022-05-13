import "../styles/globals.css";
import { CartProvider } from "react-use-cart";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const Loader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => setLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading && <div className="dots-loader"></div>;
};

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Loader />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;

import React from "react";

const Signin = () => {
  return (
    <div
      id="signIn"
      className="fixed top-0 hidden w-screen h-screen z-60 bg-black_80"
    >
      <button
        onClick={() =>
          document.getElementById("signIn").classList.toggle("hidden")
        }
        className="w-full h-full"
      ></button>
      <div className="absolute flex flex-col items-start justify-between w-3/4 px-10 py-5 pr-4 -translate-x-1/2 -translate-y-1/2 bg-white border-black md:w-1/2 top-1/2 left-1/2 rounded-xl lightplace">
        <h1 className="mb-3 text-3xl text-black font-f1">
          Sign in or Create Account
        </h1>
        <h1 className="w-full mb-3 text-xl text-black font-f2">
          Use the same sign-in credentials for any brand in our family of
          brands.
        </h1>

        <input
          type="text"
          placeholder="Email"
          className="w-full h-16 pl-3 mb-3 text-2xl text-black border-2 border-black font-f1 rounded-xl"
        />
        <input
          type="text"
          placeholder="Password"
          className="w-full h-16 pl-3 mb-3 text-2xl text-black border-2 border-black font-f1 rounded-xl"
        />
        <div className="flex flex-row items-center">
          <button className="p-3 text-xl text-white bg-black border-2 text-f2 rounded-xl hover:opacity-70 ">
            Sign In
          </button>
          <button className="p-3 text-xl text-black bg-white border-2 border-black text-f2 rounded-xl hover:opacity-70 ">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;

import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="Home" className="relative overflow-hidden bg-slate-50 ">
      <div className="max-w-[1800px] w-full flex px-4 sm:px-10 md:px-12 mx-auto">
        <div className="bg-header-mobile bg-custom-mobile-header-size absolute left-0 bg-top w-full h-full bg-no-repeat lg:hidden"></div>
        <img src="src/assets/imgs/bank1.jpg" className="bg-header-desktop w-[40%] h-full" alt="Description of the image" />
        <div className="max-w-xl mx-auto lg:mx-0 h-screen relative z-20">
          <div className="h-full flex flex-col justify-center md:justify-end pb-4 lg:pb-0 lg:w-96 lg:justify-center lg:ml-20">
            <div className="h-2/3 flex flex-col  backdrop-blur-[2px] bg-white/30 lg:backdrop-blur-none lg:bg-transparent rounded-lg px-2 justify-center items-center text-center lg:items-start lg:text-left">
              <div className="flex flex-col justify-center items-center lg:items-start flex-grow lg:pt-16">
                <h1 className="text-4xl font-bold !font-sans lg:leading-[1.20] lg:text-5xl text-slate-800 lg:text-purple-800 pb-5 drop-shadow-md">
                  <span className="bg-indigo-500 text-white rounded px-2">
                    Guardian Bank
                  </span>{" "}
                  <span className="text-base">Beyond&nbsp;Banking, Beyond&nbsp;Security!</span>{" "}
                </h1>

                <p className="text-gray-700 !font-sans text-sm md:text-base lg:text-lg leading-5 my-5 drop-shadow">
                  Enjoy a seamless online experience for all your banking needs: send, save, budget, withdraw, and beyond.                </p>
              </div>
              <Link
                to="/register"
                className="flex justify-center items-center font-bold text-xl bg-indigo-500 text-white hover:bg-white focus:bg-white mt-auto px-8 py-4  hover:text-blue-800 focus:text-blue-800 border-2  border-indigo-500 hover:border-blue-800  focus:border-blue-800  rounded-lg
         shadow transition-all ease-in-out duration-300 mb-5"
              >
                <span>Register</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillCloseCircle, AiFillHome } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogIn } from "react-icons/io5";
import { MdReviews } from "react-icons/md";
import { Link } from "react-router-dom";
import { Logo } from "../../../shared/Logo";

const navItems = ["Home", "About", "Reviews"];
const navIcons = [
  <AiFillHome size={25} className="mb-1 mr-1" />,
  <BsInfoCircleFill size={25} className="mb-1 mr-1" />,
  <MdReviews size={25} className="mr-1" />,
];

export default function Navbar() {
  //navbar opened/closed state
  const [isOpen, setIsOpen] = useState(false);
  //navbar scroll when active state
  const [navbar, setNavbar] = useState(false);

  const navRef = useRef(null);
  const OpenBtnRef = useRef(null);

  useEffect(() => {
    //navbar scroll changeBackground function
    const changeBackground = () => {
      if (window.scrollY > 100) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    //Close Navbar When Click outside it.
    const closeNavbar = (e) => {
      if (
        !navRef?.current?.contains(e.target) &&
        !OpenBtnRef?.current?.contains(e.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeNavbar);

    return () => {
      document.removeEventListener("click", closeNavbar);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${
          navbar ? "bg-indigo-100 shadow-lg " : " bg-transparent "
        }  fixed z-50 top-0 w-full transition-all duration-300 ease-in-out`}
      >
        <nav className="max-w-[1800px] w-full mx-auto px-4 sm:px-10 md:px-12 py-2 md:py-4 flex justify-between items-center z-20">
          <div className="max-w-[200px]">
            <Logo bg={false} textSize="text-lg md:text-2xl lg:text-3xl" />
          </div>

          

          <div className="hidden lg:flex justify-end items-center gap-4">
            <Link
              to="/login"
              className="flex gap-1 justify-center items-center font-bold text-xs sm:text-sm bg-indigo-800 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-indigo-800 border-2 hover:border-indigo-800  rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              <IoLogIn size={20} />
              Login
            </Link>
          </div>

          <div className="hidden lg:flex justify-end items-center gap-4">
            <Link
              to="employees/login"
              className="flex gap-1 justify-center items-center font-bold text-xs sm:text-sm bg-indigo-800 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-indigo-800 border-2 hover:border-indigo-800  rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              <IoLogIn size={20} />
              Employee Login
            </Link>
          </div>

          <button
            ref={OpenBtnRef}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none border-2 border-transparent rounded hover:border-indigo-900 active:border-indigo-900  focus:border-indigo-900"
          >
            <GiHamburgerMenu size={30} className="text-indigo-900" />
          </button>
        </nav>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[55] flex justify-center items-center p-6 bg-indigo-900 bg-opacity-50 transition-all duration-300 ease-in-out delay-500
     ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav
          ref={navRef}
          className={`w-full bg-white text-blue-900 transition-all duration-300 ease-in-out flex flex-col gap-4 text-center p-4 shadow rounded ${
            isOpen ? "translate-y-0 scale-100" : "translate-y-[100vh] scale-0"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none ml-auto border-2 border-transparent rounded hover:border-red-500 active:border-red-500  focus:border-red-500"
          >
            <AiFillCloseCircle size={35} className="text-red-700" />
          </button>
        
          <div className="flex justify-center items-center gap-4">
            
            
          



            <Link
              to="/login"
              className="flex gap-1 justify-center items-center font-bold text-xs sm:text-sm bg-indigo-800 text-white hover:bg-white px-4  py-2 hover:text-blue-800 border-2 border-blue-800 hover:border-blue-800  rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              <IoLogIn size={16} />
              Login
            </Link>


            <Link
              to="employees/login"
              className="flex gap-1 justify-center items-center font-bold text-xs sm:text-sm bg-indigo-800 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-indigo-800 border-2 hover:border-indigo-800  rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              <IoLogIn size={20} />
              Employee Login
            </Link>

          </div>
          
        </nav>
      </div>
    </>
  );
}

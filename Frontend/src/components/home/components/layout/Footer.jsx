import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineSecurity, MdReviews } from "react-icons/md";
import { Link } from "react-router-dom";
import { Logo } from "../../../shared/Logo";
import moment from "moment";

const navIcons = [
  <AiFillHome size={17} className=" mr-1" />,
  <BsInfoCircleFill size={17} className=" mr-1" />,
  <MdReviews size={17} className="mr-1" />,
  <AiFillSetting size={17} className="mr-1" />,
  <MdOutlineSecurity size={17} className="mr-1" />,
];

export default function Footer() {
  return (
    <footer className="py-10 bg-[#0f172a]">
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-10 md:px-12">
        <div className="text-center grid grid-cols-1 justify-items-center gap-6 lg:grid-cols-12 lg:gap-0">
          <div className="flex flex-col justify-between gap-4 lg:justify-self-start lg:col-span-3">
            <div className="flex justify-center items-center flex-col gap-4">
              <Logo />
              <p className="text-base !font-sans font-semibold text-[#ffffff]">
                Beyong Banking, Beyond Security !
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 py-1 lg:grid-rows-3 lg:ml-4 text-white text-sm lg:text-left lg:justify-self-start lg:col-span-5 lg:gap-x-24 lg:grid-flow-col-dense">
            <a
              className="flex items-center hover:text-blue-400 focus:text-blue-400"
              href="#Home"
            >
              {navIcons[0]}
              Home
            </a>
            <a
              className="flex  items-center hover:text-blue-400 focus:text-blue-400"
              href="#About"
            >
              {navIcons[1]}
              About
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

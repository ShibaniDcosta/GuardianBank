import React from "react";
// import { FcLightAtTheEndOfTunnel } from "react-icons/fc";

export const Logo = ({ textSize = null, bg = true }) => {
  return (
    <div
      className={`${
        bg && "bg-indigo-100 border-blue-800  shadow rounded"
      } w-full flex justify-center items-center p-2  select-none`}
    >
      {/* <FcLightAtTheEndOfTunnel className="-mr-2" size={45} /> */}
      <img src="/src/assets/icons/Logo_Tab.svg" alt="GuardianBankLogo" className="-mr-2" style={{width: '200px', height: '100px'}} />
      <span
        className={`${
          textSize ? textSize : "text-3xl"
        } p-2  text-indigo-800 font-bold `}
      >
        Guardian&nbsp;Bank
      </span>
    </div>
  );
};

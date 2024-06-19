import React from "react";
import { useState } from "react";
import { FcCancel, FcOk } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";

export default function MessagesContainer({ msg, isSuccess, isError }) {
  //state for closing(hide) message
  const [hideMsg, setHideMsg] = useState(false);

  //handle hide msg
  const handleHide = () => {
    setHideMsg(true);
  };

  return (
    <div
      className={`
      ${hideMsg && "hidden"}
      ${isSuccess} 
      ${isError}
      relative flex flex-col md:flex-row justify-center items-center gap-2 min-h-[20px] text-center text-sm md:text-base lg:text-lg text-black font-medium my-2 px-2 py-4`}
    >
      {/* Close Message btn */}
      <button
        type="button"
        onClick={handleHide}
        className="absolute right-0 top-0"
      >
        <TiDelete
          className={`w-full h-full ${
            isError ? "text-black-700" : "text-black-700"
          }`}
          size={35}
        />
      </button>

      {/* isSuccess Icon */}
      {isSuccess}

      {/* isError Icon */}
      {isError && <FcCancel size={40} />}

      {isError && (
        <div>
          <span className="mr-2">Error!</span>
          <span>{msg}</span>
        </div>
      )}

      {isSuccess && msg}
    </div>
  );
}

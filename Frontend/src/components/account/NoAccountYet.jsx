import React from "react";
import { Link } from "react-router-dom";
import { GrSubtractCircle } from "react-icons/gr";

export const NoAccountYet = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 max-w-5xl min-h-[350px] w-full p-6 bg-slate-50 border rounded">
      {/* <FcExpired size={150} /> */}

      <p className="w-full text-lg font-semibold text-center">
        You do not have any accounts yet!
      </p>
      {<GrSubtractCircle size={150}/>}

      <Link
        className="self-end mt-auto  inline-flex font-bold text-xs sm:text-sm bg-indigo-500 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-blue-600 border hover:border-indigo-200 items-center rounded
            shadow transition-all ease-in-out duration-300"
        to={"/account-request"}
      >
        <span>Request Account</span>
      </Link>
    </div>
  );
};

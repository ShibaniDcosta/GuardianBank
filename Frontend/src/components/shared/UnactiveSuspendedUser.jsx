import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FcCancel, FcSynchronize } from "react-icons/fc";
import { Link } from "react-router-dom";

export const UnactiveSuspendedUser = ({ userStatus }) => {
  return (
    <div className="max-w-2xl w-full flex flex-col justify-center items-center text-base md:text-lg font-semibold">
      {/* {userStatus === 1 && <FcSynchronize size={150} />}
      {userStatus === 2 && <FcCancel size={150} />} */}

      <div className="w-full my-4 text-base md:text-xl text-center font-semibold">
        <p>
          Your Account has been {" "}
          {userStatus === 1 ? (
            <span className="text-red-600 font-bold underline">
              Inactivated!
            </span>
          ) : (
            <span className="text-red-900 font-bold underline">Suspended!</span>
          )}
        </p>
        <p>You will not be able to perform any transactions.</p>
        <p className="mt-5">Please try to contact us at dummyEmail@guardianBank.com</p>
      </div>

    </div>
  );
};

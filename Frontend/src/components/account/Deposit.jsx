import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  resetAccountStatus,
  deposit,
  sendOtp,
  verifyOtp
} from "../../state/features/Account/accountSlice";
import FormButton from "../shared/FormButton";
import MessagesContainer from "../shared/MessagesContainer";
import { UseResetStatus } from "../../hooks/UseResetStatus";

export const Deposit = () => {
  // State for deposit amount
  const [depositAmount, setDepositAmount] = useState(100);

  // State for user password
  const [password, setPassword] = useState("");

  // State for alert messages
  const [msg, setMsg] = useState("");

  // OTP related states
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const { account, isError, isSuccess, isLoading, message, isOtpVerified } = useSelector(
    (state) => state.userAccount
  );
  const { user } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      setMsg(message);
    }

    if (isSuccess) {
      setMsg("If the Email is valid, you must have received an OTP (valid for 5 minutes).");
    }

    if (isOtpVerified) {
      setMsg(`You Have Deposited ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(depositAmount)} Successfully!`);
    }
  }, [isError, isSuccess, message, account, msg, isOtpVerified]);

  // Get account ID from URL
  const accountId = useLocation().pathname.split("/").at(-1);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    dispatch(sendOtp({ accountId, email: user.email, token: user.token }));
    setOtpSent(true);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const actionResult = await dispatch(verifyOtp({ accountId, otp, token: user.token }));
    if (actionResult.payload && actionResult.payload.success) {
      const depositData = {
        accountId,
        depositAmount,
        token: user.token,
        oldPassword: password,
        id: user.id,
      };
      dispatch(deposit(depositData));
      setOtpSent(false); // Reset OTP sent state after successful verification
    } else {
      setMsg("OTP verification failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const depositData = {
      accountId,
      depositAmount,
      token: user.token,
      oldPassword: password,
      id: user.id,
    };
    dispatch(deposit(depositData));
  };

  UseResetStatus(() => {
    return () => {
      dispatch(resetAccountStatus());
    };
  });

  // return (
  //   <div className="max-w-5xl w-full">
  //     <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10">
  //       Deposit Money
  //     </h3>
  //     <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
  //       <div className="flex justify-center items-center font-semibold flex-wrap gap-4 mb-5 p-2">
  //         <label className="basis-full sm:basis-[50%] text-md my-2 sm:my-0 p-2" htmlFor="depositAmount">
  //           Enter Deposit Amount
  //         </label>
  //         <input
  //           className="basis-full sm:basis-1/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
  //           type="number"
  //           name="depositAmount"
  //           id="depositAmount"
  //           value={depositAmount}
  //           onChange={(e) => setDepositAmount(e.target.value)}
  //           min="100"
  //           required
  //         />

  //         <label className="basis-full sm:basis-[50%] text-md my-2 sm:my-0 p-2" htmlFor="password">
  //           Type your Password
  //         </label>
  //         <input
  //           className="basis-full sm:basis-1/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
  //           type="password"
  //           name="password"
  //           id="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </div>

  //       {otpSent && (
  //         <input
  //           className="input-standard"
  //           type="text"
  //           placeholder="Enter OTP"
  //           value={otp}
  //           onChange={(e) => setOtp(e.target.value)}
  //           required
  //         />
  //       )}

  //       {(isError || isSuccess) && (
  //         <MessagesContainer
  //           msg={msg}
  //           isSuccess={isSuccess}
  //           isError={isError}
  //         />
  //       )}

  //       <FormButton
  //         text={{ default: otpSent ? "Verify OTP" : "Deposit", loading: "Processing..." }}
  //         isLoading={isLoading}
  //       />
  //     </form>
  //   </div>
  // );


  return (
    <div className="max-w-5xl w-full">
      <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10">
        Deposit Money
      </h3>
      <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
        <div className="flex justify-center items-center font-semibold flex-wrap gap-4 mb-5 p-2">
          <label className="basis-full sm:basis-[50%] text-md my-2 sm:my-0 p-2" htmlFor="depositAmount">
            Enter Deposit Amount
          </label>
          <input
            className="basis-full sm:basis-1/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            type="number"
            name="depositAmount"
            id="depositAmount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            min="100"
            required
          />

          <label className="basis-full sm:basis-[50%] text-md my-2 sm:my-0 p-2" htmlFor="password">
            Type your Password
          </label>
          <input
            className="basis-full sm:basis-1/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {otpSent && (
            <>
              <label className="basis-full sm:basis-[50%] text-md my-2 sm:my-0 p-2" htmlFor="otp">
                Enter OTP
              </label>
              <input
                className="basis-full sm:basis-1/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
                type="text"
                name="otp"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </>
          )}
        </div>

        {(isError || isSuccess) && (
          <MessagesContainer
            msg={msg}
            isSuccess={isSuccess}
            isError={isError}
          />
        )}

        <FormButton
          text={{ default: otpSent ? "Verify OTP" : "Deposit", loading: "Processing..." }}
          isLoading={isLoading}
        />
      </form>
    </div>
  );

};
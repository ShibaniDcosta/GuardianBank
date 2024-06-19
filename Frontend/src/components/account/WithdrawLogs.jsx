import moment from "moment";
import React from "react";
import { FcBullish } from "react-icons/fc";
import { useSelector } from "react-redux";
import { PaginationWithdrawList } from "../helpers/PaginationWithdrawList";
import { FaCalendarAlt, FaInfoCircle, FaMoneyBillWave } from "react-icons/fa";

export const WithdrawLogs = () => {
  //Get account data
  const { account } = useSelector((state) => state.userAccount);

  //Get Withdraw Logs List
  const withdrawLogs = account.withdraw_logs;

  //Withdarw Log UI Data
  const withdrawLog = (log) => {
    return (
      <li
        key={log._id}
        className="min-h-[150px] my-4 flex flex-col gap-2 items-center justify-center flex-wrap"
      >
        <p className="w-full flex items-center md:justify-center">
          Date:
          <span className="ml-auto md:mx-2 p-2">
            {moment(log.createdAt).format("DD-MM-YYYY")}
          </span>
        </p>

        <p className="w-full flex items-center md:justify-center">
          Amount:
          <span className="ml-auto md:mx-2 p-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(log.withdrawed_amount)}
          </span>
        </p>
      </li>
    );
  };

  //In case Of No Withdraw Logs
  if (!withdrawLogs || withdrawLogs.length === 0)
    return (
      <div className="max-w-2xl w-full mx-auto my-4 flex flex-col gap-4 items-center justify-center flex-wrap  ">
        <p className="text-gray-800 text-base font-semibold">
          There are no Withdraw Logs yet!
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl w-full self-start">
      <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10 ">
        Withdraw Logs
      </h3>

      <PaginationWithdrawList
        withdrawLogs={withdrawLogs.slice(0).reverse()}
        withdrawLog={withdrawLog}
        rowsPerPage={10}
      />
    </div>
  );
};

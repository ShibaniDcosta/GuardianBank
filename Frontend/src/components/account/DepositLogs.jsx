import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { PaginationDepositList } from "../helpers/PaginationDepositList";

export const DepositLogs = () => {
  //Get account data
  const { account } = useSelector((state) => state.userAccount);

  //Get Deposit Logs List
  const depositLogs = account.deposit_logs;

  //Deposit Log UI Data
  const depositLog = (log) => {
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
            }).format(log.depositted_amount)}
          </span>
        </p>
      </li>
    );
  };

  //In case Of No Deposit Logs
  if (!depositLogs || depositLogs.length === 0)
    return (
      <div className="max-w-2xl w-full mx-auto my-4 flex flex-col gap-4 items-center justify-center flex-wrap  ">
        <p className="text-gray-800 text-base font-semibold">
          There are no Deposit Logs yet
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl w-full self-start">
      <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10 ">
        Deposit Logs
      </h3>

      <PaginationDepositList
        depositLogs={depositLogs.slice(0).reverse()}
        depositLog={depositLog}
        rowsPerPage={10}
      />
    </div>
  );
};

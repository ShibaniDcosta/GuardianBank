import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { PaginationIncomingList } from "../helpers/PaginationIncomingList";

export const IncomingTransactions = () => {
  //Get account data
  const { account } = useSelector((state) => state.userAccount);

  //Get Incoming Log List
  const incoming = account.in;

  //Incoming Transaction UI Data
  const incomingTransaction = (transaction) => {
    return (
      <li
        key={transaction._id}
        className="min-h-[150px] my-4 flex flex-col gap-2 items-center justify-center flex-wrap"
      >
        <table className="w-full">
          <tbody>
            <tr>
              <td>Date of Transaction:</td>
              <td>{moment(transaction.createdAt).format("DD-MM-YYYY")}</td>
            </tr>
            <tr>
              <td>From Account Number:</td>
              <td>{transaction.from}</td>
            </tr>
            <tr>
              <td>Amount Received:</td>
              <td>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(transaction.balance_transfered)}
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    );
  };

  //In case Of No Transactions Log
  if (!incoming || incoming.length === 0)
    return (
      <div className="max-w-2xl w-full mx-auto my-4 flex flex-col gap-4 items-center justify-center flex-wrap">
        <p className="text-gray-800 text-base font-semibold">
          You Have Not Received Any Transactions Yet
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl w-full self-start">
      <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10">
        Incoming Transactions
      </h3>

      <PaginationIncomingList
        incomingTransactions={incoming.slice(0).reverse()}
        incomingTransaction={incomingTransaction}
        rowsPerPage={10}
      />
    </div>
  );
};

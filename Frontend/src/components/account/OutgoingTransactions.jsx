import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { PaginationOutgoingList } from "../helpers/PaginationOutgoingList";
export const OutgoingTransactions = () => {
  //Get account data
  const { account } = useSelector((state) => state.userAccount);

  //Get OutGoing Log List
  const outgoing = account.out;

  //OutGoing Transaction UI Data
  const outgoingTransaction = (transaction) => {
    return (
      <li
        key={transaction._id}
        className="min-h-[150px] my-4 flex flex-col gap-2 items-center justify-center flex-wrap"
      >
        <table className="w-full">
          <tbody>
          <tr key={transaction._id}>
        <td>Date of Transaction:</td>
        <td>{moment(transaction.createdAt).format("DD-MM-YYYY")}</td>
      </tr>
      <tr>
        <td>To Account Number:</td>
        <td>{transaction.to}</td>
      </tr>
      <tr>
        <td>Amount Transferred:</td>
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
  if (!outgoing || outgoing.length === 0)
    return (
      <div className="max-w-2xl w-full mx-auto my-4 flex flex-col gap-4 items-center justify-center flex-wrap  ">

        <p className="text-gray-800 text-base font-semibold">
          You Have Not Sent Any Transactions Yet
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl w-full self-start">
      <h3 className="flex justify-center items-center text-2xl text-center font-bold px-2 py-4 mb-10 ">
        Outgoing Transactions
      </h3>

      <PaginationOutgoingList
        outgoingTransactions={outgoing.slice(0).reverse()}
        outgoingTransaction={outgoingTransaction}
        rowsPerPage={10}
      />
    </div>
  );
};

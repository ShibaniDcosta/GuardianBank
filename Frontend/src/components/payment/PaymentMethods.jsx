import React, { useState } from "react";
import { CreditCard } from "./CreditCard";

export const PaymentMethods = ({ title }) => {
  // State for selected payment method
  const [method, setMethod] = useState("Credit card");

  return (
    <div className="p-2 mb-5">
      {/* Heading */}
      <h3 className="text-base font-semibold text-gray-900 p-2">{title}</h3>

      {/* Choose Method */}
      <fieldset className="mt-4">
        <legend className="sr-only">Payment type</legend>
      </fieldset>

      {/* Method input details */}
      {method === "Credit card" && <CreditCard />}
    </div>
  );
};

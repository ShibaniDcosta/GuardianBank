import React, { useState } from "react";

export const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handleCardNumberChange = (event) => {
    let { value } = event.target;
    value = value.replace(/\D/g, "").substring(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  };

  const handleExpirationDateChange = (event) => {
    let { value } = event.target;
    value = value.replace(/\D/g, "");
    if (value.length <= 4) {
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
      }
      setExpirationDate(value);
    }
  };

  const handleCvcChange = (event) => {
    let { value } = event.target;
    value = value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvc(value);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
      <div className="col-span-4">
        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
          Card number
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="card-number"
            id="card-number"
            autoComplete="cc-number"
            className="block w-full p-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>
      </div>

      <div className="col-span-4">
        <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
          Name on card
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name-on-card"
            id="name-on-card"
            autoComplete="cc-name"
            className="block w-full p-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div className="col-span-3">
        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
          Expiration date (MM/YY)
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="expiration-date"
            id="expiration-date"
            autoComplete="cc-exp"
            className="block w-full p-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            value={expirationDate}
            onChange={handleExpirationDateChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
          CVC
        </label>
        <div className="mt-1">
          <input
            type="password"  // Change the type to password to mask input
            name="cvc"
            id="cvc"
            autoComplete="csc"
            className="block w-full p-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            value={cvc}
            onChange={handleCvcChange}
            maxLength="3"  // Ensure no more than 3 digits
          />
        </div>
      </div>
    </div>
  );
};

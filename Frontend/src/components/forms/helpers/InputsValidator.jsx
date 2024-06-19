import React from "react";

//validate name
const validateName = (name) => {
  let regex = new RegExp(
    "^(?=[a-zA-Z0-9._ ]{3,35}$)(?!.*[_.]{2})[^_.].*[^_.]$"
  );
  return regex.test(name);
};

//validate password
const validatePassword = (password) => {
  let regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return regex.test(password);
};

export const InputsValidator = ({ nameInput = null, passwordInput = null }) => {
  //return name validation requirements and show state color of validation.
  if (nameInput)
    return (
      <div
        className={`${
          validateName(nameInput) ? "text-green-600" : "text-black-600"
        } text-xs md:text-sm font-semibold px-2 my-4`}
      >
      </div>
    );

  //return password validation requirements and show state color of validation.
  if (passwordInput)
    return (
      <div
        className={`${
          validatePassword(passwordInput) ? "text-green-600" : "text-red-600"
        } text-xs md:text-sm font-semibold px-2 my-4`}
      >
        <p>Password Should Be:-</p>
        <p>* Be 8 characters or longer.</p>
        <p>* Contain at least 1 lowercase, 1 uppercase alphabetical character, 1 numeric character and 1 special Character.</p>
      </div>
    );
};

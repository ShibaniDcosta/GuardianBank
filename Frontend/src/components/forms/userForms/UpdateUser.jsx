import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserStatus,
  updateUser,
} from "../../../state/features/User/UserData/userSlice";
import FormButton from "../../shared/FormButton";
import MessagesContainer from "../../shared/MessagesContainer";
import { InputsValidator } from "../helpers/InputsValidator";
import { UseResetStatus } from "../../../hooks/UseResetStatus";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const { info, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userData
  );

  const [fromInputs, setFromInputs] = useState({
    email: info && info.email,
    phone: info?.phone || '',
    postal: info && info.postal.toString(),
    address: info && info.address,
    oldPassword: "",
    password: "",
    repeatedPassword: "",
    msg: "",
  });

  const {
    email,
    oldPassword,
    repeatedPassword,
    password,
    address,
    phone,
    postal,
    msg,
  } = fromInputs;

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    // Remove any characters that are not digits
    const formattedPhone = value.replace(/[^0-9]/g, '');
    if (formattedPhone.length <= 10) { 
      setFromInputs(prev => ({
        ...prev,
        phone: formattedPhone
      }));
    }
  };

  const handlePostalChange = (event) => {
    const { value } = event.target;
    const formattedPostal = value.replace(/[^0-9]/g, ''); 
    if (formattedPostal.length <= 5) { 
      setFromInputs(prev => ({
        ...prev,
        postal: formattedPostal
      }));
    }
  };
  

  useEffect(() => {
    if (isError) {
      setFromInputs({ ...fromInputs, msg: message });
    }

    if (isSuccess) {
      setFromInputs({
        ...fromInputs,
        msg: message,
      });
    }
  }, [isError, message, isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Reset User Status
    dispatch(resetUserStatus());
    //set msg to none first
    setFromInputs({ ...fromInputs, msg: "" });
    //check for password match >>> if not matched then show error msg
    if (password !== repeatedPassword) {
      setFromInputs({ ...fromInputs, msg: "Both the passwords are not the same." });
      return;
    }

    const userData = {
      email: email.trim(),
      phone: phone.trim(),
      postal: postal.trim(),
      addresse: address.trim(),
      token: user.token,
      id: user.id,
      password,
      oldPassword,
    };
    dispatch(updateUser(userData));
  };

  UseResetStatus(() => {
    return () => {
      dispatch(resetUserStatus());
    };
  });

  if (info) {
    return (
      <div className="max-w-4xl w-full">
        <h3 className="flex justify-center items-center text-2xl italic font-bold text-center px-2 py-4 mb-10  border-blue-800">
      
          Update Your Info
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800"
            >
              Email address: 
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={email}
              onChange={(e) =>
                setFromInputs({ ...fromInputs, email: e.target.value })
              }
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="oldPassword"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800"
            >
              Old Password:
            </label>
            {/* <span className="flex items-center flex-col md:flex-row gap-2 text-sm md:text-base  text-blue-700 mb-2 font-medium">
              <FcInfo size={27} />
              <span>
                If you DO NOT want to change password, just type it for all
                password field.
              </span>
            </span> */}
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={oldPassword}
              onChange={(e) =>
                setFromInputs({ ...fromInputs, oldPassword: e.target.value })
              }
              placeholder="Enter your old Password"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800"
            >
              New Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={password}
              onChange={(e) =>
                setFromInputs({ ...fromInputs, password: e.target.value })
              }
              placeholder="Enter New Password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="repeatedPassword"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800"
            >
              Repeat New Password:
            </label>
            <input
              type="password"
              name="repeatedPassword"
              id="repeatedPassword"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={repeatedPassword}
              onChange={(e) =>
                setFromInputs({
                  ...fromInputs,
                  repeatedPassword: e.target.value,
                })
              }
              placeholder="Repeat New Password"
              required
            />
          </div>

          {/* password validator */}
          <InputsValidator passwordInput={password} />

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800"
            >
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              autoComplete="off"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="type your phone number"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength='10'
              required
            />
    

          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800"
            >
              Full Address:
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={address}
              onChange={(e) =>
                setFromInputs({
                  ...fromInputs,
                  address: e.target.value,
                })
              }
              placeholder="Type your full address"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="postal"
              className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800"
            >
              Post/Zip Code:
            </label>
            <input
              type="text"
              name="postal"
              id="postal"
              className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              value={postal}
              onChange={handlePostalChange}
              maxLength="5"
              placeholder="Type your Post code"
              required
            />
            
          </div>

          {/*Request Status and Errors*/}
          {msg && (
            <MessagesContainer
              msg={msg}
              isSuccess={isSuccess ? isSuccess : false}
              isError={isError || (msg && !isSuccess) ? true : false}
            />
          )}

          {/*form button */}
          <FormButton
            text={{ loading: "Updating", default: "Update" }}
            isLoading={isLoading}
          
          />
        </form>
      </div>
    );
  } else {
    return null;
  }
}

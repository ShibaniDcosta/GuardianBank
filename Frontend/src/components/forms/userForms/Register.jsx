import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import { FcCurrencyExchange } from "react-icons/fc";
import { TiUserAdd } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../../state/features/User/Auth/authSlice";
import FormButton from "../../shared/FormButton";
import { Logo } from "../../shared/Logo";
import MessagesContainer from "../../shared/MessagesContainer";
import { InputsValidator } from "../helpers/InputsValidator";
import { Link } from "react-router-dom";

export default function Register() {
  const [formInputs, setFormInputs] = useState({
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
    email: "",
    phone: "",
    address: "",
    postCode: "",
    msg: "",
    role:""
  });

  const {
    postCode,
    email,
    password,
    phone,
    address,
    lastName,
    firstName,
    repeatPassword,
    msg,
    role,
  } = formInputs;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    const formattedPhone = value.replace(/[^0-9]/g, ''); 
    if (formattedPhone.length <= 10) { 
      setFormInputs(prev => ({
        ...prev,
        phone: formattedPhone
      }));
    }
  };
  
  const handlePostalChange = (event) => {
    const { value } = event.target;
    const formattedPostal = value.replace(/[^0-9]/g, ''); 
    if (formattedPostal.length <= 5) { 
      setFormInputs(prev => ({
        ...prev,
        postCode: formattedPostal
      }));
    }
  };
  

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (isError) {
      setFormInputs({ ...formInputs, msg: message });
    }

    if (user || isSuccess) {
      setFormInputs({
        ...formInputs,
        msg: "Registered Succesfully",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [user, isError, isSuccess, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //set error msg to none first
    setFormInputs({ ...formInputs, msg: "" });
    //check for password match > then show error msg
    if (password !== repeatPassword) {
      setFormInputs({ ...formInputs, msg: "Both the passwords are not the same." });
      return;
    }

    const userData = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      phone: phone.trim(),
      postal: postCode.trim(),
      addresse: address.trim(),
      password,
      role,
    };
    // console.log("userData",userData)
    dispatch(register(userData));
  };

  

  return (
    <div className="block p-6 rounded shadow-lg shadow-black/20 bg-slate-50 w-full mx-auto">
      <Logo />
      <h3 className="flex justify-center items-center text-2xl text-indigo-800 font-bold text-center p-2 my-4 rounded shadow bg-indigo-100  border-blue-800 select-none">
        {/* <FcCurrencyExchange className="mr-1" size={45} /> */}
        <span>Register</span>
      </h3>

      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="first_name"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800 rounded shadow bg-indigo-100"
          >
            First name
          </label>
          <input
            type="text"
            name="first_name"
            defaultValue={firstName}
            onChange={(e) =>
              setFormInputs({ ...formInputs, firstName: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your First Name"
            required
          />
        </div>
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="last_name"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800 rounded shadow bg-indigo-100"
          >
            Last name
          </label>

          <input
            type="text"
            name="last_name"
            defaultValue={lastName}
            onChange={(e) =>
              setFormInputs({ ...formInputs, lastName: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Last Name"
            required
          />
        </div>

        {/* name validator */}
        <InputsValidator nameInput={`${firstName} ${lastName}`} />

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="email"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800 rounded shadow bg-indigo-100"
          >
            Email address
          </label>

          <input
            type="email"
            name="email"
            defaultValue={email}
            onChange={(e) =>
              setFormInputs({ ...formInputs, email: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Email Address"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="address"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800 rounded shadow bg-indigo-100"
          >
            Full Address
          </label>

          <input
            type="text"
            name="address"
            defaultValue={address}
            onChange={(e) =>
              setFormInputs({ ...formInputs, address: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Home Address"
            required
          />
        </div>
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="password"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800 rounded shadow bg-indigo-100"
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            defaultValue={password}
            onChange={(e) =>
              setFormInputs({ ...formInputs, password: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type A Strong Password"
            required
          />
        </div>
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="repeat_password"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800 rounded shadow bg-indigo-100"
          >
            Confirm password
          </label>

          <input
            type="password"
            name="repeat_password"
            defaultValue={repeatPassword}
            onChange={(e) =>
              setFormInputs({ ...formInputs, repeatPassword: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Repeat Password"
            required
          />
        </div>

        {/* password validator */}
        <InputsValidator passwordInput={password} />

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="phone"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800 rounded shadow bg-indigo-100"
          >
            Phone Number:
          </label>

          <input
            type="tel"
            name="phone"
            id="phone"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={phone}
            onChange={handlePhoneChange} 
            placeholder="Type Your Mobile Number"
            maxLength='10'
            required
          />

        </div>

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="postal"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800  border-blue-800 rounded shadow bg-indigo-100"
          >
            Postal Code Ex:-(12345)
          </label>
          
          <input
            type="text"
            name="postal"
            id="postal"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={postCode}
            onChange={handlePostalChange}
            maxLength="5"  // HTML attribute to ensure no more than 5 characters can be entered
            placeholder="Type Your Postal Code"
            required
          />
          <div className="mb-6 text-center">
          <label
            htmlFor="role"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 text-left  border-blue-800 rounded shadow bg-indigo-100"
          >
            Choose Role
          </label>

          <select
            name="role"
            id="role"
            className="my-2 mx-auto p-2 rounded bg-indigo-800 text-white  font-bold"
            value={role}
            onChange={(e) =>
              setFormInputs({ ...formInputs, role: e.target.value })
            }
          >
            <option>Select Option</option>
            <option value={"merchant"}>Merchant</option>
            <option value={"user"}>User</option>
            
          </select>
        </div>

        </div>

        {/*Request Status and Errors*/}
        {(isError || isSuccess) && (
          <MessagesContainer
            msg={msg}
            isSuccess={isSuccess}
            isError={isError}
          />
        )}

        {/*form button */}
        <FormButton
          text={{ loading: "Processing", default: "Register" }}
          isLoading={isLoading}
          // icon={<TiUserAdd className="mb-[-2px] ml-1" size={27} />}
        />
      </form>
      <p className="text-gray-800 mt-6 text-center">
        Already a Customer?
        <Link
          to="/login"
          className="mx-2 text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

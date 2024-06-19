import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://ebank-2t3r.onrender.com/api/account/"
    : "http://localhost:5001/api/account/";

//Get Account
const getAccount = async (payload) => {
  const res = await axios.get(API_URL + payload.accountId, {
    headers: {
      authorization: `Bearer ${payload.token}`,
    },
  });
  const data = res.data;

  return data;
};

//Transfer Balance
const transfer = async (payload) => {
  const res = await axios.put(
    API_URL + "/transfer/" + `${payload.from}/` + payload.to,
    payload,
    {
      headers: {
        authorization: `Bearer ${payload.token}`,
      },
    }
  );
  const data = res.data;

  return data;
};

//Deposit
const deposit = async (payload) => {
  const res = await axios.put(
    API_URL + "deposit/" + payload.accountId,
    payload,
    {
      headers: {
        authorization: `Bearer ${payload.token}`,
      },
    }
  );
  const data = res.data;

  return data;
};

//Withdraw
const withdraw = async (payload) => {
  const res = await axios.put(
    API_URL + "withdraw/" + payload.accountId,
    payload,
    {
      headers: {
        authorization: `Bearer ${payload.token}`,
      },
    }
  );
  const data = res.data;

  return data;
};

const sendOtp = async ({ accountId, email, token }) => {
  const response = await axios.post(API_URL + "send-otp", { accountId, email }, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

const verifyOtp = async ({ accountId, otp, token }) => {
  const response = await axios.post(API_URL + "verify-otp", { accountId, otp }, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};


//Logout
const accountLogout = () => {
  return;
};

const accountServices = {
  getAccount,
  transfer,
  deposit,
  withdraw,
  accountLogout,
  sendOtp,
  verifyOtp,
};

export default accountServices;

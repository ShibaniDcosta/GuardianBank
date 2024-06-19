import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import accountServices from "./accountServices";

const initialState = {
  account: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

//Get Account
export const getAccount = createAsyncThunk(
  "user/getAccount",
  async (payload, thunkAPI) => {
    try {
      return await accountServices.getAccount(payload);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//transfer Balance
export const transfer = createAsyncThunk(
  "user/transfer",
  async (payload, thunkAPI) => {
    try {
      return await accountServices.transfer(payload);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//deposit Balance
export const deposit = createAsyncThunk(
  "user/deposit",
  async (payload, thunkAPI) => {
    try {
      return await accountServices.deposit(payload);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//withdraw Balance
export const withdraw = createAsyncThunk(
  "user/withdraw",
  async (payload, thunkAPI) => {
    try {
      return await accountServices.withdraw(payload);
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add new async thunks for OTP
export const sendOtp = createAsyncThunk("user/sendOtp", async (payload, thunkAPI) => {
  try {
    const response = await accountServices.sendOtp(payload);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const verifyOtp = createAsyncThunk("user/verifyOtp", async (payload, thunkAPI) => {
  try {
    const response = await accountServices.verifyOtp(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


//Logout
export const accountLogout = createAsyncThunk("account/logout", async () => {
  accountServices.accountLogout();
});

export const accountSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    resetAccountStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccount.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.account = action.payload;
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(transfer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(transfer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.account = action.payload;
      })
      .addCase(transfer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.account = action.payload;
      })
      .addCase(deposit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(withdraw.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(withdraw.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.account = action.payload;
      })
      .addCase(withdraw.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(accountLogout.fulfilled, (state) => {
        state.account = null;
      })
      .addCase(sendOtp.pending, (state) => { 
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.isOtpVerified = false;
      })
      .addCase(sendOtp.fulfilled, (state) => { 
        state.isLoading = false;
        state.isSuccess = true;
        state.otpSent = true; // OTP has been sent
        state.message = "OTP has been sent to your email.";
      }).addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.otpSent = false; // Failed to send OTP
        state.message = action.payload || "Failed to send OTP.";
      })
      .addCase(verifyOtp.fulfilled, (state) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "OTP verified, please proceed.";
          state.isOtpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "OTP verification failed.";
        state.isOtpVerified = false;
      });
  },
});

export const { resetAccountStatus } = accountSlice.actions;

export default accountSlice.reducer;

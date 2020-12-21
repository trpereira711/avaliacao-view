import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/api";

export const autenticar = createAsyncThunk("auth", async login => {
  try {
    const res = await api.post("/v1/auth", login);
    return {
      data: res.data,
      status: res.status
    };
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status
    };
  }
});

const authSlice = createSlice({
  name: "login",
  initialState: {
    data: "",
    status: ""
  },
  extraReducers: {
    [autenticar.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      state.data = data;
      state.status = status;
    },
    [autenticar.rejected]: (state, action) => {
      state.error = action.error;
    }
  }
});

const { reducer } = authSlice;

export default reducer;

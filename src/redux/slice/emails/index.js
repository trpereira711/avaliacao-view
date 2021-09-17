import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/api";

/** */
export const excluirEmail = createAsyncThunk("email/excluir", async id => {
  try {
    const res = await api.delete(`/v1/emails/${id}`);
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

const emailSlice = createSlice({
  name: "emails",
  initialState: {
    data: "",
    status: ""
  },
  extraReducers: {
    [excluirEmail.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      state.data = data;
      state.status = status;
    },
    [excluirEmail.rejected]: (state, action) => {
      state.error = action.error;
    }
  }
});

const { reducer } = emailSlice;

export default reducer;

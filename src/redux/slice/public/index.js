import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicAPI } from "../../../services/api";

/**  */
export const buscarPorCep = createAsyncThunk(
  "public/buscarPorCep",
  async cep => {
    try {
      const res = await publicAPI.get(`https://viacep.com.br/ws/${cep}/json`);
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
  }
);

const publicSlice = createSlice({
  name: "public",
  initialState: {
    data: "",
    status: ""
  },
  extraReducers: {
    [buscarPorCep.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      state.data = data;
      state.status = status;
    },
    [buscarPorCep.rejected]: (state, action) => {
      state.error = action.error;
    }
  }
});

const { reducer } = publicSlice;

export default reducer;

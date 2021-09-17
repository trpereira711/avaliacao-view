import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/api";

/** */
export const excluirTelefone = createAsyncThunk(
  "telefone/excluir",
  async id => {
    try {
      const res = await api.delete(`/v1/telefones/${id}`);
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

const telefoneSlice = createSlice({
  name: "telefones",
  initialState: {
    data: "",
    status: ""
  },
  extraReducers: {
    [excluirTelefone.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      state.data = data;
      state.status = status;
    },
    [excluirTelefone.rejected]: (state, action) => {
      state.error = action.error;
    }
  }
});

const { reducer } = telefoneSlice;

export default reducer;

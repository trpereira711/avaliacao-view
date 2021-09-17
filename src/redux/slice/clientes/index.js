import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/api";

/**  */
export const buscar = createAsyncThunk("cliente/buscar", async () => {
  try {
    const res = await api.get("/v1/clientes");
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

/** */
export const cadastrar = createAsyncThunk(
  "cliente/cadastrar",
  async cliente => {
    try {
      const res = await api.post("/v1/clientes", cliente);
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

/** */
export const atualizar = createAsyncThunk(
  "cliente/atualizar",
  async cliente => {
    try {
      const res = await api.put(`/v1/clientes/${cliente.id}`, cliente);
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

/** */
export const excluir = createAsyncThunk("cliente/excluir", async id => {
  try {
    const res = await api.delete(`/v1/clientes/${id}`);
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

const clienteSlice = createSlice({
  name: "clientes",
  initialState: {
    data: "",
    status: ""
  },
  extraReducers: {
    [buscar.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      state.data = data;
      state.status = status;
    },
    [buscar.rejected]: (state, action) => {
      state.error = action.error;
    },
    [cadastrar.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      state.data = data;
      state.status = status;
    },
    [cadastrar.rejected]: (state, action) => {
      state.error = action.error;
    },
    [atualizar.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      state.data = data;
      state.status = status;
    },
    [atualizar.rejected]: (state, action) => {
      state.error = action.error;
    },
    [excluir.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      state.data = data;
      state.status = status;
    },
    [excluir.rejected]: (state, action) => {
      state.error = action.error;
    }
  }
});

const { reducer } = clienteSlice;

export default reducer;

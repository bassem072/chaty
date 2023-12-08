import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  googleService,
  facebookService,
  loginService,
  registerService,
  verifyEmailService,
} from "../services/auth.service";
import { removeToken, removeUser, setToken, setUser } from "../utils/storage";
import { setMessage } from "./message";
import { logoutService, profileService } from "../services/profile.service";

export const register = createAsyncThunk(
  "/register",
  async (userData, thunkAPI) => {
    try {
      const { token, data } = await registerService(userData);
      setToken(token);
      setUser(data);
      return { user: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("/login", async (userData, thunkAPI) => {
  try {
    const { token, data } = await loginService(userData);
    setToken(token);
    setUser(data);
    return { user: data };
  } catch (error) {
    let message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const googleLogin = createAsyncThunk("/google", async (_, thunkAPI) => {
  try {
    const { token, data } = await googleService();
    setToken(token);
    setUser(data);
    return { user: data };
  } catch (error) {
    let message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const facebookLogin = createAsyncThunk(
  "/facebook",
  async (_, thunkAPI) => {
    try {
      const { token, data } = await facebookService();
      setToken(token);
      setUser(data);
      return { user: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profile = createAsyncThunk("/profile", async (_, thunkAPI) => {
  try {
    const { data } = await profileService();
    setUser(data);
    return { user: data };
  } catch (error) {
    let message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("/logout", async (_, thunkAPI) => {
  try {
    await logoutService();
    removeToken();
    removeUser();
    return { user: null };
  } catch (error) {
    let message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const verifyEmail = createAsyncThunk(
  "/verifyEmail",
  async ({ id, token }, thunkAPI) => {
    try {
      const { data } = await verifyEmailService({ id, token });

      return { user: data };
    } catch (error) {
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  isRegister: false,
  isAuthenticated: false,
  user: localStorage.getItem("user"),
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeRegister: (state, action) => {
      state.isRegister = action.payload;
    },
    remove: (state, action) => {
      removeToken();
      removeUser();
      state.user = null;
      state.isAuthenticated = false;
      state.isRegister = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLogin.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(facebookLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(facebookLogin.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(facebookLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(profile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profile.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
      });
  },
});

export const { changeRegister, remove } = auth.actions;

export default auth.reducer;

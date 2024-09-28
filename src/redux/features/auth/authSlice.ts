import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isSignIn: boolean;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    userName: string;
    passWord: string;
  };
}

const initialState: AuthState = {
  isSignIn: false,
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    passWord: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleSignIn: (state: AuthState) => {
      state.isSignIn = !state.isSignIn;
    },
    setFormData: (state: AuthState, action: PayloadAction<Partial<AuthState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { toggleSignIn, setFormData } = authSlice.actions;

export default authSlice.reducer;

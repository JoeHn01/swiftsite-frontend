import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isSignIn: boolean;
  showPassword: boolean;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const initialState: AuthState = {
  isSignIn: false,
  showPassword: false,
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleSignIn: (state) => {
      state.isSignIn = !state.isSignIn;
    },
    togglePasswordVisibility: (state) => {
      state.showPassword = !state.showPassword;
    },
    setFormData: (state, action: PayloadAction<Partial<AuthState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { toggleSignIn, togglePasswordVisibility, setFormData } = authSlice.actions;

export default authSlice.reducer;

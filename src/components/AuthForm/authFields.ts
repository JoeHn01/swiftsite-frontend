import * as Yup from 'yup';

export const signInFields = [
  { label: 'User Name', type: 'text', id: 'userName', name: 'userName', required: true },
  { label: 'Password', type: 'password', id: 'password', name: 'password', required: true },
];

export const signInValidationSchema = Yup.object().shape({
  userName: Yup.string().required('User Name is required'),
  password: Yup.string().required('Password is required'),
});

export const signUpFields = [
  { label: 'First Name', type: 'text', id: 'firstName', name: 'firstName', required: true },
  { label: 'Last Name', type: 'text', id: 'lastName', name: 'lastName', required: true },
  { label: 'Email', type: 'email', id: 'email', name: 'email', required: true },
  { label: 'Password', type: 'password', id: 'passWord', name: 'passWord', required: true },
  { label: 'Confirm Password', type: 'password', id: 'confirmPassword', name: 'confirmPassword', required: true },
];

export const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  username: Yup.string().required('User Name is required'),
  passWord: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

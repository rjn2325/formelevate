import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import model from "./model"
import initialState from './form';

// import PhoneInput from 'react-phone-number-input';

const StepOneForm: React.FC = () => {
  const dispatch = useDispatch();
//   const formState = useSelector((state: model) => state.form);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phoneNumber: Yup.string()
        .required('Phone number is required'),
    }),
    onSubmit: (values) => {
      // Dispatch the form values to Redux
    //   dispatch(updateForm(values));
      alert('Form data saved to Redux!');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className={`w-full p-2 border rounded ${
            formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`w-full p-2 border rounded ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>
{/* 
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
          Phone Number
        </label>
        <PhoneInput
          id="phoneNumber"
          defaultCountry="US"
          value={formik.values.phoneNumber}
          onChange={(value) => formik.setFieldValue('phoneNumber', value)}
          className={`w-full p-2 border rounded ${
            formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
        )}
      </div> */}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Save
      </button>
    </form>
  );
};

export default StepOneForm;

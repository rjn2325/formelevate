import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import model from "./model"
import initialState  from './form';


const StepTwoForm: React.FC = () => {
  const dispatch = useDispatch();
  // const initialState = useSelector((state: model) => state.form);

  const formik = useFormik({
    initialValues: {
      addressLine1: initialState.addressLine1,
      addressLine2: initialState.addressLine2,
      state: initialState.state,
      city: initialState.city,
      country: initialState.country,
      pincode: initialState.pincode,
    },
    validationSchema: Yup.object({
      addressLine1: Yup.string().required('Address Line 1 is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      pincode: Yup.string()
        .required('Pincode is required')
        .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
    }),
    onSubmit: (values) => {
      // Dispatch the form values to Redux
    //   dispatch(updateForm(values));
      alert('Address data saved to Redux!');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="addressLine1" className="block text-gray-700 font-bold mb-2">
          Address Line 1
        </label>
        <input
          id="addressLine1"
          name="addressLine1"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.addressLine1}
          className={`w-full p-2 border rounded ${
            formik.touched.addressLine1 && formik.errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.addressLine1 && formik.errors.addressLine1 && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.addressLine1}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="addressLine2" className="block text-gray-700 font-bold mb-2">
          Address Line 2
        </label>
        <input
          id="addressLine2"
          name="addressLine2"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.addressLine2}
          className="w-full p-2 border rounded border-gray-300"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
          State
        </label>
        <input
          id="state"
          name="state"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.state}
          className={`w-full p-2 border rounded ${
            formik.touched.state && formik.errors.state ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.state && formik.errors.state && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          className={`w-full p-2 border rounded ${
            formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.city && formik.errors.city && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 font-bold mb-2">
          Country
        </label>
        <input
          id="country"
          name="country"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
          className={`w-full p-2 border rounded ${
            formik.touched.country && formik.errors.country ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.country && formik.errors.country && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="pincode" className="block text-gray-700 font-bold mb-2">
          Pincode
        </label>
        <input
          id="pincode"
          name="pincode"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pincode}
          className={`w-full p-2 border rounded ${
            formik.touched.pincode && formik.errors.pincode ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formik.touched.pincode && formik.errors.pincode && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.pincode}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Save
      </button>
    </form>
  );
};

export default StepTwoForm;

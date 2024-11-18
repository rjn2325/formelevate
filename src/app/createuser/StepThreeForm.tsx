import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import model from "./model"
import initialState from './form';


const StepThreeForm: React.FC = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string | null>(initialState.uploadedFile);

  const formik = useFormik({
    initialValues: {
      uploadedFile: null as File | null,
    },
    validationSchema: Yup.object({
      uploadedFile: Yup.mixed()
        .required('File is required')
        .test(
          'fileType',
          'Only PDF or PNG files are allowed',
          (value) =>
            !value || (value && ['application/pdf', 'image/png'].includes(value.type))
        ),
    }),
    onSubmit: (values) => {
      const file = values.uploadedFile;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
        //   dispatch(updateForm({ uploadedFile: base64 }));
          alert('File uploaded successfully and saved to Redux!');
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue('uploadedFile', file);

      // Preview the image if it's a PNG file
      if (file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="uploadedFile" className="block text-gray-700 font-bold mb-2">
          Upload File (PDF or PNG)
        </label>
        <input
          id="uploadedFile"
          name="uploadedFile"
          type="file"
          accept=".pdf,.png"
          onChange={handleFileChange}
          className="w-full p-2 border rounded border-gray-300"
        />
        {formik.touched.uploadedFile && formik.errors.uploadedFile && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.uploadedFile}</p>
        )}
      </div>

      {preview && (
        <div className="mb-4">
          <p className="text-gray-700 font-bold mb-2">Preview:</p>
          <img src={preview} alt="Uploaded Preview" className="w-48 h-48 object-cover" />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Save
      </button>
    </form>
  );
};

export default StepThreeForm;

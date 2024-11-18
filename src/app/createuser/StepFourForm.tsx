import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import model from "./model"
import initialState from './form';


const StepFourForm: React.FC = () => {
  const dispatch = useDispatch();
  const [filesPreview, setFilesPreview] = useState<string[]>(initialState.uploadedFiles || []);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: initialState.location.latitude,
    longitude: initialState.location.longitude,
  });

  useEffect(() => {
    if (!location.latitude || !location.longitude) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            // dispatch(updateForm({ location: { latitude, longitude } }));
          },
          (error) => {
            console.error('Error fetching location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [dispatch, location]);

  const formik = useFormik({
    initialValues: {
      uploadedFiles: [] as File[],
    },
    validationSchema: Yup.object({
      uploadedFiles: Yup.array()
        .of(
          Yup.mixed()
            .required('File is required')
            .test(
              'fileType',
              'Only PDF or PNG files are allowed',
              (value) => value && ['application/pdf', 'image/png'].includes(value.type)
            )
        )
        .max(5, 'You can upload up to 5 files only'),
    }),
    onSubmit: (values) => {
      const files = values.uploadedFiles;

      const promises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises)
        .then((base64Files) => {
        //   dispatch(updateForm({ uploadedFiles: base64Files }));
          alert('Files uploaded successfully and saved to Redux!');
        })
        .catch((err) => {
          console.error('Error converting files to base64:', err);
        });
    },
  });

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      const fileArray = Array.from(files);
      formik.setFieldValue('uploadedFiles', fileArray);

      const previews = fileArray
        .filter((file) => file.type === 'image/png')
        .map((file) => URL.createObjectURL(file));
      setFilesPreview(previews);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="uploadedFiles" className="block text-gray-700 font-bold mb-2">
          Upload Files (PDF or PNG, Max 5)
        </label>
        <input
          id="uploadedFiles"
          name="uploadedFiles"
          type="file"
          accept=".pdf,.png"
          multiple
          onChange={handleFilesChange}
          className="w-full p-2 border rounded border-gray-300"
        />
        {formik.touched.uploadedFiles && formik.errors.uploadedFiles && (
          <p className="text-red-500 text-sm mt-1">{formik?.errors?.uploadedFiles}</p>
        )}
      </div>

      {filesPreview.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-700 font-bold mb-2">Image Previews:</p>
          <div className="flex gap-2">
            {filesPreview.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index}`} className="w-16 h-16 object-cover" />
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <p className="text-gray-700 font-bold mb-2">Your Location:</p>
        {location.latitude && location.longitude ? (
          <p className="text-gray-700">
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        ) : (
          <p className="text-gray-700">Fetching your location...</p>
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

export default StepFourForm;

"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "./components/InputBox";
import { emailRegex } from "./utils/utils";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required").matches(emailRegex,'Invalid email address'),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      handleSubmit(values)
    },
  });

  const handleSubmit = async (params:any) => {
// params.type="login"
    try {
      const response:any = await fetch(`/api/callapi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    const data = await response.json();


      if (!response.ok) {
        alert("Email and password not correct please try again.")
      }
      else {
        alert("Login successfully");
        router.replace("/createuser");
      }

      
    
    } catch (error: any) {
        console.error({error});
        
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="javascript:void(0)">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </a>

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign in 
            </h2>
            <form className="mt-8 space-y-4" onSubmit={formik.handleSubmit}>
              {/* Email Input */}
              <div>
                <InputBox
                  label="Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange} // Auto-handled by Formik
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                ) : null}
              </div>

              {/* Password Input */}
              <div>
                <InputBox
                  label="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange} // Auto-handled by Formik
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

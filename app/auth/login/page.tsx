"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormikValues, FormikHelpers } from "formik/dist/types";
import * as Yup from "yup";
import Image from "next/image";
import InputWithError from "@/app/components/InputWithError";
import { SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { toast } from "react-toastify";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
dotenv.config();

export default function Login() {
  const [isSubmit, setIsSubmit] = useState(false);
  const nav = useRouter();
  const SignupValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="hero min-h-screen bg-white">
      <div className=" w-full flex flex-col lg:flex-row-reverse">
        <div className="text-center hidden  lg:flex flex-col w-1/2 lg:text-left">
          <Image
            src={"/svgs/tablet-login-animate.svg"}
            alt={"Login-Animated"}
            width={500}
            height={500}
            className="mx-auto my-auto"
          ></Image>
        </div>
        <div className="lg:w-1/2 w-full h-auto">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupValidation}
            onSubmit={async (values, { resetForm }) => {
              let headersList = {
                Accept: "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json",
              };
              let bodyContent = JSON.stringify({
                password: values.password,
                email: values.email,
              });
              setIsSubmit(true);
              let response = await fetch("/api/post/auth/login", {
                method: "POST",
                body: bodyContent,
                headers: headersList,
              });
              let data = await response.json();
              if (response.status == 200) {
                toast.success(
                  "Logged in as " +
                    data.data.username +
                    ". Redirecting to dashboard"
                );
                resetForm();
                nav.push("/user/dashboard");
                setIsSubmit(false);
              } else if (response.status == 400) {
                toast.error(data.message);
                setIsSubmit(false);
              } else {
                toast.error("Something went wrong. Please try again later.");
                setIsSubmit(false);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="card flex-shrink-0 w-1/2 ml-auto mr-0 max-w-lg shadow-lg bg-white p-4">
                <h2 className="text-3xl font-bold text-center text-base-content">
                  Log In
                </h2>
                <div className="card-body">
                  <InputWithError
                    componentName="email"
                    componentType="text"
                    placeHolder="Email"
                    componentClassName="input input-bordered "
                    classes="text-base text-error"
                    errors={errors.email}
                    touched={touched.email}
                  />

                  <InputWithError
                    componentName="password"
                    componentType="password"
                    placeHolder="Password"
                    componentClassName="input input-bordered "
                    classes="text-base text-error"
                    errors={errors.password}
                    touched={touched.password}
                  />

                  <label className="label">
                    <a
                      href="/auth/login"
                      className="text-base-content link link-hover"
                    >
                      Forgot password?
                    </a>
                  </label>
                  <label className="label">
                    <a
                      href="/auth/signup"
                      className=" text-base-content link link-hover"
                    >
                      No account ? Create one .
                    </a>
                  </label>
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className={`btn ${
                        isSubmit ? "btn-disabled " : "btn-primary"
                      }`}
                    >
                      {
                        <div className="flex items-center justify-center">
                          {isSubmit ? (
                            <>
                              <span className="p-2">Please wait </span>
                              <div className="loading loading-dots loading-md"></div>
                            </>
                          ) : (
                            "Login"
                          )}
                        </div>
                      }
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

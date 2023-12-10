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
    username: Yup.string()
      .min(4, "Username should have atleast 4 Character long.")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password should atleast be 8 character long.")
      .required("Required"),
    repeat_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Repeat Password is required"),
  });

  return (
    <div className="hero min-h-screen font-monst bg-white">
      <div className=" w-full flex flex-col lg:flex-row-reverse">
        <div className="text-center flex flex-col w-1/2 lg:text-left">
          <Image
            src={"/svgs/sign-up-animate.svg"}
            alt={"Login-Animated"}
            width={500}
            height={500}
            className="mx-auto my-auto"
          ></Image>
        </div>
        <div className="w-1/2  h-auto">
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
              repeat_password: "",
            }}
            validationSchema={SignupValidation}
            onSubmit={async (values) => {
              let headersList = {
                Accept: "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json",
              };

              let bodyContent = JSON.stringify({
                username: values.username,
                password: values.password,
                email: values.email,
              });
              setIsSubmit(true);
              let response = await fetch("/api/post/auth/signup", {
                method: "POST",
                body: bodyContent,
                headers: headersList,
              });

              let data = await response.json();
              if (response.status == 200) {
                toast.success(
                  "Account Created Successfully . You can now login to your account."
                );
                setIsSubmit(false);
                nav.push("/auth/login");
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
              <Form className="card flex-shrink-0 w-1/2 ml-auto mr-0 max-w-lg shadow-2xl bg-base-100 p-4">
                <h2 className="text-3xl text-base-content font-bold text-center">
                  Sign Up
                </h2>
                <div className="card-body">
                  <InputWithError
                    componentName="email"
                    componentType="text"
                    placeHolder="Email"
                    componentClassName="input input-bordered"
                    classes="text-xs text-error"
                    errors={errors.email}
                    touched={touched.email}
                  />
                  <InputWithError
                    componentName="username"
                    componentType="text"
                    placeHolder="Username"
                    componentClassName="input input-bordered"
                    classes="text-xs text-error"
                    errors={errors.username}
                    touched={touched.username}
                  />
                  <InputWithError
                    componentName="password"
                    componentType="password"
                    placeHolder="Password"
                    componentClassName="input input-bordered"
                    classes="text-xs text-error"
                    errors={errors.password}
                    touched={touched.password}
                  />
                  <InputWithError
                    componentName="repeat_password"
                    componentType="password"
                    placeHolder="Repeat Password"
                    componentClassName="input input-bordered"
                    classes="text-xs text-error"
                    errors={errors.repeat_password}
                    touched={touched.repeat_password}
                  />
                  {/* Add the TOS and Privacy Policies redirect and actual webpages. */}
                  <p className=" label-text-alt  text-base">
                    By signing up, you agree to our
                    <span> </span>
                    <a href="#" className=" link">
                      Terms of Service
                    </a>
                    <span> </span>
                    and
                    <span> </span>
                    <a href="#" className=" link ">
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <label className="label">
                    <a
                      href="/auth/login"
                      className="label-text-alt link link-hover"
                    >
                      Already have an account? Sign in!
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
                            "Sign Up"
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

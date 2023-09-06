"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormikValues, FormikHelpers } from "formik/dist/types";
import * as Yup from "yup";
import Image from "next/image";
import InputWithError from "@/app/components/InputWithError";
import { SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { toast } from "react-toastify";
dotenv.config();

export default function Login() {
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
    <div className="hero min-h-screen bg-base-200">
      <div className=" w-full flex flex-col lg:flex-row-reverse">
        <div className="text-center flex flex-col w-1/2 lg:text-left">
          {/* <h2 className="text-3xl font-bold text-center">Sign up now!</h2> */}
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

              let response = await fetch(
                "http://localhost:3000/api/post/Auth/SignUp",
                {
                  method: "POST",
                  body: bodyContent,
                  headers: headersList,
                }
              );

              let data = await response.json();
              if (response.status == 200) {
                toast.success(
                  "Account Created Successfully . You can now login to your account."
                );
              } else if (response.status == 400) {
                toast.error(data.message);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="card flex-shrink-0 w-1/2 ml-auto mr-0 max-w-lg shadow-2xl bg-base-100 p-4">
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
                  <p className=" label-text-alt  text-sm">
                    Signing up to this website means you agree to our
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
                    <button type="submit" className={"btn btn-primary"}>
                      Create Account
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

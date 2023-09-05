"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";

/**
 * Returns the sum of two numbers.
 * @componentName {string} - The name of input component.
 * @componentType {string} - The type of input component.
 * @placeHolder {string} - The placeholder of input component.
 * @componentClassName {string} - The className of input component.
 * @classes {string} - The classes for error message.
 * @errors {string} - The errors for error message.
 * @touched {string} - The touched for error message.
 * @returns {JSX.Element} - Rendered InputWithError component.
 */

type Props = {
  componentName: string;
  componentType: string;
  placeHolder: string;
  componentClassName: string;
  classes: string;
  errors: string | undefined;
  touched: undefined | boolean;
};
export default function InputWithError({
  componentName,
  componentType,
  placeHolder,
  componentClassName,
  classes,
  errors,
  touched,
}: Props) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{placeHolder}</span>
      </label>
      <Field
        type={componentType}
        placeholder={placeHolder}
        className={componentClassName}
        name={componentName}
      />
      {errors && touched ? (
        <div className="alert bg-transparent border-none text-error p-[1px] h-auto my-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-2  h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <ErrorMessage
            name={componentName}
            component="div"
            className={classes}
          />
        </div>
      ) : null}
    </div>
  );
}

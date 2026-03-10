import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import React from "react";


export const Arraycountries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Ghana",
  "Nigeria",
  "Kenya",
  "South Africa",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Australia",
  "New Zealand",
  "Japan",
  "India",
  "Brazil",
  "Mexico",
  "United Arab Emirates",
  "Saudi Arabia",
  "Switzerland",
];

type TextProps = {
  data: string;
  text?: string;
  icon?: ReactNode;
};



function TextProps({ data, text, icon }: TextProps) {
  return (
    <div className="relative overflow-hidden border-gray-200 bg-white p-5 shadow-sm">

      {/* subtle accent background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-white to-white opacity-70 pointer-events-none" />

      <div className="relative flex items-start gap-4">

        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
            {icon}
          </div>
        )}

        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            {data}
          </h1>

          {text && (
            <p className="mt-1 text-sm text-gray-500">
              {text}
            </p>
          )}
        </div>

      </div>

      <p className="text-sm text-gray-500">
          Add a new team member and assign the correct role and permissions.
        </p>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  icon: ReactElement;
  error?: string;
  itemVariants?: Variants;
  helperText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const ErrorText = ({ message }: { message?: string }) => {
  return <p className="text-xs text-red-500 font-semibold">{message}</p>;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      icon,
      error,
      itemVariants,
      helperText,
      type = "text",
      required,
      className = "",
      ...rest
    },
    ref,
  ) => {
    return (
      <motion.div variants={itemVariants} className={`space-y-1 ${className}`}>
        <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
          <label className="flex items-center gap-1">
            {label}
            {required && <span className="text-emerald-600">*</span>}
          </label>
        </div>
        <div
          className={`flex items-center gap-3 rounded-xl border px-3 py-2 transition focus-within:border-emerald-500 ${
            error ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"
          }`}
        >
          {React.cloneElement(icon, { size: 18, className: "text-slate-400" })}
          <input
            ref={ref}
            type={type}
            required={required}
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            {...rest}
          />
        </div>
        {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
        <ErrorText message={error} />
      </motion.div>
    );
  },
);

InputField.displayName = "InputField";

export default TextProps;

// FRAMER MOTION PROPS



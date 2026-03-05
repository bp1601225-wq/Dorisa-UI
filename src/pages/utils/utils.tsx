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
    <div className="rounded-2xl border-l-4 border-slate-300 bg-slate-50 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {icon}
        <h1 className="text-3xl font-bold tracking-wide text-slate-900">{data}</h1>
      </div>
      {text && <p className="mt-2 text-sm text-slate-500">{text}</p>}
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



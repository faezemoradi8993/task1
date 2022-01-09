import React from "react";
import { XIcon, CheckIcon } from "@heroicons/react/solid";

function Input({ type, error, success, label, style }) {
  return (
    <div
      className="flex p-3 w-full md:w-1/2 my-5 relative rounded-md border-[1px]  border-blue-300 text-[14px]"
      style={style}
    >
      <label className=" absolute bg-blue-50 -top-5 right-2 p-1 text-blue-800 font-bold">
        {label}
      </label>
      {(() => {
        switch (type) {
          case "text":
            return (
              <input
                className="w-full outline-none bg-transparent text-[12px]"
                type="text"
                dir="rtl"
              />
            );
          case "password":
            return (
              <input
                className="w-full outline-none bg-transparent  text-[12px] "
                type="password"
              />
            );
          case "mobile":
            return (
              <input
                className="w-full outline-none bg-transparent  text-[12px] "
                pattern={/^(\+98|0098|98|0)?9\d{9}$/g}
                maxLength={11}
                type="mobile"
              />
            );

          default:
            return (
              <input
                className="w-full outline-none bg-transparent  text-[12px]"
                type="text"
                dir="rtl"
              />
            );
        }
      })()}
      {error && (
        <span className="text-red-500 text-[10px] absolute right-2 top-full mt-1 flex items-center justify-end ">
          {error}
          <XIcon className="w-3 ml-1" />
        </span>
      )}
      {success && (
        <span className="text-green-500 text-[10px] absolute right-2  top-full mt-1 flex items-center justify-end select-none">
          {success}
          <CheckIcon className="w-3 ml-1" />
        </span>
      )}
    </div>
  );
}

export default Input;

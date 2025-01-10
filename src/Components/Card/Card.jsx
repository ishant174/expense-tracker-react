import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div
      className={`${className} size-full rounded-sm border-solid border-4 border-white p-4 bg-sky-50`}
    >
      {children}
    </div>
  );
};

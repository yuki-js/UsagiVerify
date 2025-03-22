import React from "react";

type Props = React.ComponentProps<"button">;

export const Button = ({ disabled, ...props }: Props) => {
  return (
    <button
      className={`px-8 py-3 rounded-full font-medium shadow-lg transition-all ${
        disabled
          ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-900/30 hover:scale-105"
      }`}
      disabled={disabled}
      {...props}
    />
  );
};

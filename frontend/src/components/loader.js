import React from "react";

const Loader = ({ isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          {/* Loading icon */}
          <svg
            className="animate-spin h-8 w-8 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V2.5A1.5 1.5 0 0113.5 1h-3A1.5 1.5 0 019 2.5V4a8 8 0 014 6.93V5.5A1.5 1.5 0 0011.5 4h-3A1.5 1.5 0 007 5.5v5.43A7.98 7.98 0 014 12zm16 0a8 8 0 01-8 8V21.5A1.5 1.5 0 0110.5 23h3a1.5 1.5 0 011.5-1.5V20a8 8 0 01-4-6.93V18.5A1.5 1.5 0 0014.5 20h3a1.5 1.5 0 001.5-1.5v-5.43A7.98 7.98 0 0120 12z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {/* Checkmark icon */}
          <svg
            className="h-8 w-8 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Loader;

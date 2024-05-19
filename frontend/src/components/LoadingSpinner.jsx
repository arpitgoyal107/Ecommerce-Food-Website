import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex">
          <div className="flex-1 space-y-6 py-1">
            <div className="rounded-full bg-slate-200 h-10 p-12 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

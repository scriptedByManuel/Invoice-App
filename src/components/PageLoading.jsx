import React from 'react';
import { lineSpinner } from 'ldrs';

lineSpinner.register();

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <l-line-spinner
        size="60"
        stroke="4"
        speed="1.2"
        color="#18181B" 
      ></l-line-spinner>
    </div>
  );
};

export default PageLoading;

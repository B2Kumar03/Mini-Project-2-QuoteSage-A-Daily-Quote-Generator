import React from 'react';

const QuoteButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium transition"
    >
      {children}
    </button>
  );
};

export default QuoteButton;

import React from "react";

interface SaveButtonProps {
  onClick: () => void;
  message: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, message }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="mt-4 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
      >
        Save Coordinates
      </button>
      {message && <p className="mt-2 mb-5 text-green-600">{message}</p>}
    </>
  );
};

export default SaveButton;

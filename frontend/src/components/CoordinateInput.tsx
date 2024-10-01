import React from "react";

interface CoordinateInputProps {
  lat: string;
  lng: string;
  onLatChange: (value: string) => void;
  onLngChange: (value: string) => void;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({
  lat,
  lng,
  onLatChange,
  onLngChange,
}) => {
  return (
    <div className="bg-white w-1/2 self-center p-6 shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Latitude (DD):
        </label>
        <input
          title="latitude"
          placeholder="Ex. 15.3072"
          type="number"
          value={lat}
          onChange={(e) => onLatChange(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Longitude (DD):
        </label>
        <input
          title="longitude"
          placeholder="Ex. 120.9464"
          type="number"
          value={lng}
          onChange={(e) => onLngChange(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
    </div>
  );
};

export default CoordinateInput;

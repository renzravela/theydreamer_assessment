import React from "react";

interface ConvertedCoordinatesProps {
  convertedLat: string | number;
  convertedLng: string | number;
}

const ConvertedCoordinates: React.FC<ConvertedCoordinatesProps> = ({
  convertedLat,
  convertedLng,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">
        Converted Coordinates (DMS):
      </h2>
      <p>{`Latitude: ${convertedLat}, Longitude: ${convertedLng}`}</p>
    </div>
  );
};

export default ConvertedCoordinates;

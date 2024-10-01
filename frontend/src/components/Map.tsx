import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface MapProps {
  markerPosition: { lat: number; lng: number };
}

const Map: React.FC<MapProps> = ({ markerPosition }) => {
  return (
    <div className="mt-4">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "300px" }}
        zoom={12}
        center={markerPosition}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
};

export default Map;

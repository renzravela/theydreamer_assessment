import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { saveCoords } from "./api";
import Map from "./components/Map";

const defaultCenter = { lat: 14.5547, lng: 121.0449 }; // Default coords of West Rembo, Makati City

interface ConvertedCoords {
  convertedLat: number | string;
  convertedLng: number | string;
}

const App = () => {
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [convertedCoords, setConvertedCoords] = useState<ConvertedCoords>({
    convertedLat: "",
    convertedLng: "",
  });
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  }>(defaultCenter);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCKwIhOiRGBl6m1wFE5KE8aB6WokyV6Nso",
  });

  const convertToDMS = (dd: number, isLat: boolean) => {
    const absolute = Math.abs(dd);
    const degrees = Math.floor(absolute);
    const minutes = Math.floor((absolute - degrees) * 60);
    const seconds = Math.floor(((absolute - degrees) * 60 - minutes) * 60);
    const direction = dd >= 0 ? (isLat ? "N" : "E") : isLat ? "S" : "W";
    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  };

  const handleConvert = () => {
    if (lat && lng) {
      const convertedLat = convertToDMS(parseFloat(lat), true);
      const convertedLng = convertToDMS(parseFloat(lng), false);
      setConvertedCoords({
        convertedLat: convertedLat,
        convertedLng: convertedLng,
      });
      setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter valid latitude and longitude.");
      setIsErrorVisible(true);
      setTimeout(() => setIsErrorVisible(false), 3000);
    }
  };

  const saveCoordsToDB = async () => {
    if (
      convertedCoords.convertedLat === "" &&
      convertedCoords.convertedLng === ""
    ) {
      setMessage("Coordinate empty; please convert first and then save.");
      setIsMessageVisible(true);
      setTimeout(() => setIsMessageVisible(false), 3000);
    } else {
      try {
        const latitude = convertedCoords.convertedLat;
        const longitude = convertedCoords.convertedLng;
        const response = await saveCoords({ lat: latitude, lng: longitude });
        setMessage(response.message);
        setIsMessageVisible(true);
        setTimeout(() => setIsMessageVisible(false), 3000);
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
        setIsMessageVisible(true);
        setTimeout(() => setIsMessageVisible(false), 3000);
      }
    }
  };

  return (
    <div className="bg-container flex flex-1 flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-3xl font-bold mb-2">Coordinates Converter</h1>
      <div className="p-6 w-2/4 flex flex-col">
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
              onChange={(e) => setLat(e.target.value)}
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
              onChange={(e) => setLng(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          {isErrorVisible && (
            <p className={`text-red-600 text-center transition-opacity duration-300 ${isErrorVisible ? "opacity-100" : "opacity-0"}`}>
              {errorMessage}
            </p>
          )}
          <button
            onClick={handleConvert}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Convert Coords
          </button>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">
              Converted Coordinates (DMS):
            </h2>
            <p>{`Latitude: ${convertedCoords.convertedLat}, Longitude: ${convertedCoords.convertedLng}`}</p>
          </div>
          <button
            onClick={saveCoordsToDB}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            Save Coordinates
          </button>
          {isMessageVisible && message && (
            <p className={`mt-2 mb-5 text-slate-600 text-center transition-opacity duration-300 ${isMessageVisible ? "opacity-100" : "opacity-0"}`}>
              {message}
            </p>
          )}
        </div>

        {isLoaded && <Map markerPosition={markerPosition} />}
      </div>
    </div>
  );
};

export default App;

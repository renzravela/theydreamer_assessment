const URL = "http://localhost:3000";

interface Coordinates {
  lat: number | string;
  lng: number | string;
}

interface SaveCoordsResponse {
  message: string;
  data?: any;
}

export const saveCoords = async (coords: Coordinates): Promise<SaveCoordsResponse> => {
  try {
    const response = await fetch(`${URL}/api/save-coords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(coords), // Convert the coords object to a JSON string
    });

    if (!response.ok) {
      // Handle errors based on the response status
      const errorData = await response.json();
      throw new Error(errorData.message || "An unknown error occurred.");
    }

    const data = await response.json();
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      message: errorMessage,
    };
  }
};

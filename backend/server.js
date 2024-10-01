const express = require("express");
const cors = require("cors");
const connect = require("./connect");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/check", (req, res) => {
  res.status(200).send("Server is healthy.");
});

app.post("/api/save-coords", async (request, response) => {
  try {
    const { lat, lng } = request.body; 
    if (!lat || !lng) {
      return response.status(400).json({ message: "Latitude and Longitude are required." });
    }
    const db = connect.getDB();
    const collection = db.collection('coords_data');
    await collection.insertOne({
      lat,
      lng,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return response.status(200).json({
      message: "Coordinates saved successfully.",
      data: { lat, lng } 
    });
  } catch (error) {
    console.error("Error saving coordinates:", error);
    return response.status(500).json({ message: "Failed to save coordinates." });
  }
});

const startServer = async () => {
  try {
    await connect.connectToServer();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

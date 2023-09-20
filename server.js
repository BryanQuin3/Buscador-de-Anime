import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors"; // Importa la biblioteca cors
const app = express();
const port = 3000;

app.use(json());

// Configura CORS para permitir solicitudes desde http://127.0.0.1:5500
app.use(cors({ origin: "http://127.0.0.1:5500" }));

app.get("/search", async (req, res) => {
  const animeName = req.query.animeName;
  const apiUrl = `https://myanimelist.net/search/prefix.json?type=anime&keyword=${animeName}&v=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en la solicitud al servidor proxy." });
  }
});

app.listen(port, () => {
  console.log(`Servidor proxy en ejecución en http://localhost:${port}`);
});

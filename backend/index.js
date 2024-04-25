import express  from "express"
import cors  from "cors"
import { runChat }  from "./api.js"


const app = express()

app.use(cors({
    credentials:true,
    origin: "http://localhost:5173"
}))

app.use(express.json())


app.post("/fetch", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: false,
      message: "Please provide a name in the request body.",
    });
  }

  try {
    const chatResponse = await runChat(name);
    res.json(chatResponse);
  } catch (error) {
    console.error(error); 
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
});

app.listen(3000)
import express from "express";
import cors from "cors";
import { generateTimeline } from ".";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    message: "OK",
    date: new Date().toLocaleDateString(),
  });
});

app.post("/chat", async (req, res) => {
  const query: string = req.body.query;
  try {
    if (!query) {
      return res.status(401).json({
        payload: null,
        message: "Query is required",
        success: false,
      });
    }
    const result = await generateTimeline(query);
    console.log("result", result)
    if (result) {
      return res.status(200).json({
        payload: result,
        message: "✅ generated timeline successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        payload: "Sorry, couldn't generated timeline data. Please try again 😇",
        message: "✅ generated timeline successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log("❌ error while generating timeline", error);
    return res.status(500).json({
      payload: null,
      message: "❌ Internal server error",
      success: false,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

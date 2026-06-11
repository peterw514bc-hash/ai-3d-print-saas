import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI 3D API running");
});

app.post("/api/recommend", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "你是3D列印材料專家" },
          {
            role: "user",
            content: `
需求：${prompt}

請輸出 JSON：
{
 "strong": {"material":"","reason":"","limit":""},
 "balanced": {"material":"","reason":"","suggestion":""},
 "cheap": {"material":"","reason":"","limit":""}
}
`,
          },
        ],
      }),
    });

    const data = await response.json();
    res.json({ result: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(10000, () => console.log("Server running"));

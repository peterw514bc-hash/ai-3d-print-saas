import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("https://你的Render網址/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResult(JSON.parse(data.result));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>3D列印 AI 助手</h1>

      <textarea
        style={{ width: "100%", height: 100 }}
        placeholder="輸入用途..."
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit}>分析</button>

      {result && (
        <div style={{ display: "flex", gap: 20 }}>
          <div>
            <h2>強度優先</h2>
            <p>{result.strong.material}</p>
          </div>

          <div>
            <h2>性價比</h2>
            <p>{result.balanced.material}</p>
          </div>

          <div>
            <h2>最低成本</h2>
            <p>{result.cheap.material}</p>
          </div>
        </div>
      )}
    </div>
  );
}

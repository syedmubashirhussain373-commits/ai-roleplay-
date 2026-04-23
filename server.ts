import express from "express";
import path from "path";
import Bytez from "bytez.js";
import { createServer as createViteServer } from "vite";
import { OMNI_CHRONICLER_SYSTEM_PROMPT } from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Bytez SDK Setup (Hidden Server-Side)
  // Using the key provided: f9eaa0aa44e92254f8572ea7405fe7c3
  const key = process.env.BYTEZ_API_KEY || "f9eaa0aa44e92254f8572ea7405fe7c3";
  const sdk = new Bytez(key);
  const modelId = "openai/gpt-4o"; 

  // API Routes
  app.post("/api/chat", async (req, res) => {
    const { messages, character } = req.body;
    
    const contextMessages = [
      { role: "user", content: `System Instruction: ${OMNI_CHRONICLER_SYSTEM_PROMPT}\n\nCharacter Context: ${JSON.stringify(character)}` },
      { role: "assistant", content: "I am the Omni-Chronicler. Aethelgard is ready for your story." },
      ...messages
    ];

    try {
      const model = sdk.model(modelId);
      const { output, error } = await model.run(contextMessages);

      if (error) {
        return res.status(500).json({ error });
      }

      const text = typeof output === 'string' ? output : output?.[0]?.content || "Flux disruption detected.";
      res.json({ content: text });
    } catch (err) {
      res.status(500).json({ error: "High-Aetheric latency. Check Bytez quota." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aethelgard Engine running on http://localhost:${PORT}`);
  });
}

startServer();

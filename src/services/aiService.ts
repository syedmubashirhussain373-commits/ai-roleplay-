import Bytez from "bytez.js";
import { AETHELGARD_LORE, CharacterSheet } from "../constants";

// Using the key provided in the request
const key = import.meta.env.VITE_BYTEZ_API_KEY || "f9eaa0aa44e92254f8572ea7405fe7c3";
const sdk = new Bytez(key);

// Using gemma-1.1-7b-it to bypass OpenAI-specific quota limits while maintaining high performance
const model = sdk.model("google/gemma-1.1-7b-it");

export async function startStory(character: CharacterSheet) {
  const prompt = `
    ${AETHELGARD_LORE}
    
    INITIALIZATION PROTOCOL:
    Character Provided:
    Name: ${character.name}
    Status: ${character.socialStatus}
    Life: ${character.lifeHistory}
    Power (The Spark): ${character.spark}
    
    Please provide the "Cold Open" scene in a high-tension environment as per protocol. 
    Remember to end with a choice.
  `;

  try {
    const { output, error } = await model.run([
      {
        "role": "user",
        "content": prompt
      }
    ]);

    if (error) {
      console.error("Bytez API Error:", error);
      return "The aetheric flux is unstable. (Error: " + JSON.stringify(error) + ")";
    }

    return typeof output === 'string' ? output : output?.[0]?.content || JSON.stringify(output);
  } catch (err) {
    console.error("SDK Error:", err);
    return "Experimental Flux Conduits failed. Please check your API key.";
  }
}

export async function continueStory(history: any[], userInput: string) {
  // Convert history format if needed, assuming the SDK expects an array of {role, content}
  const messages = history.map(h => ({
    role: h.role === 'model' ? 'assistant' : h.role,
    content: h.parts?.[0]?.text || h.content || ""
  }));

  // Ensure system instruction is included if the model doesn't support separate system roles well
  if (messages.length > 0 && messages[0].role !== 'system') {
    messages.unshift({ role: 'user', content: `System Instructions: ${AETHELGARD_LORE}` });
    messages.push({ role: 'assistant', content: "Understood. I will narrate the world of Aethelgard according to the laws of Aetheric Chemistry." });
  }

  messages.push({ role: 'user', content: userInput });

  try {
    const { output, error } = await model.run(messages);

    if (error) {
      console.error("Bytez API Error:", error);
      throw new Error(JSON.stringify(error));
    }

    return typeof output === 'string' ? output : output?.[0]?.content || JSON.stringify(output);
  } catch (err) {
    console.error("SDK Error:", err);
    throw err;
  }
}

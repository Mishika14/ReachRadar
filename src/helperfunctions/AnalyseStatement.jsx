import { OpenAI } from "openai";
import { apiKey1 } from "./APIexport";

const client = new OpenAI({
  baseURL: "https://api-inference.huggingface.co/v1/",
  apiKey: apiKey1,
  dangerouslyAllowBrowser: true 
});

// Helper function to analyze sentiment from text
export const analyzeSentiment = async (text) => {
  let out = "";

  try {
    const stream = await client.chat.completions.create({
      model: "google/gemma-2-2b-it", // The model to use for completion
      messages: [
        {
          role: "user",
          content: `Analyze the sentiment of the input text and return only one word as an answer from the following responses: 
(POSITIVE, NEGATIVE, NEUTRAL) Note: No phrases or sentences should be returned. The input text is as follows: "${text}"`
        }
      ],
      max_tokens: 10, // Limit tokens as only one word is expected
      stream: true
    });

    // Stream the response and process each chunk of the output
    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        out += newContent.trim();  // Accumulate the output and trim whitespace
      }
    }

    // Return the sentiment as a single word
    return out.toUpperCase(); // Standardize the output as uppercase
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "Error analyzing sentiment";
  }
};

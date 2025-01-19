import { OpenAI } from "openai";
import { apiKey1 } from "./APIexport";

const client = new OpenAI({
  baseURL: "https://api-inference.huggingface.co/v1/",
  apiKey: apiKey1,
  dangerouslyAllowBrowser: true 
});

// Helper function to generate hashtags from text
export const generateHashtags = async (text) => {
  let out = "";

  try {
    const stream = await client.chat.completions.create({
      model: "google/gemma-2-2b-it", // The model to use for completion
      messages: [
        {
          role: "user",
          content: `Extract relevant hashtags from the following text to maximize social media engagement. Return only hashtags, separated by spaces. Here is the input text: "${text}"`
        }
      ],
      max_tokens: 500,
      stream: true
    });

    // Stream the response and process each chunk of the output
    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        out += newContent;  // Accumulate the output
      }
    }

    // Once streaming is done, process the accumulated output
    const hashtags = extractHashtags(out);
    return hashtags;  // Return the hashtags as a string with spaces
  } catch (error) {
    console.error("Error generating hashtags:", error);
    return "Error generating hashtags";
  }
};

// Function to extract hashtags from the model's output
const extractHashtags = (text) => {
  const regex = /#\w+/g;
  const matches = text.match(regex);
  
  // If hashtags are found, join them by spaces, else return an empty string
  return matches ? matches.join(" ") : "No hashtags found";
};

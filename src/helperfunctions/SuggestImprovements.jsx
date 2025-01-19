import { OpenAI } from "openai";
import { Stream } from "openai/streaming.mjs";
import { apiKey2 } from "./APIexport";


const client = new OpenAI({
  baseURL: "https://api-inference.huggingface.co/v1/",
  apiKey: apiKey2,
  dangerouslyAllowBrowser: true,
});

// Helper function to clean up text and remove unwanted characters
const cleanText = (text) => {
  // Remove HTML tags and unwanted markdown syntax
  return text
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .replace(/[*_`~]/g, "")  // Remove markdown syntax
    .replace(/#\S+/g, "") // Remove hashtags
    .replace(/[0-9]/g, "") // Remove digits
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space.trim
    .replace(/['"()]/g, '')
    .trim();
};

// Helper function to suggest improvements for a social media post
export const suggestPostImprovements = async (text) => {
  let suggestions = [];

  try {
    const stream = await client.chat.completions.create({
      model: "google/gemma-2-2b-it",
      messages: [
        {
          role: "user",
          content: `Analyze the following social media content and suggest specific improvements to maximize user engagement, reach, and impact. Focus on aspects such as tone, formatting, and content relevance. Exclude any suggestions related to hashtags. Provide the output as a plain string. The first sentence should be the heading like 'You can improve your post in the following ways,' followed by individual points on how to improve the content also there should be no : symbol : "${text}"`,
        },
      ],
      max_tokens: 500,
      stream: true,
    });

    // Handle the streaming response
    let contentBuffer = ""; // To accumulate the content as we receive it
    for await (const part of stream) {
      if (part.choices && part.choices[0]?.delta?.content) {
        const content = cleanText(part.choices[0].delta.content);
        contentBuffer += content + " "; // Accumulate content with space

        // Check if we have reached a full stop
        if (contentBuffer.includes('.')) {
          // Split the accumulated content by full stops and update the array
          const sentences = contentBuffer.split('.').map((sentence) => sentence.trim()).filter((sentence) => sentence.length > 0);
          suggestions.push(...sentences);

          // Reset buffer for the next chunk
          contentBuffer = "";
        }
      }
    }
  } catch (error) {
    console.error("Error suggesting post improvements:", error);
    return "Error generating suggestions";
  }
  // const dummy = [
  //       [
  //         'You can improve your post in the following ways :',
  //         `Add context or a story: Instead of just saying "I love mountains", tell a story about a personal experience you've had hiking, climbing, or admiring them.`,
  //         'Adding emotion and personal details can make your post more relatable and interesting.',
  //         'Enhance visual appeal: Consider using an accompanying image or video that evokes the feeling of mountains, driving home your passion even further.',
  //         'Get specific about what you love: Are you drawn to their majestic heights, rugged slopes, or breathtaking sunsets? Specifying what aspect you connect with most will make your post more engaging to potential visitors looking for that same aspect in the mountain experience.',
  //         `Frame it as a question, prompt, or call to action: Spark conversation by asking a question like "What's your favorite mountain memory?" or inviting people to share their dream mountain hiking destination.`,
  //       ]
  //     ];
  // // Join the suggestions with space between them for proper formatting
  // return dummy; // Join suggestions with a space
  return suggestions;
};


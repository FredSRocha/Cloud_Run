import { GoogleGenAI, Type } from "@google/genai";
import { BpmData, Color } from '../types';
import { createPromptFromBpm } from '../utils/promptGenerator';

const extractBpmDataFromCsv = async (ai: GoogleGenAI, csvContent: string): Promise<BpmData> => {
    const prompt = `You are an expert data analyst. Your task is to analyze the following CSV content, identify the column that represents heart rate data (BPM or beats per minute), and extract the last 60 numerical values from that column. The data might not be labeled "BPM" explicitly; use your best judgment to find the most likely column (e.g., "heart_rate", "value", etc.). If there are fewer than 60 data points, return all of them. The output must be a clean JSON array of numbers. Do not include any other text or explanation.

    CSV content:
    ---
    ${csvContent}
    ---
    `;
  
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.NUMBER,
            },
          },
        },
      });
  
      const jsonStr = response.text.trim();
      const bpmData = JSON.parse(jsonStr);
  
      if (!Array.isArray(bpmData) || bpmData.some(v => typeof v !== 'number')) {
          throw new Error("AI model did not return a valid array of numbers.");
      }
      
      if (bpmData.length === 0) {
          throw new Error("No BPM data could be extracted from the file.");
      }
  
      return bpmData;
    } catch (error) {
      console.error("Gemini API Error during BPM extraction:", error);
      if (error instanceof Error) {
          throw new Error(`Failed to analyze CSV file: ${error.message}`);
      }
      throw new Error("An unknown error occurred during CSV analysis.");
    }
  };


export const generateArtImage = async (apiKey: string, csvContent: string, color: Color): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is not configured.");
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Step 1: Extract BPM data using Gemini
    const bpmData = await extractBpmDataFromCsv(ai, csvContent);

    console.log("BPMs Data for Image:", bpmData);
    
    // Step 2: Create a prompt for image generation
    const imagePrompt = createPromptFromBpm(bpmData, color);

    console.log("Generated Prompt for Image:", imagePrompt);
    
    // Step 3: Generate the image using Imagen
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: imagePrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: "1:1"
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return base64ImageBytes;
    } else {
      throw new Error("Image generation failed. No images were returned.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
            throw new Error("Your API Key is invalid. Please check and re-enter it.");
        }
        throw new Error(`${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
};

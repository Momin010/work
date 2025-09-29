import { GoogleGenAI } from "@google/genai";
import { DashboardData } from '../types';

const processDataWithGemini = async (rawData: string): Promise<DashboardData> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
        You are an expert data analyst and visualization specialist. Your task is to analyze the following raw data, identify key insights, and structure it into a JSON object suitable for creating a dashboard.

        The dashboard consists of several types of widgets: 'bar' chart, 'pie' chart, 'line' chart, and 'stat' (a single statistic).
        
        Analyze the data to generate a dashboard with a variety of these widgets. Ensure the data is correctly formatted for each widget type.
        
        - For 'bar' and 'line' charts, 'data' should be an array of objects. Each object needs a 'name' property for the x-axis label. Other properties should be numeric values for the bars/lines. The 'dataKeys' array should list the names of these numeric properties.
        - For 'pie' charts, 'data' should be an array of objects, each with a 'name' and a numeric 'value'.
        - For 'stat' widgets, 'data' should be an object with a 'value' (string), a 'description', and optional 'change' and 'changeType' ('increase' or 'decrease').
        - Each widget must have a unique 'id', a 'title', and a 'gridSpan' (1, 2, or 3) to indicate its width in the dashboard grid.
        - Create a meaningful overall 'title' and a 'summary' for the entire dashboard based on your analysis.
        - Generate at least 4-6 diverse widgets to create a comprehensive dashboard.

        Here is the raw data:
        ---
        ${rawData}
        ---
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.2,
            },
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        // Basic validation
        if (!parsedData.title || !parsedData.summary || !Array.isArray(parsedData.widgets)) {
            throw new Error("AI response is missing required fields.");
        }

        return parsedData as DashboardData;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI model.");
    }
};

export { processDataWithGemini };
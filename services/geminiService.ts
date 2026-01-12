import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', parts: [{text: string}]}[]): Promise<string> => {
  if (!ai) {
    console.warn("API Key not found for Gemini.");
    return "Система оффлайн: Ключ API не найден.";
  }

  try {
    const model = ai.models;
    
    // Filter out the initial welcome message if it's from the model
    const validHistory = history.filter((msg, index) => {
        if (index === 0 && msg.role === 'model') return false;
        return true;
    });

    // Construct chat history for context
    const chatContents = validHistory.map(h => ({
       role: h.role,
       parts: h.parts
    }));

    // Add current message
    chatContents.push({
        role: 'user',
        parts: [{ text: message }]
    });

    const response = await model.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: chatContents,
      config: {
        systemInstruction: "Ты — 'FlowBot', AI-ассистент лейбла Red Flow Records, футуристического музыкального лейбла из Минска, Беларусь. Твоя задача — помогать артистам с контрактами, дистрибуцией и вопросами по сведению. Твой тон — крутой, кибер-нуар, профессиональный, но с характером. Отвечай на русском языке. Будь краток.",
      }
    });

    return response.text || "Сигнал прерван. Попробуйте снова.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.toString().includes('403') || (error.status === 403)) {
       return "Доступ запрещен (403). Нейросеть недоступна для этого ключа.";
    }
    
    return "Ошибка подключения к нейросети.";
  }
};

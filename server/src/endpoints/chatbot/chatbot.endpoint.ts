// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import services
import { chatbotService } from "src/services/chat-bot";

// Import types
import type { ChatbotRequest } from "src/types/chatbot";

const chatbotEndpoints = new Endpoints("chatbot");

/**
 * Handle getting text responses from the chatbot
 * Route: POST /chatbot/get_text
 */
chatbotEndpoints.createHandler("get_text").post(async (req, res, o) => {
  try {
    // Validate request body
    const { question, currentUserId, languageCode, coor } = req.body as ChatbotRequest;
    
    if (!question || !currentUserId) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request parameters",
      });
    }

    // Process the request through the chatbot service
    const result = await chatbotService.requestAnswer({
      question,
      currentUserId,
      languageCode: languageCode || "vi",
      coor,
    });

    // Return the result
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    console.error("Chatbot get_text error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "An error occurred processing your request",
    });
  }
});

/**
 * Handle advanced chatGPT requests for more complex use cases
 * Route: POST /chatbot/ask_chatgpt
 */
chatbotEndpoints.createHandler("ask_chatgpt").post(async (req, res, o) => {
  try {
    const { question, currentUserId, languageCode, coor } = req.body as ChatbotRequest;
    
    if (!question) {
      return res.status(400).json({
        status: "error",
        message: "Question is required",
      });
    }

    // Process the request specifically for ChatGPT integration
    const result = await chatbotService.generateTravelItinerary({
      question,
      currentUserId: currentUserId || "guest",
      languageCode: languageCode || "vi",
      coor,
    });

    // Return the result
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    console.error("Chatbot ask_chatgpt error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "An error occurred processing your request",
    });
  }
});

export default chatbotEndpoints; 
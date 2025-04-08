// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import services
import { chatbotService } from "src/services/chat-bot";

// Import types
import type { ChatbotRequest } from "src/types/chatbot";

const chatbotEndpoints = new Endpoints("chatbot");

/**
 * Handle getting welcome message from the chatbot
 * Route: POST /chatbot/welcome
 */
chatbotEndpoints.createHandler("welcome").post(async (req, res, o) => {
  const { currentUserId, languageCode, coor } = req.body;
  
  if (!currentUserId) {
    o.code = 400;
    o.message = "User ID is required";
    return null;
  }

  // Get welcome message from chatbot service
  const result = await chatbotService.getWelcomeMessage({
    question: "Xin chào",
    currentUserId,
    languageCode: languageCode || "vi",
    coor,
  });

  // Return the result
  return result;
});

/**
 * Handle getting text responses from the chatbot
 * Route: POST /chatbot/get_text
 */
chatbotEndpoints.createHandler("get_text").post(async (req, res, o) => {
  // Validate request body
  const { question, currentUserId, languageCode, coor } = req.body as ChatbotRequest;
  
  if (!question || !currentUserId) {
    o.code = 400;
    o.message = "Invalid request parameters";
    return null;
  }

  // Process the request through the chatbot service
  const result = await chatbotService.requestAnswer({
    question,
    currentUserId,
    languageCode: languageCode || "vi",
    coor,
  });

  // Return the result
  return result;
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

/**
 * Debugging endpoint for testing various chatbot features
 * Route: POST /chatbot/test
 */
chatbotEndpoints.createHandler("test").post(async (req, res, o) => {
  const { feature, params } = req.body;
  
  if (!feature) {
    o.code = 400;
    o.message = "Feature parameter is required";
    return null;
  }

  let result;
  switch (feature) {
    case "weather":
      // Test weather feature
      result = await chatbotService.testWeatherFeature(params);
      break;
    case "places":
      // Test places feature
      result = await chatbotService.testPlacesFeature(params);
      break;
    case "directions":
      // Test directions feature
      result = await chatbotService.testDirectionsFeature(params);
      break;
    default:
      o.code = 400;
      o.message = "Unknown feature";
      return null;
  }

  return result;
});

export default chatbotEndpoints; 
import { Buffer } from "buffer";
import axios from "axios";
import dialogFlow from "@google-cloud/dialogflow";
import { v4 as uuidv4 } from "uuid";

// Import services
import { chatGPTService } from "../chat-gpt";
import { googleMapService } from "../google-map";
import { weatherService } from "../weather";

// Import utils
import { ErrorUtils } from "src/utils/error";
import { FileUtils } from "src/utils/file";
import { convertToWeatherData } from "src/types/weather";

// Import AppConfig
import AppConfig from "src/app.config.json";

// Import types
import { ChatbotRequest, ChatbotResponse, DialogFlowConfig, WeatherData, PlaceData } from "src/types/chatbot";

// Điều chỉnh cho testing (đặt thành true để sử dụng mock data)
const USE_MOCK_DATA = process.env.NODE_ENV !== "production";

export class ChatbotService {
  nearByRadius!: string;

  private _baseUrl!: string;
  private _apiKey!: string;
  private _secret!: DialogFlowConfig;

  constructor() {
    this.nearByRadius = AppConfig.apis.googleMap.settings.nearByRadius;

    this._baseUrl = AppConfig.apis.googleTextToSpeech.baseURL;
    this._apiKey = AppConfig.apis.googleTextToSpeech.apiKey;
    
    // Parse the JSON file content to DialogFlowConfig
    try {
      const secretBuffer = FileUtils.readFile("secrets", "dialogflow.json");
      this._secret = JSON.parse(secretBuffer.toString()) as DialogFlowConfig;
    } catch (error) {
      console.warn("Không thể đọc file dialogflow.json, sử dụng mock data");
      this._secret = {
        projectId: "mock-project-id",
        clientEmail: "mock@example.com",
        privateKey: "mock-private-key"
      };
    }
  }

  /**
   * Get a welcome message for the user
   * @param data User's request data
   * @returns Welcome message response
   */
  async getWelcomeMessage(data: ChatbotRequest): Promise<ChatbotResponse> {
    const result = await ErrorUtils.handleInterchangeError(this, async function () {
      // If using mock data for development/testing
      if (USE_MOCK_DATA) {
        return {
          response: "Xin chào! Tôi là TravelBot, trợ lý du lịch thông minh của DongNaiTravel. Tôi có thể giúp bạn tìm kiếm địa điểm du lịch, thời tiết, tạo lịch trình và nhiều thứ khác. Bạn cần giúp gì không?",
          action: "input.welcome",
          data: {
            suggestions: [
              { text: "Thời tiết ở Đồng Nai", action: "query-weather" },
              { text: "Địa điểm du lịch nổi tiếng", action: "query-places" },
              { text: "Tạo lịch trình du lịch", action: "query-itinerary" },
              { text: "Hướng dẫn sử dụng", action: "query-help" }
            ]
          }
        };
      }

      // Prepare information for DialogFlow
      const projectId = this._secret.projectId;
      const userSessionId = data.currentUserId;
      
      // Create credentials to request session client of dialogflow
      const credentials = {
        client_email: this._secret.clientEmail,
        private_key: this._secret.privateKey,
      };

      // Create session client of DialogFlow
      const dialogFlowSessionClient = new dialogFlow.SessionsClient({
        credentials,
      });

      // Create session path
      const sessionPath = dialogFlowSessionClient.projectAgentSessionPath(
        projectId,
        userSessionId
      );

      // Create request for DialogFlow with welcome intent
      const req = {
        session: sessionPath,
        queryInput: {
          text: {
            text: "Xin chào",
            languageCode: data.languageCode || "vi",
          },
        },
      };

      // Detect intent
      const dialogFlowResponse = await dialogFlowSessionClient.detectIntent(req);
      
      if (!dialogFlowResponse || !dialogFlowResponse[0] || !dialogFlowResponse[0].queryResult) {
        return {
          response: "Xin chào! Tôi là TravelBot, trợ lý du lịch thông minh của DongNaiTravel. Bạn cần giúp gì không?",
          action: "input.welcome",
        };
      }
      
      // Get action and response text from DialogFlow
      const queryResult = dialogFlowResponse[0].queryResult;
      const action = queryResult.action || "input.welcome";
      const responseText = queryResult.fulfillmentMessages && 
                          queryResult.fulfillmentMessages[0] && 
                          queryResult.fulfillmentMessages[0].text && 
                          queryResult.fulfillmentMessages[0].text.text && 
                          queryResult.fulfillmentMessages[0].text.text[0] || 
                          "Xin chào! Tôi là TravelBot, trợ lý du lịch thông minh của DongNaiTravel. Bạn cần giúp gì không?";
      
      return {
        response: responseText,
        action: action,
        data: {
          suggestions: [
            { text: "Thời tiết ở Đồng Nai", action: "query-weather" },
            { text: "Địa điểm du lịch nổi tiếng", action: "query-places" },
            { text: "Tạo lịch trình du lịch", action: "query-itinerary" },
            { text: "Hướng dẫn sử dụng", action: "query-help" }
          ]
        }
      };
    });
    
    // Ensure we always return a valid ChatbotResponse
    if (!result) {
      return {
        response: "Xin chào! Tôi là TravelBot, trợ lý du lịch thông minh của DongNaiTravel. Xin lỗi vì sự cố kết nối. Tôi có thể giúp gì cho bạn?",
        action: "input.welcome",
      };
    }
    
    return result.data as ChatbotResponse;
  }

  /**
   * Process a user question through DialogFlow and get a response
   * @param data The user's request data
   * @returns Response from the chatbot
   */
  async requestAnswer(data: ChatbotRequest): Promise<ChatbotResponse> {
    const result = await ErrorUtils.handleInterchangeError(this, async function () {
      // Prepare information
      const projectId = this._secret.projectId;
      const userSessionId = data.currentUserId;
      
      // Create credentials to request session client of dialogflow
      const credentials = {
        client_email: this._secret.clientEmail,
        private_key: this._secret.privateKey,
      };

      // Create session client of dialogFlow
      const dialogFlowSessionClient = new dialogFlow.SessionsClient({
        credentials,
      });

      // Create session path
      const sessionPath = dialogFlowSessionClient.projectAgentSessionPath(
        projectId,
        userSessionId
      );

      // Create request for DialogFlow
      const req = {
        session: sessionPath,
        queryInput: {
          text: {
            text: data.question,
            languageCode: data.languageCode || "vi",
          },
        },
      };

      // Detect intent from user's question
      const dialogFlowResponse = await dialogFlowSessionClient.detectIntent(req);
      
      if (!dialogFlowResponse || !dialogFlowResponse[0] || !dialogFlowResponse[0].queryResult) {
        return {
          response: "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.",
          action: "input.unknown",
        };
      }
      
      // Get action and response text from DialogFlow
      const queryResult = dialogFlowResponse[0].queryResult;
      const action = queryResult.action || "input.unknown";
      const queryText = queryResult.queryText || "";
      const responseText = queryResult.fulfillmentMessages && 
                          queryResult.fulfillmentMessages[0] && 
                          queryResult.fulfillmentMessages[0].text && 
                          queryResult.fulfillmentMessages[0].text.text && 
                          queryResult.fulfillmentMessages[0].text.text[0] || 
                          "Xin lỗi, tôi không hiểu ý bạn.";
      
      console.log("DialogFlow Action:", action);
      console.log("DialogFlow Response:", responseText);

      // If DialogFlow couldn't understand the intent, use ChatGPT
      if (action === "input.unknown") {
        const chatGPTResult = await chatGPTService.requestAnswer(queryText);
        return {
          response: chatGPTResult || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
          action: action,
        };
      } 
      // Handle place suggestions
      else if (action === "input.suggest-place") {
        // Get nearby places
        return {
          response: responseText,
          action: action,
        };
      } 
      // Handle weather queries
      else if (action === "input.get-weather") {
        const parameters = queryResult.parameters?.fields;
        const address = parameters?.address?.stringValue;
        const dateString = parameters?.date?.stringValue;
        const here = parameters?.here?.stringValue; // HERE
        const current_time = parameters?.current_time?.stringValue; // CURRENT_TIME
        
        // Must have one of (current_time, dateString) and one of (here, address)
        if ((current_time || dateString) && (here || address)) {
          let weatherData: WeatherData | null = null;
          
          // Handle case where user wants weather at current location
          if (!address) {
            if (!data.coor) {
              return {
                response: responseText,
                action: action,
              };
            } else {
              const coords = {
                latitude: data.coor.latitude,
                longitude: data.coor.longitude
              };
              
              const weatherResponse = await weatherService.forecastWeather(coords);
              if (weatherResponse?.data) {
                weatherData = convertToWeatherData(weatherResponse.data);
              }
            }
          } else {
            // Get coordinates from address
            const geocodingResponse = await weatherService.requestGeoCodingDirect(address);
            
            if (geocodingResponse && geocodingResponse.data && geocodingResponse.data.coor) {
              const weatherResponse = await weatherService.forecastWeather(geocodingResponse.data.coor);
              if (weatherResponse?.data) {
                weatherData = convertToWeatherData(weatherResponse.data);
              }
            }
          }
          
          // Return the response with weather data
          const textToResponse = 
            (current_time && here) || (current_time && address) || (dateString && here) || (dateString && address)
              ? "Đây là thông tin về thời tiết tại nơi bạn cần được cập nhật mỗi 3 giờ trong 5 ngày tới do đó các yêu cầu của bạn trong quá khứ hoặc quá 5 ngày tiếp theo sẽ không có hiệu lực. Mong bạn thông cảm về sự bất tiện này!"
              : responseText;
              
          return {
            response: textToResponse,
            action: action,
            data: weatherData,
          };
        } else if (here === "HERE") {
          return {
            response: "Bạn muốn biết thời tiết vào lúc nào?",
            action: "input.unfinish",
          };
        } else {
          return {
            response: responseText,
            action: "input.unfinish",
          };
        }
      } 
      // Handle location on map queries
      else if (action === "input.location-on-map") {
        const parameters = queryResult.parameters?.fields;
        const location = parameters?.location?.stringValue;
        
        if (location) {
          // Search for places with the given location
          const placesResponse = await googleMapService.requestPlaces({
            query: location,
            radius: this.nearByRadius,
            location: data.coor
          });
          
          if (placesResponse && placesResponse.data && placesResponse.data.results && placesResponse.data.results.length > 0) {
            const places: PlaceData[] = placesResponse.data.results.map((place: any) => ({
              _id: place.place_id,
              name: place.name,
              address: place.formatted_address || place.vicinity,
              location: {
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              },
            }));
            
            return {
              response: responseText || `Đây là kết quả tìm kiếm cho ${location}`,
              action: action,
              data: { places },
            };
          }
        }
        
        return {
          response: responseText || "Vui lòng cung cấp thêm thông tin về địa điểm bạn muốn tìm",
          action: action,
        };
      } 
      // Handle direction queries
      else if (action === "input.get-direction" || action === "input.direction-a-to-b") {
        const parameters = queryResult.parameters?.fields;
        const startLocation = parameters?.["start-location"]?.stringValue || parameters?.start_location?.stringValue;
        const endLocation = parameters?.["end-location"]?.stringValue || parameters?.end_location?.stringValue;
        const here = parameters?.here?.stringValue;
        
        // If both start and end locations are provided
        if ((startLocation || here) && endLocation) {
          // Prepare direction request parameters
          const directionParams: any = {
            oriAddress: startLocation,
            desAddress: endLocation,
            oriPlaceId: null,
            desPlaceId: null,
            oriCoor: null,
            desCoor: null,
            modeORS: "driving-car",
            modeGCP: "DRIVE",
            typeOri: "address",
            typeDes: "address",
            routeModifiers: {
              avoidTolls: false,
              avoidHighways: false,
              avoidFerries: false,
            },
            languageCode: "vi",
          };
          
          // Handle "here" as starting point
          if (here === "HERE" && data.coor) {
            directionParams.oriAddress = null;
            directionParams.oriCoor = data.coor;
            directionParams.typeOri = "coordinate";
          }
          
          // Get directions
          const directionsResponse = await googleMapService.requestRouteDirection(directionParams);
          
          if (directionsResponse && directionsResponse.code === 0 && directionsResponse.data) {
            return {
              response: responseText || `Đây là chỉ dẫn đường đi từ ${startLocation || 'vị trí hiện tại'} đến ${endLocation}`,
              action: action,
              data: directionsResponse.data,
            };
          }
        }
        
        return {
          response: responseText || "Vui lòng cung cấp thêm thông tin về điểm đi và điểm đến",
          action: action,
        };
      }
      // Handle where am I queries
      else if (action === "input.where-am-i") {
        if (data.coor) {
          const geocodingResponse = await googleMapService.requestPlaceIdFromCoor(data.coor);
          
          if (geocodingResponse && geocodingResponse.code === 0 && geocodingResponse.data) {
            const address = geocodingResponse.data.formatted_address;
            
            // Get nearby places
            const nearbyPlacesResponse = await googleMapService.requestPlaces({
              radius: this.nearByRadius,
              location: data.coor,
              rankby: "distance"
            });
            
            if (nearbyPlacesResponse && nearbyPlacesResponse.code === 0 && nearbyPlacesResponse.data) {
              const nearbyPlaces = nearbyPlacesResponse.data.results.map((place: any) => ({
                _id: place.place_id,
                name: place.name,
                address: place.vicinity,
                location: {
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                },
              }));
              
              return {
                response: `Bạn đang ở ${address}`,
                action: action,
                data: {
                  myLocation: {
                    address,
                    coordinates: data.coor,
                  },
                  nearbyPlaces,
                },
              };
            }
          }
        }
        
        return {
          response: responseText || "Không thể xác định vị trí của bạn",
          action: action,
        };
      }
      // For other actions, return the DialogFlow response
      else {
        return {
          response: responseText,
          action: action,
        };
      }
    });
    
    // Ensure we always return a valid ChatbotResponse
    if (!result) {
      return {
        response: "Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn.",
        action: "input.error",
      };
    }
    
    return result.data as ChatbotResponse;
  }

  /**
   * Use ChatGPT to generate a travel itinerary based on user query
   * @param data The user's request data
   * @returns Generated travel itinerary
   */
  async generateTravelItinerary(data: ChatbotRequest): Promise<ChatbotResponse> {
    const result = await ErrorUtils.handleInterchangeError(this, async function () {
      const { question } = data;
      
      // Format a prompt for ChatGPT to generate a detailed travel itinerary
      const prompt = `
        Tạo một lịch trình du lịch dựa trên yêu cầu sau đây: "${question}"
        
        Hãy bao gồm những thông tin sau:
        1. Địa điểm du lịch chính
        2. Thời gian đề xuất cho chuyến đi
        3. Kế hoạch chi tiết cho từng ngày (kèm thời gian)
        4. Các hoạt động đề xuất
        5. Đề xuất ẩm thực và nhà hàng
        6. Đề xuất chỗ ở
        7. Ước tính chi phí
        
        Định dạng lịch trình theo ngày, với hoạt động chi tiết cho mỗi khoảng thời gian.
      `;
      
      const response = await chatGPTService.requestAnswer(prompt);
      
      return {
        response: "Đây là đề xuất lịch trình du lịch dựa trên yêu cầu của bạn:",
        action: "input.create-travel-itinerary",
        data: {
          itinerary: response,
          query: question,
        },
      };
    });
    
    // Ensure we always return a valid ChatbotResponse
    if (!result) {
      return {
        response: "Xin lỗi, đã xảy ra lỗi khi tạo lịch trình du lịch.",
        action: "input.error",
      };
    }
    
    return result.data as ChatbotResponse;
  }

  /**
   * Test function for weather features
   * @param params Test parameters
   * @returns Test results
   */
  async testWeatherFeature(params: any): Promise<any> {
    const { location, coordinates } = params || {};
    
    try {
      let weatherData = null;
      
      if (coordinates) {
        // Test with coordinates
        const coords = {
          latitude: parseFloat(coordinates.lat),
          longitude: parseFloat(coordinates.lng)
        };
        
        const weatherResponse = await weatherService.forecastWeather(coords);
        if (weatherResponse?.data) {
          weatherData = convertToWeatherData(weatherResponse.data);
        }
      } else if (location) {
        // Test with location name
        const geocodingResponse = await weatherService.requestGeoCodingDirect(location);
        
        if (geocodingResponse && geocodingResponse.data && geocodingResponse.data.coor) {
          const weatherResponse = await weatherService.forecastWeather(geocodingResponse.data.coor);
          if (weatherResponse?.data) {
            weatherData = convertToWeatherData(weatherResponse.data);
          }
        }
      } else {
        // Test with default location (Dong Nai)
        const defaultCoords = { latitude: 10.9778, longitude: 106.8511 };
        const weatherResponse = await weatherService.forecastWeather(defaultCoords);
        if (weatherResponse?.data) {
          weatherData = convertToWeatherData(weatherResponse.data);
        }
      }
      
      return {
        response: "Kết quả test thời tiết",
        action: "input.get-weather",
        data: weatherData,
      };
    } catch (error) {
      console.error("Test weather feature error:", error);
      return {
        response: "Đã xảy ra lỗi khi test tính năng thời tiết.",
        action: "input.error",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Test function for places features
   * @param params Test parameters
   * @returns Test results
   */
  async testPlacesFeature(params: any): Promise<any> {
    const { query, radius, coordinates } = params || {};
    
    try {
      // Use default coordinates for Dong Nai if not provided
      const coords = coordinates ? {
        latitude: parseFloat(coordinates.lat),
        longitude: parseFloat(coordinates.lng)
      } : { latitude: 10.9778, longitude: 106.8511 };
      
      // Use provided radius or default
      const searchRadius = radius || this.nearByRadius;
      
      // Search for places
      const placesResponse = await googleMapService.requestPlaces({
        query: query || "du lịch",
        radius: searchRadius,
        location: coords
      });
      
      if (placesResponse && placesResponse.data && placesResponse.data.results) {
        const places: PlaceData[] = placesResponse.data.results.map((place: any) => ({
          _id: place.place_id,
          name: place.name,
          address: place.formatted_address || place.vicinity,
          location: {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          },
          description: place.types?.join(', '),
          images: place.photos ? [`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${AppConfig.apis.googleMap.apiKey}`] : undefined,
          avgRating: place.rating,
        }));
        
        return {
          response: `Kết quả tìm kiếm cho ${query || "du lịch"}`,
          action: "input.suggest-place",
          data: { places },
        };
      }
      
      return {
        response: "Không tìm thấy địa điểm nào phù hợp.",
        action: "input.suggest-place",
      };
    } catch (error) {
      console.error("Test places feature error:", error);
      return {
        response: "Đã xảy ra lỗi khi test tính năng tìm kiếm địa điểm.",
        action: "input.error",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Test function for directions features
   * @param params Test parameters
   * @returns Test results
   */
  async testDirectionsFeature(params: any): Promise<any> {
    const { origin, destination, mode } = params || {};
    
    try {
      if (!origin || !destination) {
        return {
          response: "Vui lòng cung cấp điểm bắt đầu và điểm kết thúc.",
          action: "input.error",
        };
      }
      
      // Prepare direction request parameters
      const directionParams: any = {
        oriAddress: origin,
        desAddress: destination,
        oriPlaceId: null,
        desPlaceId: null,
        oriCoor: null,
        desCoor: null,
        modeORS: mode || "driving-car",
        modeGCP: mode === "walking" ? "WALK" : "DRIVE",
        typeOri: "address",
        typeDes: "address",
        routeModifiers: {
          avoidTolls: false,
          avoidHighways: false,
          avoidFerries: false,
        },
        languageCode: "vi",
      };
      
      // Get directions
      const directionsResponse = await googleMapService.requestRouteDirection(directionParams);
      
      if (directionsResponse && directionsResponse.code === 0 && directionsResponse.data) {
        return {
          response: `Chỉ dẫn đường đi từ ${origin} đến ${destination}`,
          action: "input.get-direction",
          data: directionsResponse.data,
        };
      }
      
      return {
        response: "Không thể tìm thấy chỉ dẫn cho tuyến đường này.",
        action: "input.get-direction",
      };
    } catch (error) {
      console.error("Test directions feature error:", error);
      return {
        response: "Đã xảy ra lỗi khi test tính năng chỉ đường.",
        action: "input.error",
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
}

export const chatbotService = new ChatbotService();

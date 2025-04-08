/**
 * Request structure for chatbot queries
 */
export interface ChatbotRequest {
  /** The question from the user */
  question: string;
  
  /** The user's ID or session ID */
  currentUserId: string;
  
  /** The language code (e.g., 'vi', 'en') */
  languageCode?: string;
  
  /** The user's coordinates for location-based queries */
  coor?: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Response structure from chatbot
 */
export interface ChatbotResponse {
  /** The text response to be shown to the user */
  response: string;
  
  /** The action identified from the user's query */
  action?: string;
  
  /** Additional data related to the response (e.g., weather data, place info) */
  data?: any;
}

/**
 * Interface for DialogFlow session client configuration
 */
export interface DialogFlowConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

/**
 * Interface for weather data in chatbot responses
 */
export interface WeatherData {
  name: string;
  country: string;
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  };
  forecast: any[];
}

/**
 * Interface for place data in chatbot responses
 */
export interface PlaceData {
  _id: string;
  name: string;
  address: string;
  description?: string;
  images?: string[];
  avgRating?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
} 
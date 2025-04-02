import { FileUtils } from "./file";
import appConfig from "../app.config.json";

/**
 * Interface for API keys structure
 */
interface ApiKeys {
  openWeather: {
    apiKey: string;
  };
  googleMap: {
    apiKey: string;
  };
  googleRoute: {
    apiKey: string;
  };
  googleTextToSpeech: {
    apiKey: string;
  };
  openAI: {
    apiKey: string;
  };
  redis: {
    apiKey: string;
    credentials: {
      host: string;
      port: string;
      username: string;
      password: string;
    };
  };
  aws: {
    s3: {
      accessKey: string;
      secretKey: string;
    };
  };
}

/**
 * API Configuration interfaces
 */
interface OpenWeatherConfig {
  apiKey: string;
  baseURL: string;
  settings: {
    language: string;
    units: string;
    cnt: number;
  };
}

interface GoogleMapConfig {
  apiKey: string;
  baseURL: string;
  settings: {
    language: string;
    nearByRadius: string;
    maxPhotoWidth: string;
  };
}

interface GoogleRouteConfig {
  apiKey: string;
  baseURL: string;
  settings: {
    language: string;
    nearByRadius: string;
    maxPhotoWidth: string;
  };
}

interface GoogleTextToSpeechConfig {
  apiKey: string;
  baseURL: string;
  settings: {
    language: string;
  };
}

interface OpenAIConfig {
  apiKey: string;
  baseURL: string;
  settings: Record<string, any>;
}

interface RedisConfig {
  apiKey: string;
  baseURL: string;
  settings: {
    host: string;
    port: string;
    username: string;
    password: string;
  };
}

/**
 * Combined APIs configuration type
 */
interface ApisConfig {
  openWeather: OpenWeatherConfig;
  googleMap: GoogleMapConfig;
  googleRoute: GoogleRouteConfig;
  googleTextToSpeech: GoogleTextToSpeechConfig;
  openAI: OpenAIConfig;
  redis: RedisConfig;
}

/**
 * App configuration with typed APIs
 */
interface AppConfig {
  app: string;
  email: string;
  port: number;
  hostname: string;
  redis: {
    hostname: string;
    port: string;
  };
  listedEndpointsDir: string[];
  unListedEndpointsDir: string[];
  folders: Record<string, string>;
  origins: string[];
  rootIssuer: string;
  tokenExpiration: Record<string, any>;
  emailServer: Record<string, string>;
  cloud: Record<string, any>;
  apis: ApisConfig;
}

/**
 * Loads API keys from the secrets/api-keys.json file
 */
function loadApiKeys(): ApiKeys {
  try {
    const apiKeysBuffer = FileUtils.readFile("secrets", "api-keys.json");
    return JSON.parse(apiKeysBuffer.toString()) as ApiKeys;
  } catch (error) {
    console.error("Failed to load API keys:", error);
    throw new Error("Failed to load API keys. Make sure api-keys.json exists in the secrets directory.");
  }
}

/**
 * Merges API keys with app configuration
 */
function mergeApiKeysWithConfig() {
  try {
    const apiKeys = loadApiKeys();
    const config = { ...appConfig } as AppConfig;

    // Merge OpenWeather API key
    if (config.apis.openWeather && apiKeys.openWeather) {
      config.apis.openWeather.apiKey = apiKeys.openWeather.apiKey;
    }

    // Merge Google Map API key
    if (config.apis.googleMap && apiKeys.googleMap) {
      config.apis.googleMap.apiKey = apiKeys.googleMap.apiKey;
    }

    // Merge Google Route API key
    if (config.apis.googleRoute && apiKeys.googleRoute) {
      config.apis.googleRoute.apiKey = apiKeys.googleRoute.apiKey;
    }

    // Merge Google Text-to-Speech API key
    if (config.apis.googleTextToSpeech && apiKeys.googleTextToSpeech) {
      config.apis.googleTextToSpeech.apiKey = apiKeys.googleTextToSpeech.apiKey;
    }

    // Merge OpenAI API key
    if (config.apis.openAI && apiKeys.openAI) {
      config.apis.openAI.apiKey = apiKeys.openAI.apiKey;
    }

    // Merge Redis API key and credentials
    if (config.apis.redis && apiKeys.redis) {
      config.apis.redis.apiKey = apiKeys.redis.apiKey;
      
      if (config.apis.redis.settings && apiKeys.redis.credentials) {
        config.apis.redis.settings.host = apiKeys.redis.credentials.host;
        config.apis.redis.settings.port = apiKeys.redis.credentials.port;
        config.apis.redis.settings.username = apiKeys.redis.credentials.username;
        config.apis.redis.settings.password = apiKeys.redis.credentials.password;
      }
    }

    return config;
  } catch (error) {
    console.error("Failed to merge API keys with config:", error);
    return appConfig as AppConfig; // Return original config if merging fails
  }
}

/**
 * The application configuration with API keys loaded from secrets
 */
export const appConfigWithKeys = mergeApiKeysWithConfig();

/**
 * Utility class for application configuration
 */
export class ConfigUtils {
  /**
   * Gets the complete application configuration with API keys
   */
  static getConfig(): AppConfig {
    return appConfigWithKeys;
  }

  /**
   * Gets an API configuration by name
   * @param apiName The name of the API (e.g., 'openWeather', 'googleMap')
   */
  static getApiConfig<T extends keyof ApisConfig>(apiName: T): ApisConfig[T] {
    const config = this.getConfig();
    return config.apis[apiName];
  }
} 
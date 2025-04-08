import appConfig from "../app.config.json";

/**
 * Interface for OpenWeather API configuration
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

/**
 * Interface for Google Map API configuration
 */
interface GoogleMapConfig {
  apiKey: string;
  baseURL: string;
  settings: {
    language: string;
    nearByRadius: string;
    maxPhotoWidth: string;
  };
}

/**
 * Interface for Google Route API configuration
 */
interface GoogleRouteConfig {
  apiKey: string;
  baseURL: string;
  settings: {
    language: string;
    nearByRadius: string;
    maxPhotoWidth: string;
  };
}

/**
 * Interface for Google Text-to-Speech API configuration
 */
interface GoogleTextToSpeechConfig {
  apiKey: string;
  baseURL: string;
  settings: {
    language: string;
  };
}

/**
 * Interface for OpenAI API configuration
 */
interface OpenAIConfig {
  apiKey: string;
  baseURL: string;
  settings: Record<string, any>;
}

/**
 * Interface for Redis configuration
 */
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
 * The application configuration is simply the app.config.json
 */
export const appConfigWithKeys = appConfig as AppConfig;

/**
 * Utility class for application configuration
 */
export class ConfigUtils {
  /**
   * Gets the complete application configuration
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
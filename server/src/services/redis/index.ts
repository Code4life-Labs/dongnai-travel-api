import axios from "axios";
import Queue from "bull";

// Import utils
import { ErrorUtils } from "src/utils/error";
import { ConfigUtils } from "src/utils/config";

export class RedisService {
  private _host!: string;
  private _port!: string;
  private _username!: string;
  private _password!: string;

  constructor() {
    const redisConfig = ConfigUtils.getApiConfig("redis");
    
    this._host = redisConfig.settings.host;
    this._port = redisConfig.settings.port;
    this._username = redisConfig.settings.username;
    this._password = redisConfig.settings.password;
  }

  /**
   * Create queue with `name`
   * Old name: `generateQueue`
   * @param name
   */
  createQueue(name: string) {
    return ErrorUtils.handleInterchangeError(this, async function () {
      return new Queue(name, {
        redis: {
          host: this._host,
          port: this._port,
          username: this._username,
          password: this._password,
        } as any,
      });
    });
  }
}

export const redisService = new RedisService();

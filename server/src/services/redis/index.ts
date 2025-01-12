import axios from "axios";
import Queue from "bull";

// Import utils
import { ErrorUtils } from "src/utils/error";

// Import AppConfig
import AppConfig from "src/app.config.json";

export class RedisService {
  private _host!: string;
  private _port!: string;
  private _username!: string;
  private _password!: string;

  constructor() {
    this._host = AppConfig.apis.redis.settings.host;
    this._port = AppConfig.apis.redis.settings.port;
    this._username = AppConfig.apis.redis.settings.username;
    this._password = AppConfig.apis.redis.settings.password;
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

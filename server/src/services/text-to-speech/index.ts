import axios from "axios";

// Import utils
import { ErrorUtils } from "src/utils/error";

// Import AppConfig
import AppConfig from "src/app.config.json";

export class TextToSpeechService {
  private _baseUrl!: string;
  private _apiKey!: string;

  constructor() {
    this._baseUrl = AppConfig.apis.googleTextToSpeech.baseURL;
    this._apiKey = AppConfig.apis.googleTextToSpeech.apiKey;
  }

  /**
   * Use to request a speech from
   * @param data
   * @returns
   */
  async requestSpeech(data: any) {
    return ErrorUtils.handleInterchangeError(this, async function (o) {
      const params = {
        key: this._apiKey,
      };

      const response = await axios.post(
        `${this._baseUrl}/text:synthesize`,
        {
          input: {
            text: data.text,
          },
          voice: {
            languageCode: data.languageCode,
            name: data.name,
          },
          audioConfig: {
            audioEncoding: "mp3",
          },
        },
        { params }
      );

      return response.data.audioContent;
    });
  }
}

export const ttsService = new TextToSpeechService();

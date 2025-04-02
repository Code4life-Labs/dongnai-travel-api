import axios from "axios";

// Import utils
import { ErrorUtils } from "src/utils/error";
import { ConfigUtils } from "src/utils/config";

export class TextToSpeechService {
  private _baseUrl!: string;
  private _apiKey!: string;

  constructor() {
    const ttsConfig = ConfigUtils.getApiConfig("googleTextToSpeech");
    
    this._baseUrl = ttsConfig.baseURL;
    this._apiKey = ttsConfig.apiKey;
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

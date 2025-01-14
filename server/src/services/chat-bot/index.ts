import { Buffer } from "buffer";
import axios from "axios";
import dialogFlow from "@google-cloud/dialogflow";

// Import services
import { chatGPTService } from "../chat-gpt";
import { googleMapService } from "../google-map";
import { weatherService } from "../weather";

// Import utils
import { ErrorUtils } from "src/utils/error";
import { FileUtils } from "src/utils/file";

// Import AppConfig
import AppConfig from "src/app.config.json";

export class ChatbotService {
  nearByRadius!: string;

  private _baseUrl!: string;
  private _apiKey!: string;
  private _secret!: any;

  constructor() {
    this.nearByRadius = AppConfig.apis.googleMap.settings.nearByRadius;

    this._baseUrl = AppConfig.apis.googleTextToSpeech.baseURL;
    this._apiKey = AppConfig.apis.googleTextToSpeech.apiKey;
    this._secret = FileUtils.readFile("secrets", "dialogflow.json");
  }

  /**
   * Use to request a speech from
   * @param data
   * @returns
   */
  async requestAnswer(data: any) {
    return ErrorUtils.handleInterchangeError(this, async function (o) {
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
      const dialogFlowIntentRequest = {
        session: sessionPath,
        queryInput: {
          text: {
            text: data.question,
            languageCode: data.languageCode,
          },
        },
      };

      const dialogFlowIntentResponse =
        await dialogFlowSessionClient.detectIntent(dialogFlowIntentRequest);

      const queryResult = dialogFlowIntentResponse[0].queryResult;
      const response: any = {
        responseText: "",
        action: "",
      };
      console.log("Query result:", queryResult);

      // Check queryResult
      if (!queryResult) {
        return response;
      }

      const action = queryResult.action;
      let queryText = queryResult.queryText;
      response.responseText =
        queryResult.fulfillmentMessages![0].text?.text![0];
      response.action = action;

      switch (action) {
        case "input.suggest-place":
          break;

        case "input.get-weather": {
          const fields = queryResult.parameters?.fields;

          if (!fields) break;

          const address = fields.address?.stringValue;
          const dateString = fields.date?.stringValue;
          const here = fields.here?.stringValue;
          const current_time = fields.current_time?.stringValue;

          if ((current_time || dateString) && (here || address)) {
            let weatherData;
            if (!address) {
              console.log("Không có address");
              if (!data.coor) {
                break;
              } else {
                weatherData = await weatherService.forecastWeather(data.coor);
              }
            } else {
              const geocodingDirectResult =
                await weatherService.requestGeoCodingDirect(address);

              if (geocodingDirectResult.code) {
                console.error(geocodingDirectResult.message);
                break;
              }

              const geocodingDirect = geocodingDirectResult.data!;
              weatherData = await weatherService.forecastWeather(
                geocodingDirect.coor
              );
            }

            if (
              (current_time && here) ||
              (current_time && address) ||
              (dateString && here) ||
              (dateString && address)
            )
              response.responseText =
                "Đây là thông tin về thời tiết tại nơi bạn cần được cập nhật mỗi 3 giờ trong 5 ngày tới do đó các yêu cầu của bạn trong quá khứ hoặc quá 5 ngày tiếp theo sẽ không có hiệu lực. Mong bạn thông cảm về sự bất tiện này!";

            response.data = weatherData;
          } else if (here === "HERE") {
            response.responseText = "Bạn muốn biết thời tiết vào lúc nào?";
            response.action = "input.unfinish";
          } else {
            response.action = "input.unfinish";
          }
          break;
        }

        case "input.location-on-map": {
          response.responseText = "Sau đây là thông tin về địa điểm của bạn";
          response.data = {
            query: data.question,
            sortBy: "DEFAULT",
            radius: "5000",
            location: data.coor,
          };
          break;
        }

        case "input.direction-a-to-b": {
          const fieldKeys = [
            "admin-area",
            "city",
            "street-address",
            "business-name",
            "country",
            "subadmin-area",
            "island",
            "zip-code",
            "shortcut",
          ];
          const fields = queryResult.parameters?.fields;

          if (!fields) break;

          let start_location = fields.start_location?.stringValue;
          if (!start_location && fields.start_location?.structValue) {
            fieldKeys.map((field) => {
              if (
                fields.start_location?.structValue?.fields![field].stringValue
              ) {
                start_location =
                  fields.start_location?.structValue.fields[field].stringValue;
              }
            });
          }

          let end_location = fields.end_location?.stringValue;
          if (!end_location && fields.end_location?.structValue) {
            fieldKeys.map((field) => {
              if (
                fields.end_location?.structValue?.fields![field].stringValue
              ) {
                end_location =
                  fields.end_location?.structValue.fields[field].stringValue;
              }
            });
          }

          const here = fields.here?.stringValue;

          // TH cơ bản có cả hai start_location và end_location
          if (start_location && end_location) {
            response.responseText = "Sau đây là tuyến đường của bạn";
            response.data = {
              oriAddress: start_location,
              desAddress: end_location,
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
            break;
          }
          // TH có here và có một trong hai thằng start_location và end_location
          else if (here && (start_location || end_location)) {
            if (start_location) {
              response.responseText = "Sau đây là tuyến đường của bạn";
              response.data = {
                oriAddress: start_location,
                desAddress: null,
                oriPlaceId: null,
                desPlaceId: null,
                oriCoor: null,
                desCoor: data.coor,
                modeORS: "driving-car",
                modeGCP: "DRIVE",
                typeOri: "address",
                typeDes: "coordinate",
                routeModifiers: {
                  avoidTolls: false,
                  avoidHighways: false,
                  avoidFerries: false,
                },
                languageCode: "vi",
              };
              break;
            } else if (end_location) {
              response.responseText = "Sau đây là tuyến đường của bạn";
              response.data = {
                oriAddress: null,
                desAddress: end_location,
                oriPlaceId: null,
                desPlaceId: null,
                oriCoor: data.coor,
                desCoor: null,
                modeORS: "driving-car",
                modeGCP: "DRIVE",
                typeOri: "coordinate",
                typeDes: "address",
                routeModifiers: {
                  avoidTolls: false,
                  avoidHighways: false,
                  avoidFerries: false,
                },
                languageCode: "vi",
              };
              break;
            }
          } else {
            response.action = "input.unfinish";
          }
          break;
        }

        case "input.where-am-i": {
          const geocodingResult = await googleMapService.requestPlaceIdFromCoor(
            {
              latitude: data.coor.latitude,
              longitude: data.coor.longitude,
            }
          );

          if (geocodingResult.code) {
            console.error(geocodingResult.message);
            break;
          }

          const geocoding = geocodingResult.data;
          response.responseText = response.responseText.replace(
            "[address]",
            geocoding.formatted_address
          );
          response.data = geocoding;
          break;
        }

        case "input.travel-itinerary": {
          const fieldKeys = [
            "admin-area",
            "city",
            "street-address",
            "business-name",
            "country",
            "subadmin-area",
            "island",
            "zip-code",
            "shortcut",
          ];
          const fields = queryResult.parameters?.fields;

          if (!fields) break;

          let placeToTravel = fields.location?.stringValue;

          if (!placeToTravel && fields.location?.structValue) {
            fieldKeys.map((field) => {
              if (fields.location?.structValue?.fields![field].stringValue) {
                placeToTravel =
                  fields.location?.structValue.fields[field].stringValue;
              }
            });
          }

          let numberDayToTravel = fields["number-integer"].numberValue;

          if (placeToTravel) {
            // Cần phải xác định tên địa điểm để tạo lịch trình
            // Sau đó cần call api để lấy ra tên các địa điểm tham quan và nơi ăn uống
            const travelPlacesTextQuery = `Địa điểm du lịch nổi tiếng tại ${placeToTravel}`;
            const fnbPlacesTextQuery = `Đại điểm ăn uống nổi tiếng tại ${placeToTravel}`;

            const dataTextSearch = {
              rankby: "",
              radius: this.nearByRadius,
              location: data.coor,
            };

            // Lấy 2 cái url để req
            const travelPlacesPromise = googleMapService.requestPlaces({
              ...dataTextSearch,
              query: travelPlacesTextQuery,
            });
            const fnbPlacesPromise = googleMapService.requestPlaces({
              ...dataTextSearch,
              query: fnbPlacesTextQuery,
            });

            let dataTravelPlaces,
              dataFnbPlaces,
              travelPlaces: Array<any> = [],
              fnbPlaces: Array<any> = [];

            // Gọi tiến trình song song để gảm thời gian chờ request
            await axios
              .all([travelPlacesPromise, fnbPlacesPromise])
              .then((datas) => {
                datas.map((res, index) => {
                  switch (index) {
                    case 0: {
                      dataTravelPlaces = res.data.results;
                      res.data.results.map((place: any) => {
                        travelPlaces.push(place.name);
                      });
                      break;
                    }

                    case 1: {
                      dataFnbPlaces = res.data.results;
                      res.data.results.map((place: any) => {
                        fnbPlaces.push(place.name);
                      });
                      break;
                    }
                  }
                });
              })
              .catch((err) =>
                console.error("Error in Travel, FnB Places request", err)
              );

            response.responseText = "Đây là thông tin của bạn";
            response.data = {
              travelPlaces,
              fnbPlaces,
              dataTravelPlaces,
              dataFnbPlaces,
              numberDayToTravel: numberDayToTravel,
              placeToTravel: placeToTravel,
              question: queryText,
            };
          }
          break;
        }

        // Make request to chat gpt
        default: {
          response.responseText = await chatGPTService.requestAnswer(
            queryText!
          );
          break;
        }
      }

      return response;
    });
  }
}

export const chatbotService = new ChatbotService();

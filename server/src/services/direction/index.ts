import axios from "axios";
import { cloneDeep, result, sortBy } from "lodash";

// Import services
import { redisService } from "src/services/redis";
import { googleMapService } from "src/services/google-map";
import { routeService } from "../google-route";

// Import utils
import { ErrorUtils } from "src/utils/error";

// Import AppConfig
import AppConfig from "src/app.config.json";

export class DirectionService {
  private _baseUrl!: string;
  private _apiKey!: string;

  constructor() {
    this._baseUrl = AppConfig.apis.googleTextToSpeech.baseURL;
    this._apiKey = AppConfig.apis.googleTextToSpeech.apiKey;
  }

  /**
   * Use to get rouet direction
   * Old name: `getRouteDirection`
   * @param data
   * @returns
   */
  async generateRouteDirection(data: any) {
    // data có dạng:
    // data = {
    //   oriAddress: 'abc' || null,
    //   desAddress: 'abc' || null,
    //   oriPlaceId: sdgkl_27e921 || null,
    //   desPlaceId: sdgkl_27e921 || null,
    //   oriCoor: {
    //      longitude: 10.214290,
    //      latitude: 100.1283824
    // } || null,
    //   desCoor: {
    //      longitude: 10.214290,
    //      latitude: 100.1283824
    // } || null,
    //   modeORS: 'driving-car',
    //   modeGCP: 'driving',
    //   typeOri: 'place_id' || 'address' || 'coordinate',
    //   typeDes: 'place_id' || 'address' || 'coordinate',
    //   routeModifiers: {
    //   avoidTolls: false,
    //   avoidHighways: false,
    //   avoidFerries: false,
    //   avoidIndoor: false
    //   },
    //   languageCode: 'vi'
    // }
    return ErrorUtils.handleInterchangeError(this, async function (o) {
      const params = {
        key: this._apiKey,
      };
      let oriToCheck, desToCheck, result, desRouteInfo, oriRouteInfo;

      if (data.typeOri === 'place_id') {
        oriToCheck = data.oriPlaceId
      } else if (data.typeOri === 'address') {
        // geocoding 2 thằng origin và destination để lấy chính xác place_id để đi kiểm tra trong db
        const requestPlaceByAddressResult = await googleMapService.requestPlaceIdFromAddress(data.oriAddress)
        
        if (requestPlaceByAddressResult.code) {
          console.error(requestPlaceByAddressResult.message);
          return;
        }

        const geocodingOri = requestPlaceByAddressResult.data;

        console.log('🚀 ~ file: direction.service.js:60 ~ generateRouteDirection ~ geocodingOri:', geocodingOri)
        oriToCheck = geocodingOri.place_id
        oriRouteInfo = {
          place_id: geocodingOri.place_id,
          name: geocodingOri.formatted_address,
          geometry: geocodingOri.geometry
        }
  
      } else if (data.typeOri === 'coordinate') {
        // geocoding 2 thằng origin và destination để lấy chính xác place_id để đi kiểm tra trong db
        const requestPlaceByAddressResult = await googleMapService.requestPlaceIdFromCoor({ latitude: data.oriCoor.latitude, longitude: data.oriCoor.longitude })
        
        if (requestPlaceByAddressResult.code) {
          console.error(requestPlaceByAddressResult.message);
          return;
        }

        const geocodingOri = requestPlaceByAddressResult.data;
        oriToCheck = geocodingOri.place_id
      }
  
      if (data.typeDes === 'place_id') {
        desToCheck = data.desPlaceId
      } else if (data.typeDes === 'address') {
        // geocoding 2 thằng origin và destination để lấy chính xác place_id để đi kiểm tra trong db
        const requestPlaceByAddressResult = await googleMapService.requestPlaceIdFromAddress(data.desAddress)

        if (requestPlaceByAddressResult.code) {
          console.error(requestPlaceByAddressResult.message);
          return;
        }

        const geocodingDes = requestPlaceByAddressResult.data;

        console.log('🚀 ~ file: direction.service.js:71 ~ getRouteDirection ~ geocodingDes:', geocodingDes)
        desToCheck = geocodingDes.place_id
        desRouteInfo = {
          place_id: geocodingDes.place_id,
          name: geocodingDes.formatted_address,
          geometry: geocodingDes.geometry
        }
      } else if (data.typeDes === 'coordinate') {
        // geocoding 2 thằng origin và destination để lấy chính xác place_id để đi kiểm tra trong db
        const requestPlaceByAddressResult = await googleMapService.requestPlaceIdFromCoor({ latitude: data.oriCoor.latitude, longitude: data.oriCoor.longitude })
        
        if (requestPlaceByAddressResult.code) {
          console.error(requestPlaceByAddressResult.message);
          return;
        }
        
        const geocodingDes = requestPlaceByAddressResult.data;
        desToCheck = geocodingDes.place_id
      }
  
      console.log('oriToCheck', oriToCheck)
      console.log('desToCheck', desToCheck)
      // Kiểm tra trong database xem có geocoded_waypoints có hai đứa này không
      let checkWaypointsDb = await DirectionModel.findOriDesPlaceId(oriToCheck, desToCheck)
      console.log('🚀 ~ file: direction.service.js:72 ~ getRouteDirection ~ checkWaypointsDb:', checkWaypointsDb)
  
      const indexOfWay = checkWaypointsDb.findIndex(way => way.transport === data.modeGCP)
      // nếu indexOfWay = -1 là tìm không thấy
      if (checkWaypointsDb.length !== 0 && indexOfWay !== -1) {
        console.log('Lấy trong DB')
        console.log('🚀 ~ file: direction.service.js:83 ~ getRouteDirection ~ indexOfWay:', indexOfWay)
  
        console.log('🚀 vaof ~ indexOfWay:')
  
        // Nếu có thì lấy về luôn. À quên đối với GCP còn phải encode points
        // Muốn decode thì sẽ tiếp cận từ routes(là mảng -> số đường đi từ A -> B)
        if (checkWaypointsDb[indexOfWay].callFrom === 'GCP') {
          checkWaypointsDb[indexOfWay].data.routes.map(route => {
            const legs = route.legs
            if (legs) {
              legs.map(leg => {
                // xử lý thằng duration và staticDuration tách s ra chuyển về number
                leg.duration = Number(leg.duration.split('s')[0])
                leg.staticDuration = Number(leg.staticDuration.split('s')[0])
  
                const steps = leg.steps
                if (steps) {
                  steps.map(step => {
                    // xử lý thằng staticDuration tách s ra chuyển về number
                    step.staticDuration = Number(step.staticDuration.split('s')[0])
  
                    const points = polyline.decode(step.polyline.encodedPolyline)
                    const pointsToUpdate = []
                    points.map(point => pointsToUpdate.push({ latitude: point[0], longitude: point[1] }))
                    step.polyline = pointsToUpdate
                  })
                }
              })
            }
            // Xử lý decode polyline
            const points = polyline.decode(route.polyline.encodedPolyline)
            const pointsToUpdate = []
            points.map(point => pointsToUpdate.push({ latitude: point[0], longitude: point[1] }))
            route.polyline = pointsToUpdate
            // xử lý thằng duration và staticDuration tách s ra chuyển về number
            route.duration = Number(route.duration.split('s')[0])
            route.staticDuration = Number(route.staticDuration.split('s')[0])
          })
        }
  
        result = {
          data: checkWaypointsDb[indexOfWay].data,
          callFrom: checkWaypointsDb[indexOfWay].callFrom,
          oriPlaceId: oriToCheck ? oriToCheck : null,
          desPlaceId: desToCheck ? desToCheck : null
        }
        console.log('🚀 ~ file: direction.service.js:125 ~ getRouteDirection ~ result:', result)
  
      } else {
      // Nếu không có thì phải gọi thằng GCP direction
        console.log('Call API')
  
        let drirection
        let body = {
          origin: oriToCheck ? { placeId: oriToCheck } : { latitude: data.oriCoor.latitude, longitude: data.oriCoor.longitude },
          destination: desToCheck ? { placeId: desToCheck } : { latitude: data.desCoor.latitude, longitude: data.desCoor.longitude },
          mode: data.modeGCP,
          routeModifiers: data.routeModifiers,
          languageCode: data.languageCode
        }
  
        if (!body.routeModifiers) {
          delete body.routeModifiers
        }
  
        let directionTranformYet
        drirection = await RoutesGoogleMapProvider.getComputeRoutesGCP(body)
  
  
        if (!drirection.error) {
          // Nếu thằng drirection trả về không có routes nghĩa là không tìm thấy
          if (!drirection.routes || drirection.routes.length === 0) {
            return {
              error: 'This route is not supported or not found!'
            }
          }
          // Biến đổi dữ liệu trả về
          directionTranformYet = cloneDeep(drirection)
          drirection.routes.map(route => {
            const legs = route.legs
            if (legs) {
              legs.map(leg => {
                // xử lý thằng duration và staticDuration tách s ra chuyển về number
                leg.duration = Number(leg.duration.split('s')[0])
                leg.staticDuration = Number(leg.staticDuration.split('s')[0])
  
                const steps = leg.steps
                if (steps) {
                  steps.map(step => {
                    // xử lý thằng staticDuration tách s ra chuyển về number
                    step.staticDuration = Number(step.staticDuration.split('s')[0])
  
                    const points = polyline.decode(step.polyline.encodedPolyline)
                    const pointsToUpdate = []
                    points.map(point => pointsToUpdate.push({ latitude: point[0], longitude: point[1] }))
                    step.polyline = pointsToUpdate
                  })
                }
              })
            }
            // Xử lý decode polyline
            const points = polyline.decode(route.polyline.encodedPolyline)
            const pointsToUpdate = []
            points.map(point => pointsToUpdate.push({ latitude: point[0], longitude: point[1] }))
            route.polyline = pointsToUpdate
            // xử lý thằng duration và staticDuration tách s ra chuyển về number
            route.duration = Number(route.duration.split('s')[0])
            route.staticDuration = Number(route.staticDuration.split('s')[0])
          })
          result = {
            data: drirection,
            callFrom: 'GCP',
            transport: data.modeGCP,
            oriPlaceId: oriToCheck ? oriToCheck : null,
            desPlaceId: desToCheck ? desToCheck : null
          }
        }

        if (data.isCallFromChatBot) {
          result.oriRouteInfo = oriRouteInfo
          result.desRouteInfo = desRouteInfo
        }

      return result;
    });
  }
}

export const directionService = new DirectionService();

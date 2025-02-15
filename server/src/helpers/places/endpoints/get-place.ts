// Import helpers
import { buildFullProjection } from "src/helpers/places/projections";
import { transformPlaceContentWithLanguage } from "src/helpers/places/transforms";
import { getLanguageFromQuery } from "src/helpers/other/get-language";
import { computeStateOfPlace } from "src/helpers/places/states-computer";

// Import types
import type { Request, Response } from "express";
import type { DongNaiTravelModelsType } from "src/databases/dongnaitravel";
import type { HTTPResponseDataType } from "src/utils/http";

export default async function getPlace(
  MC: DongNaiTravelModelsType,
  req: Request,
  res?: Response,
  o?: HTTPResponseDataType
) {
  if (!req.params.id) {
    o!.code = 400;
    throw new Error("Id of place is required");
  }

  // Process query
  const lang = getLanguageFromQuery(req);
  const { userId } = req.query as any;

  // Get place from database
  let query = MC.Places.findOne({ _id: req.params.id });

  // Build populations
  buildFullProjection(query);

  // Compute user's state
  let aggregateResultPromise;
  // if (AuthService.isAuthorizedRequest(req) && userId)
  if (userId) {
    // aggregateResultPromise = queryWithAggregate(
    //   req.params.id,
    //   MC,
    //   userId
    // );
  }

  const promises = [query.exec()];

  if (aggregateResultPromise) {
    promises.push(aggregateResultPromise);
  }

  const [place, aggregateResult] = await Promise.all(promises);

  if (!place) {
    o!.code = 404;
    throw new Error(`Place isn't found`);
  }

  const placeJSON = place.toJSON();

  // Final transform data
  const result = transformPlaceContentWithLanguage(placeJSON, lang);

  return computeStateOfPlace(result, userId);
}

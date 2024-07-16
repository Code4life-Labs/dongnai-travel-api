// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "../../index.types";

export type Mongo_Place_AddressComoponent = {
  shortName: string;
  longName: string;
  types: Array<string>;
};

export type Mongo_Place_Coordinate = {
  lat: number;
  lng: number;
};

export type Mongo_Place_Geometry = {
  location: Mongo_Place_Coordinate;
  viewport: {
    northeast: Mongo_Place_Coordinate;
    southwest: Mongo_Place_Coordinate;
  };
};

export type Mongo_Place_PlusCode = {
  compoundCode: string;
  globalCode: string;
};

export type Mongo_Place_ContentModel = {
  _id: ObjectId | string;
  plainText: {
    vi: string;
    en: string;
  };
  formattedText: {
    vi: string;
    en: string;
  };
  speech?: {
    vi: { female: string; male: string };
    en: { female: string; male: string };
  };
} & BaseModel;

export type Mongo_Place_PhotoModel = {
  _id: ObjectId | string;
  photos: Array<string>;
} & BaseModel;

// Use for base type of place
type $Extendable = {
  _id: ObjectId | string;
  addressComponents: Array<Mongo_Place_AddressComoponent>;
  businessStatus: "OPERATIONAL" | "CLOSED";
  geometry: Mongo_Place_Geometry;
  phoneNumber: string;
  name: string;
  plusCode: Mongo_Place_PlusCode;
  rating: number;
  types: Array<string>;
  url: string;
  website: string;
  userRatingsTotal: number;
  isRecommended: boolean;
  userFavoritesTotal: number;
  visitsTotal: number;
} & BaseModel;

// The complete Place data structure (Place Document)
export type Mongo_PlaceModel = {
  placeId: string;
  contentId: string;
  photosId: string;
} & $Extendable;

// The actual place data structure (A data that is joined from multiple documents)
export type Mongo_Place = {
  content: Mongo_Place_ContentModel;
  photos: Array<string>;
  isLiked: boolean;
  isVisited: boolean;
} & $Extendable;

export type Mongo_PlaceQuery = {};

export type Mongo_PlacesQuery = {
  types?: string;
  name?: string;
  quality?: string;
  isRecommended?: string;
} & BaseMultipleRecordsQuery;

export type Mongo_PlaceParams = {
  id?: string;
};

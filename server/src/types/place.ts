// Import types
import type { ObjectId } from "mongodb";
import type { BaseMultipleRecordsQuery, BaseModel } from "./general";

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

export type Mongo_Place_OpenHour = {
  weekDay: number;
  from: string;
  to: string;
};

export type Mongo_Place_PlusCode = {
  compoundCode: string;
  globalCode: string;
};

// Use for base type of place
type $Extendable = {
  _id: ObjectId | string;
  placeId: ObjectId | string;
  addressComponents: Array<Mongo_Place_AddressComoponent>;
  geometry: Mongo_Place_Geometry;
  description: string;
  phoneNumber: string;
  name: string;
  plusCode: Mongo_Place_PlusCode;
  openHours: Array<Mongo_Place_OpenHour>;
  url: string;
  photos: Array<string>;
  website: string;
  isRecommended: boolean;
} & BaseModel;

// The complete Place data structure (Place Document)
export type Mongo_PlaceModel = {
  typeIds: Array<ObjectId | string>;
} & $Extendable;

// User state in place / final query of place
export type Mongo_Place = {
  businessStatus: any;
  types: Array<any>;
  totalFavorites: number;
  totalVisits: number;
  totalReviews: number;
  rating: number;
  isLiked: boolean;
  isVisited: boolean;
} & $Extendable;

// Use in request
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

// Import types
import type { BaseMultipleRecordsQuery } from "../../index.types";

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

export type Mongo_Place_Content = {
  _id: string;
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
  createdAt: number;
  updatedAt: number;
};

// Use for base type of place
type $Extendable = {
  _id: string;
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
  updatedAt: number;
  createdAt: number;
};

// The complete Place data structure (Place Document)
export type Mongo_PlaceModel = {
  placeId: string;
  contentId: string;
  photosId: string;
} & $Extendable;

// The actual place data structure (A data that is joined from multiple documents)
export type Mongo_Place = {
  content: Mongo_Place_Content;
  photos: Array<string>;
  isLiked: boolean;
  isVisited: boolean;
} & $Extendable;

export type Mongo_PlaceQuery = {};

export type Mongo_PlacesQuery = BaseMultipleRecordsQuery;

export type Mongo_PlaceParams = {
  id?: string;
};

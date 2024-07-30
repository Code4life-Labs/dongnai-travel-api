// Import types
import type { Interchange } from "./data.types";

export type DatabaseTypes = "Mongo";

export interface IDatabase {
  connect(): Promise<void>;
}

export interface IModel<T> {
  query?(...args: Array<any>): Promise<Interchange<any | null>>;
  create?(...args: Array<any>): Promise<Interchange<any | null>>;
  update?(...args: Array<any>): Promise<Interchange<any | null>>;
  delete?(...args: Array<any>): Promise<Interchange<any | null>>;
  queryMultiply?(...args: Array<any>): Promise<Interchange<Array<any> | null>>;
  createMultiply?(...args: Array<any>): Promise<Interchange<any | null>>;
  updateMultiply?(...args: Array<any>): Promise<Interchange<any | null>>;
  deleteMultiply?(...args: Array<any>): Promise<Interchange<any | null>>;
}

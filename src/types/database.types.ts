// Import types
import type { Interchange } from "./data.types";

export type DatabaseTypes = "Mongo";

export interface IDatabase {
  connect(): Promise<void>;
}

export interface IModel<T> {
  query?<R>(...args: Array<any>): Promise<Interchange<R | T | null>>;
  create?<R>(...args: Array<any>): Promise<Interchange<R | T | null>>;
  update?<R>(...args: Array<any>): Promise<Interchange<R | T | null>>;
  delete?<R>(...args: Array<any>): Promise<Interchange<R | T | null>>;
  queryMultiply?<R>(
    ...args: Array<any>
  ): Promise<Interchange<Array<R | T> | null>>;
  createMultiply?<R>(...args: Array<any>): Promise<Interchange<R | T | null>>;
  updateMultiply?<R>(...args: Array<any>): Promise<Interchange<R | T | null>>;
  deleteMultiply?<R>(...args: Array<any>): Promise<Interchange<R | T | null>>;
}

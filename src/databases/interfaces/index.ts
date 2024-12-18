export interface IObjectModel {
  getModelFields?(): Array<string>;
  getFields(excludes?: Array<string>): Array<string>;
}

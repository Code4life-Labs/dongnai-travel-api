export interface IObjectModel {
  getFields(): Array<string>;
  getCompleteFields?(): Array<string>;
  getReducedFields?(): Array<string>;
}

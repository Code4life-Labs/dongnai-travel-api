export type Policy = {
  type: string;
  resources: string | Array<string>;
  actions: string | Array<string>;
};

export type Policy = {
  type: string;
  resources: Array<string> | string;
  actions: Array<string> | string;
};

export type Policies = { [R: string]: Array<Policy> };

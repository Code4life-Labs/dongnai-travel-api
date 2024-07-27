export type TokenPayload = {
  role: string;
  expire: number;
  provider: string;
  actions: Array<string>;
};

export type BaseMultipleRecordsQuery = {
  limit?: string;
  skip?: string;
};

export type BaseParams = {
  id: string;
};

export type BaseModel = {
  createdAt: number;
  updatedAt: number;
};

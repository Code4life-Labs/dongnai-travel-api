// Import types
import mysql from "mysql2";
import type { ConnectionOptions, QueryResult, FieldPacket } from "mysql2";

export class MySQLUtils {
  constructor() {

  }

  isResultEmpty(result: [QueryResult, Array<FieldPacket>]) {
    return (Array.isArray(result[0]) && result[0].length === 0);
  }

  getConnectionObj(domain: string, username: string, password: string, database: string) {
    return {
      host: domain,
      user: username,
      password,
      database
    } as ConnectionOptions
  }
}
import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import mongodb settings
import { AppSettings } from "src/settings";

// Import types
import type { IModel } from "src/types/database.types";
import type {
  MySQL_Teacher,
  MySQL_TeachersQuery,
  MySQL_TeachersParams
} from "../index.types";
import type { MySQLUtils } from "../utils";
import type { MySQL_Instances, MySQL_DBInformations } from "..";

export class TeacherModel
  extends Model<MySQL_Instances, MySQL_Teacher>
  implements IModel<MySQL_Teacher>
{
  private __localUtils!: MySQLUtils;
  private __dbInfo!: MySQL_DBInformations;

  constructor(
    mysqls: MySQL_Instances,
    localUtils: MySQLUtils,
    dbInformations: MySQL_DBInformations
  ) {
    super(mysqls, dbInformations.OBJECTS.COURSES);
    this.schema = Joi.object<MySQL_Teacher>({
      id: Joi.number().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required()
    });
    this.__localUtils = localUtils;
    this.__dbInfo = dbInformations;
  }

  /**
   * Get collection doesn't work in this context (mySQL)
   * @returns 
   */
  private __getCollection() {
    return null;
  }

  async query(...args: [MySQL_TeachersParams]) {
    return await this.handleInterchangeError<MySQL_Teacher, this>(this, async function(o) {
      // If request has params
      if(!args[0]) throw new Error("The params of teacher query is required");

      const result = await this.db.SIMPLE_API.promise().query(`
        SELECT *
        FROM ${this.__dbInfo.OBJECTS.TEACHERS}
        WHERE ${this.__dbInfo.OBJECTS.TEACHERS}.id = ${args[0].id}
      `);

      if(this.__localUtils.isResultEmpty(result)) throw new Error(`Teacher is not found`);

      o.data = (result[0] as any)[0] as MySQL_Teacher;
      o.message = "Query teacher successfully";
      
      return o;
    });
  }
  
  async queryMultiply(...args: [MySQL_TeachersQuery]) {
    return await this.handleInterchangeError<Array<MySQL_Teacher>, this>(this, async function(o) {
      const limit = !args[0].limit ? 10 : args[0].limit,
            skip  = !args[0].skip ? 0 : args[0].skip;

      const result = await this.db.SIMPLE_API.promise().query(`
        SELECT *
        FROM ${this.__dbInfo.OBJECTS.TEACHERS}
        LIMIT ${limit} OFFSET ${skip}
      `);

      if(this.__localUtils.isResultEmpty(result)) throw new Error(`Teachers are not found`);

      o.data = result[0] as Array<MySQL_Teacher>;
      o.message = "Query teachers successfully";
      
      return o;
    });
  }
}
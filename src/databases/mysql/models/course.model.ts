import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import mongodb settings
import { AppSettings } from "src/settings";

// Import types
import type { IModel } from "src/types/database.types";
import type {
  MySQL_Course,
  MySQL_CourseResponseData,
  MySQL_CoursesQuery,
  MySQL_CoursesParams
} from "../index.types";
import type { MySQLUtils } from "../utils";
import type { MySQL_Instances, MySQL_DBInformations } from "..";

export class CourseModel
  extends Model<MySQL_Instances, MySQL_Course>
  implements IModel<MySQL_CourseResponseData>
{
  private __localUtils!: MySQLUtils;
  private __dbInfo!: MySQL_DBInformations;

  constructor(
    mysqls: MySQL_Instances,
    localUtils: MySQLUtils,
    dbInformations: MySQL_DBInformations
  ) {
    super(mysqls, dbInformations.OBJECTS.COURSES);
    this.schema = Joi.object<MySQL_Course>({
      id: Joi.number().required(),
      teacherId: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      periodDay: Joi.number().required()
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

  async query(...args: [MySQL_CoursesParams]) {
    return await this.handleInterchangeError<MySQL_CourseResponseData, this>(this, async function(o) {
      // If request has params
      if(!args[0]) throw new Error("The params of course query is required");

      const result = await this.db.SIMPLE_API.promise().query(`
        SELECT ${this.__dbInfo.OBJECTS.COURSES}.id, name, shortDesc, price, periodDay,
               JSON_OBJECT('firstName', firstName, 'lastName', lastName) as teacher
        FROM ${this.__dbInfo.OBJECTS.COURSES}
          LEFT JOIN ${this.__dbInfo.OBJECTS.TEACHERS}
          ON ${this.__dbInfo.OBJECTS.TEACHERS}.id = ${this.__dbInfo.OBJECTS.COURSES}.teacherId
        WHERE ${this.__dbInfo.OBJECTS.COURSES}.id = ${args[0].id}
      `);

      if(this.__localUtils.isResultEmpty(result)) throw new Error(`Course is not found`);

      o.data = (result[0] as any)[0] as MySQL_CourseResponseData;
      o.message = "Query course successfully";
      
      return o;
    });
  }
  
  async queryMultiply(...args: [MySQL_CoursesQuery]) {
    return await this.handleInterchangeError<Array<MySQL_CourseResponseData>, this>(this, async function(o) {
      const limit = !args[0].limit ? 10 : args[0].limit,
            skip  = !args[0].skip ? 0 : args[0].skip;

      const result = await this.db.SIMPLE_API.promise().query(`
        SELECT ${this.__dbInfo.OBJECTS.COURSES}.id, name, shortDesc, price, periodDay,
               JSON_OBJECT('firstName', firstName, 'lastName', lastName) as teacher
        FROM ${this.__dbInfo.OBJECTS.COURSES}
          LEFT JOIN ${this.__dbInfo.OBJECTS.TEACHERS}
          ON ${this.__dbInfo.OBJECTS.TEACHERS}.id = ${this.__dbInfo.OBJECTS.COURSES}.teacherId
        LIMIT ${limit} OFFSET ${skip}
      `);

      if(this.__localUtils.isResultEmpty(result)) throw new Error(`Courses are not found`);

      o.data = result[0] as Array<MySQL_CourseResponseData>;
      o.message = "Query courses successfully";
      
      return o;
    });
  }
}
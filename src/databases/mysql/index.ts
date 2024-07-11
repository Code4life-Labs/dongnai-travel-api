import mysql from "mysql2";

// Import classes
import { Database } from "../../classes/Database";

// Import utils
import { MySQLUtils } from "./utils";

// Import models
import { CourseModel } from "./models/course.model";
import { TeacherModel } from "./models/teacher.model";

// Import settings
import { AppSettings } from "src/settings";

const __settings = AppSettings.MYSQL;

export type MySQL_Instances = {
  [K in keyof typeof __settings]: mysql.Connection;
}

export type MySQL_DBInformations = {
  [K in keyof typeof __settings.SIMPLE_API.DB]: typeof __settings.SIMPLE_API.DB[K];
}

export class MySQLDatabase extends Database<MySQL_Instances, MySQLUtils> {
  course!: CourseModel;
  teacher!: TeacherModel;

  constructor() {
    super(new MySQLUtils());
    
    let clusterNames = Object.keys(__settings);

    for(let clusterName of clusterNames) {
      this.instances[clusterName as keyof typeof __settings] = mysql.createConnection(
        this.localUtils.getConnectionObj(
          __settings[clusterName as keyof typeof __settings].DOMAIN!,
          __settings[clusterName as keyof typeof __settings].USERNAME!,
          __settings[clusterName as keyof typeof __settings].PASSWORD!,
          __settings[clusterName as keyof typeof __settings].DB.NAME
        )!
      );
    }

    this.course = new CourseModel(this.instances, this.localUtils, __settings.SIMPLE_API.DB);
    this.teacher = new TeacherModel(this.instances, this.localUtils, __settings.SIMPLE_API.DB);
  }

  async connect() {
    try {
      let dbNames = Object.keys(this.instances);

      for(let dbName of dbNames) {
        console.log(`  ${dbName} DB - status:`, this.utils.logger.yellow("connecting..."));
        await this.instances[dbName as keyof typeof this.instances].promise().connect();
        console.log(`  ${dbName} DB - status:`, this.utils.logger.green("connected"));
      }

    } catch (error: any) {
      console.error(error.message);
    }
  }
}
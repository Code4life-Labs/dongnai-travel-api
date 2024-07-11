import { StringUtil } from "./string";
import { ObjectUtil } from "./object";
import { HTTPUtil } from "./http";
import { NumberUtil } from "./number";
import { CryptoUtil } from "./crypto";
import { DatetimeUtil } from "./datetime";
import { LoggerUtil } from "./logger";

export class Utils {
  string!: StringUtil;
  object!: ObjectUtil;
  http!: HTTPUtil;
  nunber!: NumberUtil;
  crypto!: CryptoUtil;
  datetime!: DatetimeUtil;
  logger!: LoggerUtil;

  constructor() {
    this.string = new StringUtil();
    this.object = new ObjectUtil();
    this.http = new HTTPUtil();
    this.nunber = new NumberUtil();
    this.crypto = new CryptoUtil();
    this.datetime = new DatetimeUtil();
    this.logger = new LoggerUtil();
  }
}
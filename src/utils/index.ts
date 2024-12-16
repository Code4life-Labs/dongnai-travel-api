import { BooleanUtil } from "./boolean";
import { CryptoUtil } from "./crypto";
import { DatetimeUtil } from "./datetime";
import { HTTPUtil } from "./http";
import { LoggerUtil } from "./logger";
import { ObjectUtil } from "./object";
import { NumberUtil } from "./number";
import { PathUtils } from "./path";
import { StringUtil } from "./string";

export class Utils {
  boolean!: BooleanUtil;
  crypto!: CryptoUtil;
  datetime!: DatetimeUtil;
  http!: HTTPUtil;
  logger!: LoggerUtil;
  nunber!: NumberUtil;
  object!: ObjectUtil;
  path!: PathUtils;
  string!: StringUtil;

  constructor() {
    this.boolean = new BooleanUtil();
    this.crypto = new CryptoUtil();
    this.datetime = new DatetimeUtil();
    this.http = new HTTPUtil();
    this.logger = new LoggerUtil();
    this.nunber = new NumberUtil();
    this.object = new ObjectUtil();
    this.path = new PathUtils();
    this.string = new StringUtil();
  }
}

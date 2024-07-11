const Colors = {
  black:   "\x1b[30m",
  red:     "\x1b[31m",
  green:   "\x1b[32m",
  yellow:  "\x1b[33m",
  blue:    "\x1b[34m",
  magenta: "\x1b[35m",
  cyan:    "\x1b[36m",
  gray:    "\x1b[37m",
  reset:   "\x1b[0m"
};

export class LoggerUtil {
  __getColor(text: any, type: keyof typeof Colors) {
    if(!Colors[type]) return "";
    if(!this.isStr(text)) return "";
    if(type === "reset") return Colors[type];

    return Colors[type] + text + Colors.reset;
  }

  black(text: string) {
    return this.__getColor(text, "black")
  }

  red(text: string) {
    return this.__getColor(text, "red")
  }

  green(text: string) {
    return this.__getColor(text, "green")
  }

  yellow(text: string) {
    return this.__getColor(text, "yellow")
  }

  blue(text: string) {
    return this.__getColor(text, "blue")
  }

  magenta(text: string) {
    return this.__getColor(text, "magenta")
  }

  cyan(text: string) {
    return this.__getColor(text, "cyan")
  }

  gray(text: string) {
    return this.__getColor(text, "gray")
  }

  reset(text: string) {
    return this.__getColor(text, "reset")
  }


  isStr(text: any) {
    return typeof text === "string";
  }

  log(...args: Array<any>) {
    console.log(...args);
  }

  error(...args: Array<any>) {
    console.error(...args);
  }
}
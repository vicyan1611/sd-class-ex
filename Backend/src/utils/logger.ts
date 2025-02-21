import fs from "fs";
import path from "path";

class Logger {
  private logFile: string;

  constructor() {
    const logDir = path.join(__dirname, "../logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    this.logFile = path.join(logDir, "app.log");
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}\n`;
  }

  private writeLog(message: string) {
    fs.appendFileSync(this.logFile, message);
  }

  info(message: string) {
    const formattedMessage = this.formatMessage("INFO", message);
    console.log(formattedMessage);
    this.writeLog(formattedMessage);
  }

  error(message: string, error?: any) {
    const errorMessage = error ? `${message}: ${error.message}` : message;
    const formattedMessage = this.formatMessage("ERROR", errorMessage);
    console.error(formattedMessage);
    this.writeLog(formattedMessage);
  }

  warn(message: string) {
    const formattedMessage = this.formatMessage("WARN", message);
    console.warn(formattedMessage);
    this.writeLog(formattedMessage);
  }
}

export const logger = new Logger();

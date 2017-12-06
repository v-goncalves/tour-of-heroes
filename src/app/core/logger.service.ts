import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  constructor() {}

  debug(s: string) {
    window.console.debug(s);
  }

  log(s: string) {
    window.console.log(s);
  }

  info(s: string) {
    window.console.info(s);
  }

  warn(s: string) {
    window.console.warn(s);
  }

  error(s: string) {
    window.console.error(s);
  }
}

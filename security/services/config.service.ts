import { Injectable, Optional } from '@angular/core';


export class Config {
  config:object={}
}

@Injectable()
export class ConfigService {

  private _config:object={}

  constructor(@Optional() configModule: Config) {
    if (configModule) { this._config = configModule; }
  }

  get getConfig():object {

    return this._config;
  }
}

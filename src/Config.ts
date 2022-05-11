import {
  DEFAULT_CONFIG_MESSAGE,
  DEFAULT_CONFIG_SCRIPTS,
  JABIRACA_FILE_PATH,
} from '@Constants';
import { ConfigFileAttributes } from '@Types';
import { createJSON } from '@Utils';

class Config {
  private filepath: string;
  private message: string = DEFAULT_CONFIG_MESSAGE;
  private scripts: string[] = DEFAULT_CONFIG_SCRIPTS;

  constructor(initParams: string) {
    this.filepath = JABIRACA_FILE_PATH;

    this.setInitParams(initParams);
  }

  setInitParams(initParams: string) {
    const params = initParams.split(' ');
    console.log(params);
  }

  createConfigFile() {
    const json = createJSON<ConfigFileAttributes>({});
    console.log(json);
    // create file
  }
}

export default Config;

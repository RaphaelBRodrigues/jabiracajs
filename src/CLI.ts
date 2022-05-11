import { CLIConfig } from '@Types';
import { Command } from 'commander';
import Config from 'Config';
import { CLI_DESCRIPTION, CLI_NAME, CLI_VERSION } from '@Constants';
import Sound from 'Sound';

class CLI {
  private program = new Command();
  private sound = new Sound();
  private config: Config;

  constructor() {
    this.program
      .name(CLI_NAME)
      .version(CLI_VERSION)
      .description(CLI_DESCRIPTION);
  }

  start() {
    this.program
      .option('--filepath <filepath>', 'play custom file')
      .option('--volume <volume>', 'sound volume')
      .option('--repeat <times>', 'repeat the sound')
      .option('--infinite', 'put the sound in infinite loop')
      .option('--init', 'create a .sweetwarningrc file')
      .parse();

    this.checkOptions();
    this.playSound();
  }

  checkOptions() {
    const { init, options } = this.program.opts();

    if (init) {
      this.createInitialConfig(init);
    } else {
      this.configureSound({ ...options });
    }
  }

  createInitialConfig(initParams: string) {
    this.config = new Config(initParams);
    this.config.createConfigFile();
    return true;
  }

  configureSound(config: CLIConfig) {
    const { filepath, volume, repeat, infinite } = config;

    try {
      if (filepath) this.sound.filepath = filepath;
      if (volume) this.sound.volume = volume;
      if (repeat) {
        this.sound.shouldRepeat = true;
        this.sound.repeatTimes = repeat;
      }
      if (infinite) {
        this.sound.shouldRepeat = true;
        this.sound.repeatTimes = Infinity;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  playSound() {
    if (this.sound.shouldRepeat) {
      this.sound.repeat();
    } else {
      this.sound.play();
    }
  }
}

export default CLI;

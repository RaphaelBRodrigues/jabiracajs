import { Command } from 'commander';
import { CLI_DESCRIPTION, CLI_NAME, CLI_VERSION } from './constants';
import Sound from './Sound';

class CLI {
  private program = new Command();
  private sound = new Sound();

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
      .parse();

    this.checkOptions();
    this.playSound();
  }

  checkOptions() {
    const options = this.program.opts();

    this.configureSound({ ...options });
  }

  configureSound(config: {
    filepath?: string;
    volume?: number;
    repeat?: number;
  }) {
    const { filepath, volume, repeat } = config;

    if (filepath) this.sound.filepath = filepath;
    if (volume) this.sound.volume = volume;
    if (repeat) {
      this.sound.shouldRepeat = true;
      this.sound.repeatTimes = repeat;
    }
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

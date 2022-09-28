import { Command } from 'commander';
import { CLI_DESCRIPTION, CLI_NAME, CLI_VERSION } from './constants';
import { ICLI } from './@types/CLI';
import Sound from './Sound';

class CLI implements ICLI {
  program = new Command();
  sound = new Sound();

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
      .parse();

    this.checkOptions();
    this.playSound();
  }

  checkOptions() {
    const options = this.program.opts();

    this.sound.configure({ ...options });
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

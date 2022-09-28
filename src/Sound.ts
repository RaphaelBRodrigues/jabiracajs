import SoundPlayer from 'play-sound';
import fs from 'fs';
import { JABIRACA_FILE_PATH, SoundErrors } from './constants';
import { ChildProcess, ExecException } from 'child_process';
import { isWindows, playOnPowerShell } from './utils';
import { ISound, Callback, SoundConfig, StartPlayProcessCallback, Player } from './@types/Sound';

class Sound implements ISound {
  _filepath: string = JABIRACA_FILE_PATH;
  _volume: number = 0.5;
  _repeatTimes: number = 0;
  _shouldRepeat: boolean = false;
  playProcess: ChildProcess;
  player: Player;

  constructor(filepath?: string, volume?: number) {
    this._filepath = filepath || this._filepath;
    this._volume = volume || this._volume;
    this.player = SoundPlayer({});

  }

  set filepath(newFilepath: string) {
    this._filepath = newFilepath;
  }

  set volume(volume: number) {
    try {
      if (volume > 0 && volume <= 1) {
        this._volume = volume;
      } else {
        throw new Error(SoundErrors.INVALID_VOLUME);
      }
    } catch (err) {
      console.error(err);
    }
  }

  set repeatTimes(repeatTimes: number) {
    this._repeatTimes = repeatTimes;
  }

  set shouldRepeat(shouldRepeat: boolean) {
    this._shouldRepeat = shouldRepeat;
  }

  get shouldRepeat() {
    return this._shouldRepeat;
  }

  validateFile() {
    const fileExists = fs.existsSync(this._filepath);

    if (!fileExists) {
      throw new Error(SoundErrors.INVALID_FILE);
    }
  }

  startPlayProcess(callback: StartPlayProcessCallback) {
    if (isWindows()) {
      this.playProcess = playOnPowerShell(this._filepath);
      this.playProcess.on('exit', (e) => {
        callback(this.playProcess);
      });
    } else {
      this.playProcess = this.player.play(this._filepath, {}, (err: ExecException) => {
        callback(this.playProcess);
        if (err && !err.killed) {
          throw err;
        }
      });
    }
  }

  configure(config: SoundConfig) {
    const { filepath, volume, repeat, infinite } = config;

    if (filepath) this.filepath = filepath;
    if (volume) this.volume = volume;
    if (repeat) {
      this.shouldRepeat = true;
      this.repeatTimes = repeat;
    }
    if (infinite) {
      this.shouldRepeat = true;
      this.repeatTimes = Infinity;
    }
  }

  play(
    callback: Callback = () => { }
  ) {
    try {
      this.validateFile();
      this.startPlayProcess(callback);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  pause() {
    try {
      if (this.playProcess.killed) {
        throw new Error(SoundErrors.PAUSE_ERROR);
      }

      this.playProcess.kill();
    } catch (err) {
      console.error(err);
    }
  }

  async repeat(currentRepeat: number = 1) {
    try {
      await new Promise((resolve) => {
        resolve(this.play());
      });

      if (this._repeatTimes > currentRepeat) {
        await this.repeat(currentRepeat + 1);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default Sound;

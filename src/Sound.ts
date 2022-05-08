import SoundPlay from 'play-sound';
import fs from 'fs';
import { JABIRACA_FILE_PATH } from './constants';
import { ChildProcess } from 'child_process';
import { isWindows, playOnPowerShell } from './utils';

class Sound {
  private _filepath: string = JABIRACA_FILE_PATH;
  private _volume: number = 0.5;
  private _repeatTimes: number = 0;
  private _shouldRepeat: boolean = false;
  private playProcess: ChildProcess;
  private player = SoundPlay({
    player: 'powershell',
  });

  constructor(filepath?: string, volume?: number) {
    this._filepath = filepath || this._filepath;
    this._volume = volume || this._volume;
  }

  set filepath(newFilepath: string) {
    this._filepath = newFilepath;
  }

  set volume(volume: number) {
    try {
      if (volume > 0 && volume < 1) {
        this._volume = volume;
      } else {
        throw new Error(
          'Invalid value to volume, it should be between 0 and 1',
        );
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

  private validateFile() {
    const fileExists = fs.existsSync(this._filepath);

    if (!fileExists) {
      throw new Error("File doesn't exists");
    }
  }

  startPlayProcess() {
    if (isWindows()) {
      this.playProcess = playOnPowerShell(this._filepath);
    } else {
      this.playProcess = this.player.play(this._filepath, {}, (err) => {
        if (err && !err.killed) {
          throw err;
        }
      });
    }
  }

  play(callback: Function = () => {}) {
    try {
      this.validateFile();
      this.startPlayProcess();

      callback();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async pause() {
    try {
      this.playProcess.kill();
      throw new Error('Could not pause the sound');
    } catch (err) {
      console.error(err);
    }
  }

  async repeat(currentRepeat: number = 1) {
    try {
      await new Promise((resolve) => {
        this.play(resolve);
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

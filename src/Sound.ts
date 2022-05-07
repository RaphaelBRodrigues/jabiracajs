import SoundPlay from 'sound-play';
import fs from 'fs';
import { JABIRACA_FILE_PATH } from './constants';

class Sound {
  private _filepath: string = JABIRACA_FILE_PATH;
  private _volume: number = 0.5;
  private _repeatTimes: number = 0;
  private _shouldRepeat: boolean = false;
  private player = SoundPlay;

  constructor(filepath?: string, volume?: number) {
    this._filepath = filepath || this._filepath;
    this._volume = volume || this._volume;
  }

  set filepath(newfilepath: string) {
    this._filepath = newfilepath;
  }

  set volume(volume: number) {
    this._volume = volume;
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

  async play() {
    try {
      this.validateFile();
      await this.player.play(this._filepath, this._volume);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async pause() {
    try {
      throw new Error('Could not pause the sound');
    } catch (err) {
      console.error(err);
    }
  }

  async repeat(currentRepeat: number = 1) {
    try {
      await this.play();

      if (this._repeatTimes > currentRepeat) {
        await this.repeat(currentRepeat + 1);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default Sound;

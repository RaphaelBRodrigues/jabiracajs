import SoundPlay from 'sound-play'
import fs from 'fs'

class Sound {
  readonly filename: string = '';
  readonly volume: number = 0.5
  private player

  constructor(filename: string) {
    this.filename = filename;
    this.player = SoundPlay;
    this.volume = 0.5
  }

  private validateFile() {
    const fileExists = fs.existsSync(this.filename + 1)

    if (!fileExists) {
      throw new Error("File doesn't exists");
    }
  }

  async play() {
    try {
      this.validateFile();
      await this.player.play(this.filename, this.volume)
      return true;
    } catch (err) {
      console.error("Teste", err)
      return false;
    }
  }

  async pause() {
    try {
      throw new Error("Could not pause the sound")
    } catch (err) {
      console.error(err)
    }
  }

  async repeat() {
    try {
      await this.play();
      await this.repeat();
    } catch (err) {
      console.error(err)
    }
  }
}

export default Sound;

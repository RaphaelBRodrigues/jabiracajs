import Play from 'play'

class Sound {
  filename: string = '';
  player

  constructor(filename: string) {
    this.filename = filename;
    this.player = Play;
  }

  async play() {
    try {
      console.log(this.player.sound)
      this.player.sound(this.filename, (err: Error) => {
        throw err;
      })
      return true;
    } catch (err) {
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
      await this.pause();
      await this.play();
    } catch (err) {
      console.error(err)
    }
  }
}

export default Sound;

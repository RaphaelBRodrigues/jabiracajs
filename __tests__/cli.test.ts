import CLI from '../src/CLI'

jest.mock('commander', () => {
  return {
    Command: class {
      name = jest.fn().mockReturnValue({
        version: jest.fn().mockReturnValue({
          description: jest.fn()
        }),
      });

      opts = jest.fn().mockReturnValue({})
    }
  }
})

const makeSut = () => {
  const cli = new CLI();

  return cli;
}


describe("CLI", () => {
  it("Should be a instance of CLI", () => {
    const sut = makeSut();

    expect(sut).toBeInstanceOf(CLI);
  });

  it("Should configure the sound", () => {
    const sut = makeSut();
    const opts = {
      volume: 0.3,
      infinite: true
    };

    sut.program.opts = jest.fn().mockReturnValue(opts);
    sut.sound.configure = jest.fn().mockImplementation(options => options);

    sut.checkOptions()

    expect(sut.sound.configure).toHaveBeenCalled();
    expect(sut.sound.configure).toHaveLastReturnedWith(opts)
  })

  it("Should play a sound", () => {
    const sut = makeSut();
    sut.sound.play = jest.fn();
    sut.sound.repeat = jest.fn();

    sut.playSound();
    expect(sut.sound.play).toHaveBeenCalledTimes(1)

    sut.sound.shouldRepeat = true;
    sut.playSound();
    sut.playSound();

    expect(sut.sound.repeat).toHaveBeenCalledTimes(2);
  })
});
import { SoundErrors } from '../src/constants';
import Sound from '../src/Sound';

const makeSut = () => {
  return new Sound();
}


describe("Sound", () => {
  it("Should throw when a invalid volume is set", () => {
    const sut = makeSut();
    console.error = jest.fn();

    sut.volume = 123;

    expect(console.error).toHaveBeenCalled();
  });

  it("Should set a valid volume value", () => {
    const sut = makeSut();
    sut.volume = 1;

    expect(sut._volume).toBe(1);
  })

  it("Should throw if the file does not exists", () => {
    const sut = makeSut();

    sut.filepath = "invalid file";

    expect(() => sut.validateFile()).toThrowError(SoundErrors.INVALID_FILE)
  });

  it("Should not throw if the file does not exists", () => {
    const sut = makeSut();

    expect(() => sut.validateFile()).not.toThrow()
  });

  // it("Should call playOnPowerShell with the correct args", () => {
  // })

});
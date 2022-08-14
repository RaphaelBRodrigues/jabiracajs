import isWindows from '../src/utils/isWindows'


describe("Check the operational system", () => { 
  it("should return false when is not a windows system", () => {
    Object.defineProperty(process, "platform", {
      value: "linux"
    });

    const result = isWindows();

    expect(result).toBeFalsy();
  });

  it("should return true when is a windows system", () => {
    Object.defineProperty(process, "platform", { 
      value: "win32"
    });

     const result = isWindows();

    expect(result).toBeTruthy()
  });

})
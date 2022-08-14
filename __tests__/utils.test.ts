import { ChildProcess } from 'child_process';
import { playOnPowerShell, isWindows } from '../src/utils'
import { JABIRACA_FILE_PATH } from '../src/constants'


const plataform = process.platform;

describe("Check the operational system", () => { 
  beforeEach(() => {
    Object.defineProperty(process, "platform", {
      value: plataform
    });
  })

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

  it('should return a child_process of powershell when is a windows system', () => {
    if (isWindows()) {
      const childProcess = playOnPowerShell(JABIRACA_FILE_PATH);
      childProcess.kill();

      expect(childProcess.pid).toBeDefined();
      expect(childProcess).toBeInstanceOf(ChildProcess);
    } 
  }); 
})
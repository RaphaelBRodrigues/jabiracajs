import { ChildProcess } from 'child_process';
import isWindows from '../src/utils/isWindows'
import { playOnPowerShell } from '../src/utils'
import { JABIRACA_FILE_PATH } from '../src/constants'

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

  it('should return a child_process of powershell when is a windows system', () => {
    if (isWindows()) {
      const childProcess = playOnPowerShell(JABIRACA_FILE_PATH);
      childProcess.kill();
      console.log(childProcess);

      expect(childProcess.pid).toBeDefined();
      expect(childProcess).toBeInstanceOf(ChildProcess);
    } 
  });
})
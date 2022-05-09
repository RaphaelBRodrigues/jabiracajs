/**
 * 
 * @returns If the OS that the application is being used is Wwindows
 */
export default function isWindows() {
  return process.platform.includes('win');
}

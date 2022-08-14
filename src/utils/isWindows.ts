/**
 * 
 * @returns Check if the OS that the application is running is Windows
 */
export default function isWindows() {
  return process.platform.includes('win');
}

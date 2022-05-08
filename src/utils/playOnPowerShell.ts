import child_process from 'child_process';

/**
 * Play a audio on windows powershell
 * @param {string} filepath - The filepath of the audio that will be played
 * @returns The child process
 */
export default function playOnPowerShell(filepath: string) {
  const spawn = child_process.spawn;
  const child = spawn('powershell', [
    '$PlayWav=New-Object System.Media.SoundPlayer;',
    `$PlayWav.SoundLocation='${filepath}';`,
    '$PlayWav.playsync()',
  ]);

  child.stderr.on('data', function (error) {
    throw new Error(error);
  });

  child.stdin.end();
  return child;
}

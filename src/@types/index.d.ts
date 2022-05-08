declare module 'play-sound' {
  // Type definitions for play-sound 1.1
  // Project: https://github.com/shime/play-sound
  // Definitions by: Corbin Crutchley <https://github.com/crutchcorn>
  // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

  /// <reference types="node" />

  import { ChildProcess, ExecException } from 'child_process';

  export type Players =
    | 'mplayer'
    | 'afplay'
    | 'mpg123'
    | 'mpg321'
    | 'play'
    | 'omxplayer'
    | 'aplay'
    | 'powershell'
    | 'cmdmp3.exe'
    | 'mplayer.exe'
    | 'afplay.exe'
    | 'mpg123.exe'
    | 'mpg321.exe'
    | 'play.exe'
    | 'omxplayer.exe'
    | 'aplay.exe'
    | 'powershell.exe'
    | 'cmdmp3.exe';

  interface PlayOpts {
    players: Players[];
    player: Players;
  }

  type PlayMethodOptions = Partial<
    {
      [key in Players]: Array<string | number | boolean>;
    } & {
      timeout: number;
    }
  >;

  declare class Play {
    constructor(opts?: Partial<PlayOpts>);

    player: unknown;
    players: Players[];
    urlRegex: RegExp;

    play(
      what: string,
      options?: PlayMethodOptions,
      next?: (err: ExecException) => void,
    ): ChildProcess;
    play(what: string, next?: (err: ExecException) => void): ChildProcess;

    test(next?: (err: ExecException) => void): ChildProcess;
  }

  declare function defaultExport(opts?: Partial<PlayOpts>): Play;

  export = defaultExport;
}

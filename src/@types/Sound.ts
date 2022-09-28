import { ChildProcess } from "child_process";
import SoundPlayer from 'play-sound';

export type Callback = () => void
export type StartPlayProcessCallback = (process: ChildProcess) => void;
export type SoundConfig = {
  filepath?: string;
  volume?: number;
  repeat?: number;
  infinite?: number;
}

export type Player = {
  play(...args: any): ChildProcess
}


export interface ISound {
  readonly _filepath: string;
  readonly _volume: number;
  readonly _repeatTimes: number;
  readonly _shouldRepeat: boolean;
  readonly playProcess: ChildProcess;
  readonly player: Player;
  validateFile(): void;
  startPlayProcess(callback: StartPlayProcessCallback): void;
  repeat(currentRepeat: number): Promise<void>;
  configure(config: SoundConfig): void;
  play(callback?: Callback): void;
  pause(): void;
}

import { Command } from "commander";
import Sound from "../Sound";

export interface ICLI {
  readonly program: Command;
  readonly sound: Sound;
  start(): void;
  checkOptions(): void;
  playSound(): void;
} 
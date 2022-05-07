type PlayCallback = (err: Error) => void

declare module 'play' {
  export function sound(sound: string, callback?: PlayCallback): void
  export function kill(): void
}
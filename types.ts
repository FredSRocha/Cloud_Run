
export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export const COLORS = [
  'Blue',
  'Green',
  'Red',
  'Yellow',
  'Purple',
  'Orange',
  'Pink',
] as const;

export type Color = typeof COLORS[number];

export type BpmData = number[];

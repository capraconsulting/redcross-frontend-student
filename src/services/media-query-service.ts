import { MediaQuery } from '../enums/media-query';

export const isScreenLargerThanOrEqual = (screen: MediaQuery): boolean =>
  window.matchMedia(`(min-width: ${screen}px)`).matches;

export const isScreenLargerThan = (screen: MediaQuery): boolean =>
  window.matchMedia(`(min-width: ${screen + 1}px)`).matches;

export const isScreenSmallerThanOrEqual = (screen: MediaQuery): boolean =>
  window.matchMedia(`(max-width: ${screen}px)`).matches;

export const isScreenSmallerThan = (screen: MediaQuery): boolean =>
  window.matchMedia(`(max-width: ${screen - 1}px)`).matches;

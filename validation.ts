import {
  COLOR_BLAZING,
  COLOR_FAST,
  COLOR_MEDIUM,
  COLOR_SLOW,
  TPS_THRESHOLD_BLAZING,
  TPS_THRESHOLD_FAST,
  TPS_THRESHOLD_MEDIUM,
  TPS_THRESHOLD_SLOW,
} from "./constants";
import { type TokenSpeedConfig } from "./interfaces";

/**
 * Validates that TPS thresholds are in strict ascending order:
 * tpsSlow < tpsMedium < tpsFast < tpsBlazing.
 *
 * @param config The configuration object containing the four threshold values.
 * @returns True if all thresholds are in ascending order; false otherwise.
 */
export const isValidThresholdOrder = (config: TokenSpeedConfig): boolean => {
  const {
    tpsSlow = TPS_THRESHOLD_SLOW,
    tpsMedium = TPS_THRESHOLD_MEDIUM,
    tpsFast = TPS_THRESHOLD_FAST,
    tpsBlazing = TPS_THRESHOLD_BLAZING,
  } = config;

  return tpsSlow < tpsMedium && tpsMedium < tpsFast && tpsFast < tpsBlazing;
};

/**
 * Validates that the string is a valid 24-bit truecolor ANSI hex string.
 *
 * @param s The string to validate
 * @returns True if the string is a valid hex color; false otherwise
 */
export const isValidHex = (s: string): boolean => /^#[0-9a-fA-F]{6}$/.test(s);

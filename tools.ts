import { ExtensionUIContext } from "@earendil-works/pi-coding-agent";

import { getConfig } from "./config";
import {
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
function isValidThresholdOrder(config: TokenSpeedConfig): boolean {
  const {
    tpsSlow = TPS_THRESHOLD_SLOW,
    tpsMedium = TPS_THRESHOLD_MEDIUM,
    tpsFast = TPS_THRESHOLD_FAST,
    tpsBlazing = TPS_THRESHOLD_BLAZING,
  } = config;

  return tpsSlow < tpsMedium && tpsMedium < tpsFast && tpsFast < tpsBlazing;
}

/**
 * Setup and validation utilities for the token-speed extension.
 * Handles one-time initialization during session start.
 *
 * @param uiHandler The Pi UI handler for displaying notifications and status updates.
 */
export function initialize(uiHandler: ExtensionUIContext): void {
  const config = getConfig();

  if (!isValidThresholdOrder(config)) {
    const message = [
      "[pi-token-speed] TPS thresholds must be in ascending order.",
      `Found: ${config.tpsSlow} < ${config.tpsMedium} < ${config.tpsFast} < ${config.tpsBlazing}. `,
      "Falling back to defaults.",
    ].join("\n");

    uiHandler?.notify(message, "warning");
  }
}

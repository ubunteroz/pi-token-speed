import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import {
  COLOR_BLAZING,
  COLOR_FAST,
  COLOR_MEDIUM,
  COLOR_SLOW,
  STATUS_KEY,
  TPS_THRESHOLD_BLAZING,
  TPS_THRESHOLD_FAST,
  TPS_THRESHOLD_MEDIUM,
  TPS_THRESHOLD_SLOW,
} from "./constants";
import { TokenSpeedConfig } from "./interfaces";
import { isValidThresholdOrder } from "./validation";

/**
 * Cached settings
 */
let userSettings: TokenSpeedConfig | null = null;
let config: TokenSpeedConfig | null = null;

/**
 * Reads ~/.pi/agent/settings.json and extracts the "tokenSpeed" settings block.
 *
 * @returns A partial TokenSpeedConfig with values from the user's settings file,
 *          or an empty TokenSpeedConfig if the file or key is missing.
 */
const readUserSettings = (): TokenSpeedConfig => {
  const emptyResponse = {} as TokenSpeedConfig;

  try {
    const settingsPath = join(homedir(), ".pi", "agent", "settings.json");
    const raw = readFileSync(settingsPath, "utf-8");
    const settings = JSON.parse(raw) as Record<string, unknown>;
    const response = settings[STATUS_KEY] as TokenSpeedConfig | undefined;

    if (!response) return emptyResponse;

    return response;
  } catch {
    // File doesn't exist, invalid JSON, or permission error
    return emptyResponse;
  }
};

/**
 * Retrieves the default configuration object.
 *
 * @returns Default configuration object
 */
const getDefaultConfig = (): TokenSpeedConfig => {
  return {
    tpsSlow: TPS_THRESHOLD_SLOW,
    tpsMedium: TPS_THRESHOLD_MEDIUM,
    tpsFast: TPS_THRESHOLD_FAST,
    tpsBlazing: TPS_THRESHOLD_BLAZING,
    colorSlow: COLOR_SLOW,
    colorMedium: COLOR_MEDIUM,
    colorFast: COLOR_FAST,
    colorBlazing: COLOR_BLAZING,
    display: "tps",
  };
};

/**
 * Resolves the final config, merging user settings from ~/.pi/agent/settings.json
 * with the built-in constants as fallbacks.
 */
export const getConfig = (): {
  config: TokenSpeedConfig;
  errors: Array<string>;
} => {
  const errors: string[] = [];
  if (config) return { config, errors };

  const defaultSettings = getDefaultConfig();
  userSettings ??= readUserSettings();

  const merged = { ...defaultSettings, ...userSettings };

  // Validate thresholds
  if (!isValidThresholdOrder(merged)) {
    errors.push("[pi-token-speed] TPS thresholds must be in ascending order.");
    errors.push(
      `Found: ${merged.tpsSlow} < ${merged.tpsMedium} < ${merged.tpsFast} < ${merged.tpsBlazing}. `,
    );
  }

  // Validate display
  if (!["tps", "full"].includes(merged.display)) {
    merged.display = "tps";
  }

  config = { ...merged };
  return { config, errors };
};

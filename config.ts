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

/**
 * Cached user settings loaded from ~/.pi/agent/settings.json.
 * Loaded once and reused for subsequent calls to getConfig().
 */
let userSettings: TokenSpeedConfig | null = null;

/**
 * Reads ~/.pi/agent/settings.json and extracts the "tokenSpeed" settings block.
 * Returns a partial TokenSpeedConfig containing only the values found in the file.
 * Defaults are applied by getConfig() after this returns.
 *
 * @returns A partial TokenSpeedConfig with values from the user's settings file,
 *          or an empty TokenSpeedConfig if the file or key is missing.
 */
function readUserSettings(): TokenSpeedConfig {
  const emptyResponse = {} as TokenSpeedConfig;

  try {
    const settingsPath = join(homedir(), ".pi", "agent", "settings.json");
    const raw = readFileSync(settingsPath, "utf-8");
    const settings = JSON.parse(raw) as Record<string, unknown>;
    const tokenSpeed = settings[STATUS_KEY] as TokenSpeedConfig | undefined;

    if (!tokenSpeed) return emptyResponse;

    return tokenSpeed;
  } catch {
    // File doesn't exist, invalid JSON, or permission error
    return emptyResponse;
  }
}

/**
 * Resolves the final config, merging user settings from ~/.pi/agent/settings.json
 * with the built-in constants as fallbacks.
 */
export function getConfig(): TokenSpeedConfig {
  userSettings ??= readUserSettings();

  const response: TokenSpeedConfig = {
    tpsSlow: TPS_THRESHOLD_SLOW,
    tpsMedium: TPS_THRESHOLD_MEDIUM,
    tpsFast: TPS_THRESHOLD_FAST,
    tpsBlazing: TPS_THRESHOLD_BLAZING,
    colorSlow: COLOR_SLOW,
    colorMedium: COLOR_MEDIUM,
    colorFast: COLOR_FAST,
    colorBlazing: COLOR_BLAZING,
    display: "tps",
    ...(userSettings as Partial<TokenSpeedConfig>),
  };

  // Validate display — userSettings could have an invalid value
  if (!["tps", "full"].includes(response.display)) {
    response.display = "tps";
  }

  return response;
}

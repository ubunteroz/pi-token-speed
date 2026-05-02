/**
 * Identifier for the status bar entry
 */
export const STATUS_KEY = "token-speed";

/**
 * Sliding window duration in milliseconds for time-based TPS calculation
 */
export const TPS_WINDOW_MS = 1000;

/**
 * TPS threshold below which speed is considered slow
 */
export const TPS_THRESHOLD_SLOW = 15;

/**
 * TPS threshold below which speed is considered medium
 */
export const TPS_THRESHOLD_MEDIUM = 30;

/**
 * TPS threshold below which speed is considered fast
 */
export const TPS_THRESHOLD_FAST = 45;

/**
 * Color used when TPS is below the slow threshold
 */
export const COLOR_SLOW = "#ff4444";

/**
 * Color used when TPS is between slow and medium thresholds
 */
export const COLOR_MEDIUM = "#ffaa00";

/**
 * Color used when TPS is between medium and fast thresholds
 */
export const COLOR_FAST = "#00ff88";

/**
 * Color used when TPS exceeds the fast threshold
 */
export const COLOR_BLAZING = "#44ddff";

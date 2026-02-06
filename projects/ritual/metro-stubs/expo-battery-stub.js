/**
 * Expo Battery Stub
 * Mock implementation for expo-battery when not installed
 */

module.exports = {
  getBatteryLevelAsync: () => Promise.resolve(1),
  getBatteryStateAsync: () => Promise.resolve(2), // BatteryState.UNPLUGGED
  isLowPowerModeEnabledAsync: () => Promise.resolve(false),
  getPowerStateAsync: () => Promise.resolve({
    batteryLevel: 1,
    batteryState: 2,
    lowPowerMode: false,
  }),
  addBatteryLevelListener: () => ({ remove: () => {} }),
  addBatteryStateListener: () => ({ remove: () => {} }),
  addLowPowerModeListener: () => ({ remove: () => {} }),
  BatteryState: {
    UNKNOWN: 0,
    UNPLUGGED: 1,
    CHARGING: 2,
    FULL: 3,
  },
};

/**
 * Expo AV Stub
 * Mock implementation for expo-av when not installed
 */

const createStubSound = () => ({
  loadAsync: () => Promise.resolve({}),
  playAsync: () => Promise.resolve({}),
  pauseAsync: () => Promise.resolve({}),
  stopAsync: () => Promise.resolve({}),
  unloadAsync: () => Promise.resolve({}),
  setPositionAsync: () => Promise.resolve({}),
  setVolumeAsync: () => Promise.resolve({}),
  setRateAsync: () => Promise.resolve({}),
  getStatusAsync: () => Promise.resolve({}),
  setOnPlaybackStatusUpdate: () => {},
});

module.exports = {
  Audio: {
    Sound: createStubSound,
    setAudioModeAsync: () => Promise.resolve({}),
  },
  Video: {
    RESIZE_MODE_CONTAIN: 'contain',
    RESIZE_MODE_COVER: 'cover',
    RESIZE_MODE_STRETCH: 'stretch',
  },
};

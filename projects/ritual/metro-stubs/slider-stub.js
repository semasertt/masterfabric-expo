/**
 * React Native Community Slider Stub
 * Mock implementation for @react-native-community/slider when not installed
 */

const React = require('react');
const { View } = require('react-native');

module.exports = React.forwardRef((props, ref) => {
  return React.createElement(View, { ...props, ref });
});

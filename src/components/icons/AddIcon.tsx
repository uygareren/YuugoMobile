import React from 'react';
import { Svg, Circle, Line } from 'react-native-svg';

const AddIcon = ({ color = "#000000", size = 200 }) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <Circle cx="100" cy="100" r="90" fill="none" stroke={color} strokeWidth="4" strokeDasharray="10,10" />
    <Line x1="100" y1="50" x2="100" y2="150" stroke={color} strokeWidth="4" />
    <Line x1="50" y1="100" x2="150" y2="100" stroke={color} strokeWidth="4" />
  </Svg>
);

export default AddIcon;

import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Text, TSpan } from 'react-native-svg';

const PointCoin = () => {
  return (
    <View>
      <Svg width="100" height="100" viewBox="0 0 100 100">
        {/* Yuvarlak şekil */}
        <Circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2" fill="#FFA500" />

        {/* Özelleştirilmiş 'y' harfi */}
        <Text
          x="50%"
          y="50%"
          fontFamily="'Brush Script MT', cursive"
          fontSize="50"
          fill="#FFFFFF"
          textAnchor="middle"
          alignmentBaseline="middle"
          transform="rotate(-10 50 50)"
        >
            y
        </Text>
      </Svg>
    </View>
  );
};

export default PointCoin;

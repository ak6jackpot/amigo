import * as React from 'react';
import {Circle, G, Svg, TSpan, Text, TextPath} from 'react-native-svg';

export const CircularText = ({text = '', fontsize = '40'}) => (
  <Svg height="90%" width="90%" viewBox="0 0 300 300">
    <G id="circle">
      <Circle
        r={100}
        x={150}
        y={150}
        fill="none"
        stroke="#00008b"
        strokeWidth={0}
      />
    </G>
    <Text fill="#000" fontSize={fontsize} fontFamily="Ubuntu-Regular">
      <TextPath href="#circle">
        <TSpan dy={-14}>{text}</TSpan>
      </TextPath>
    </Text>
  </Svg>
);

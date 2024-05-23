import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

type RightArrowProps = {
  size?: string;
  color?: string;
};

export const RightArrow = ({
  size = '64px',
  color = '#fff',
}: RightArrowProps) => (
  <Svg
    enableBackground="new 0 0 32 32"
    height={size}
    id="\u0421\u043B\u043E\u0439_1"
    viewBox="0 0 32 32"
    width={size}
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <G id="Arrow_Right_Circle">
      <Path
        d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16c8.836,0,16-7.164,16-16C32,7.163,24.836,0,16,0z M16,30   C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2s14,6.268,14,14C30,23.732,23.732,30,16,30z"
        fill={color}
      />
      <Path
        d="M25.707,15.286l-6.899-6.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.395-0.391,1.034,0,1.429l5.2,5.275   H7c-0.552,0-1,0.452-1,1.01c0,0.558,0.448,1.01,1,1.01h15.593l-5.2,5.275c-0.39,0.394-0.39,1.034,0,1.428   c0.391,0.394,1.024,0.394,1.414,0l6.899-6.999C25.893,16.527,26,16.264,26,16C26,15.737,25.892,15.474,25.707,15.286z"
        fill={color}
      />
    </G>
    <G />
    <G />
    <G />
    <G />
    <G />
    <G />
  </Svg>
);

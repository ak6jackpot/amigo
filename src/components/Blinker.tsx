import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

interface BlinkerProps {
  size?: number;
  color?: string;
}

export const Blinker: React.FC<BlinkerProps> = ({
  size = 16,
  color = '#266ef1',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: -((size * 7) / 16),
      }}>
      <View
        style={{
          height: size,
          width: 10,
          backgroundColor: color,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </View>
  );
};

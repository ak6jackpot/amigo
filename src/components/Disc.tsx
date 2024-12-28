import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import {CircularText} from './CircularText';
import {Color} from '../utils/displayUtils';

type DiscProps = {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  color?: string;
  icon?: any;
  mt?: string;
  ml?: string;
};

export const Disc = ({
  size = 'medium',
  text = '',
  color = Color?.whiteBg,
  icon = faCircle,
  mt = '50%',
  ml = '50%',
}: DiscProps) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Interpolation to map the rotation value to degrees
  const rotateAnimation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Function to trigger the rotation animation
  const startRotating = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 10000, // 2 seconds for one complete rotation
        useNativeDriver: true,
      }),
    ).start();
  };

  // Start the animation on component mount
  useEffect(() => {
    startRotating();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: size == 'small' ? 80 : size == 'medium' ? 120 : 160,
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1000,
          backgroundColor: color,
          position: 'absolute',
          marginLeft: ml,
          marginTop: mt,
          zIndex: 2,
        },
        {transform: [{rotate: rotateAnimation}]},
      ]}>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CircularText text={text} />
      </View>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{rotate: '180deg'}],
        }}>
        <CircularText text={text} />
      </View>

      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesomeIcon
          icon={icon}
          size={size === 'small' ? 20 : size === 'medium' ? 30 : 40}
        />
      </View>
    </Animated.View>
  );
};

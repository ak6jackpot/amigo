import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import {OpeningCard} from '../components/OpeningCard';

export const HomeScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeIn();

    setTimeout(() => {
      fadeOut();
    }, 5000);
  }, []);
  return (
    <>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View style={{opacity: fadeAnim}}>
          <OpeningCard />
        </Animated.View>
      </View>
    </>
  );
};

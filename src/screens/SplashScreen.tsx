import React from 'react';
import {Text, View} from 'react-native';
import ButtonComp from '../components/ButtonComp';
import TextComp from '../components/TextComp';
import {screenHeight, screenWidth} from '../Utils';

export const SplashScreen = () => {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: '#f7e8b2',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
        height: screenHeight,
      }}>
      <Text
        style={{
          fontFamily: 'KaushanScript-Regular',
          fontSize: 30,
          color: 'black',
        }}>
        amigo
      </Text>
      <TextComp text={'Travel Plan'} variant="heading" />

      <TextComp
        text={'Travel anywhere in the world'}
        variant="label"
        size="small"
      />

      <TextComp text={'without any hassle'} variant="label" size="small" />

      <ButtonComp
        text="Try now!"
        color="#EEA0FF"
        textColor="#190b14"
        shape="pill"
      />
    </View>
  );
};

import React from 'react';
import {Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {screenHeight, screenWidth} from '../Utils';
import Typography from './Typography';

export const OpeningCard = () => {
  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LinearGradient
        key={1}
        colors={['#e07116', '#e0b816']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 0.0}}
        style={{
          width: '80%',
          height: '60%',
          padding: 7,
          borderRadius: 40,
          zIndex: 3,
        }}>
        <LinearGradient
          key={2}
          colors={['#16c9e0', '#192f6a', '#190b14']}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 0.0}}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 35,
            zIndex: 4,
          }}>
          <Pressable
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography text={'Welcome to AMIGO!'} />
            <Typography text={'🥳🥳🥳'} />
          </Pressable>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

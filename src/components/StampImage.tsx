import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

export const StampImage = ({image = ''}) => {
  return (
    <View style={{position: 'absolute'}}>
      <FastImage
        style={{
          height: 200,
          aspectRatio: 1,
          position: 'absolute',
          zIndex: 2,
        }}
        resizeMode={FastImage.resizeMode.contain}
        source={require('../assets/images/frame.png')}
      />
      <FastImage
        style={{
          height: 180,
          aspectRatio: 1,
          position: 'absolute',
          zIndex: 1,
          margin: 8,
        }}
        resizeMode={FastImage.resizeMode.contain}
        source={image}
      />
    </View>
  );
};

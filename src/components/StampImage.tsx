import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RightArrow} from '../assets/images/RightArrow';

export const StampImage = ({image = '', text1 = '', text2 = ''}) => {
  return (
    <View style={{position: 'absolute'}}>
      <FastImage
        style={{
          height: 240,
          aspectRatio: 1,
          position: 'absolute',
          zIndex: 2,
        }}
        resizeMode={FastImage.resizeMode.contain}
        source={require('../assets/images/frame.png')}
      />
      <FastImage
        style={{
          height: 220,
          aspectRatio: 1,
          position: 'absolute',
          zIndex: 1,
          margin: 8,
        }}
        resizeMode={FastImage.resizeMode.contain}
        source={image}
      />
      {/* <View
        style={{
          zIndex: 3,
          marginLeft: 4,
          marginTop: 16,
          flex: 1,
          width: 144,
          alignItems: 'flex-start',
          // backgroundColor:'yellow',
          transform: [{rotate: '-30deg'}],
        }}>
        <TextComp
          text={text1}
          variant="heading"
          textStyles={{flexShrink: 1, flex: 1}}
          color={'#000'}
          textAlign="center"
        />
      </View>
      <View
        style={{
          zIndex: 3,
          marginLeft: 96,
          flex: 1,
          width: 144,
          alignItems: 'flex-end',
          // backgroundColor:'yellow',
          transform: [{rotate: '-30deg'}],
        }}>
        <TextComp
          text={text2}
          variant="heading"
          textStyles={{flexShrink: 1, flex: 1}}
          color={'#000'}
          textAlign="center"
        />
      </View> */}
      <View
        style={{
          height: 240,
          aspectRatio: 1,
          position: 'absolute',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          zIndex: 4,
          marginTop: 30,
          marginLeft: -40,
          transform: [{rotate: '-30deg'}],
        }}>
        <RightArrow color="#000" />
      </View>
    </View>
  );
};

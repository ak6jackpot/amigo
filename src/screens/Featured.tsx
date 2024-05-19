import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Video from 'react-native-video';
import paris from '../assets/images/Paris.jpg';
import dubai from '../assets/images/Dubai.jpg';
import agra from '../assets/images/Agra.jpg';
import barcelona from '../assets/images/Barcelona.jpg';
import colosseum from '../assets/images/Colosseum.jpg';
import france from '../assets/images/France.jpg';
import greece from '../assets/images/Greece.jpg';
import newyork from '../assets/images/NewYork.jpg';
import peru from '../assets/images/Peru.jpg';
import rio from '../assets/images/Rio.jpg';
import {StampImage} from '../components/StampImage';

export const Featured = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: '#FEF9F5',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        <Video
          source={require('../assets/videos/video_02.mov')}
          style={{width: '100%', aspectRatio: 0.5625, position: 'absolute'}}
          repeat
        />
        <StampImage image={paris} />
        <StampImage image={dubai} />
        <StampImage image={agra} />
        <StampImage image={barcelona} />
        <StampImage image={colosseum} />
        <StampImage image={peru} />
        <StampImage image={rio} />
        <StampImage image={newyork} />
        <StampImage image={france} />
        <StampImage image={greece} />
      </View>
    </SafeAreaView>
  );
};

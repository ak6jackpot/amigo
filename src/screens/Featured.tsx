import React, {useRef} from 'react';
import {Animated, SafeAreaView, View} from 'react-native';
import Video from 'react-native-video';
import {screenHeight, screenWidth} from '../Utils';
import agra from '../assets/images/Agra.jpg';
import barcelona from '../assets/images/Barcelona.jpg';
import colosseum from '../assets/images/Colosseum.jpg';
import dubai from '../assets/images/Dubai.jpg';
import france from '../assets/images/France.jpg';
import newyork from '../assets/images/NewYork.jpg';
import paris from '../assets/images/Paris.jpg';
import peru from '../assets/images/Peru.jpg';
import rio from '../assets/images/Rio.jpg';
import {StampImage} from '../components/StampImage';

export const Featured = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateX = scrollY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [0, -screenWidth],
    extrapolate: 'clamp',
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [0, -screenHeight],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.ScrollView
        contentContainerStyle={{flexGrow: 1}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
        <View
          style={{
            backgroundColor: '#FEF9F5',
            justifyContent: 'center',
            height: screenHeight * 2,
            width: '100%',
            alignItems: 'center',
          }}>
          <Video
            source={require('../assets/videos/video_03.mov')}
            style={{height: '100%', aspectRatio: 0.5625, position: 'absolute'}}
            repeat
          />
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 1500,
              right: 300,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={paris} />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 1250,
              right: 250,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={dubai} />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 1000,
              right: 200,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={agra} />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 750,
              right: 150,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={barcelona} />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 500,
              right: 100,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={colosseum} />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 250,
              right: 50,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={peru} />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={rio} />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -250,
              right: -50,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={newyork} />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -500,
              right: -100,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={france} />
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

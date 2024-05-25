import React, {useRef} from 'react';
import {Animated, View} from 'react-native';
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
import Typography from '../components/Typography';

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
    <View style={{flex: 1}}>
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
            source={require('../assets/videos/video_04.mov')}
            style={{
              height: '100%',
              aspectRatio: 0.25,
              position: 'absolute',
              zIndex: 0,
            }}
            repeat
          />
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 1400,
              right: 200,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={dubai} text1={'The Palms'} text2="Dubai" />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 1150,
              right: 150,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={agra} text1={'Taj Mahal'} text2="Agra" />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 900,
              right: 100,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage
              image={barcelona}
              text1="Basilica de la Sagrada Familia"
              text2="Barcelona"
            />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 650,
              right: 50,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage
              image={colosseum}
              text1={'The Colosseum'}
              text2="Rome"
            />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 400,
              right: 0,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={peru} text1={'Machhu Pichhu'} text2="Peru" />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 150,
              right: -50,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage
              image={rio}
              text1={'Christ the Redeemer'}
              text2={'Rio de Janeiro'}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -100,
              right: -100,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage
              image={newyork}
              text1={'Empire State Building'}
              text2={'New York'}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -350,
              right: -150,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={france} text1="Louvre" text2="Paris" />
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -600,
              right: -200,
              transform: [{translateX}, {translateY}],
            }}>
            <StampImage image={paris} text1={'Eiffel Tower'} text2="Paris" />
          </Animated.View>
        </View>
      </Animated.ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography text={'Experience Life'} variant="display" color="#fff" />
      </View>
    </View>
  );
};

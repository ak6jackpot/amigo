import React, {useRef} from 'react';
import {Animated, View} from 'react-native';
import Video from 'react-native-video';
import {Color, screenHeight, screenWidth} from '../Utils';
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

  const featuredData = [
    {
      image: dubai,
      text1: 'The Palms Jumerah',
      text2: 'Dubai',
      mapsId: 'ChIJFTtlwikVXz4RFj5Kdq68yj0',
      tripAdvId: '15016790',
    },
    {
      image: agra,
      text1: 'Taj Mahal',
      text2: 'Agra',
      mapsId: 'ChIJbf8C1yFxdDkR3n12P4DkKt0',
      tripAdvId: '317329',
    },
    {
      image: barcelona,
      text1: 'Basilica de la Sagrada Familia',
      text2: 'Barcelona',
      mapsId: 'ChIJk_s92NyipBIRUMnDG8Kq2Js',
      tripAdvId: '190166',
    },
    {
      image: colosseum,
      text1: 'The Colosseum',
      text2: 'Rome',
      mapsId: 'ChIJrRMgU7ZhLxMRxAOFkC7I8Sg',
      tripAdvId: '292124',
    },
    {
      image: peru,
      text1: 'Machu Picchu',
      text2: 'Peru',
      mapsId: 'ChIJVVVViV-abZERJxqgpA43EDo',
      tripAdvId: '294318',
    },
    {
      image: rio,
      text1: 'Christ the Redeemer',
      text2: 'Rio de Janeiro',
      mapsId: 'ChIJP6FKmNV_mQAR3gKVAdeEyZ0',
      tripAdvId: '554128',
    },
    {
      image: newyork,
      text1: 'Empire State Building',
      text2: 'New York',
      mapsId: 'ChIJaXQRs6lZwokRY6EFpJnhNNE',
      tripAdvId: '104365',
    },
    {
      image: france,
      text1: 'Louvre',
      text2: 'Paris',
      mapsId: 'ChIJD3uTd9hx5kcR1IQvGfr8dbk',
      tripAdvId: '188757',
    },
    {
      image: paris,
      text1: 'Eiffel Tower',
      text2: 'Paris',
      mapsId: 'ChIJLU7jZClu5kcR4PcOOO6p3I0',
      tripAdvId: '188151',
    },
  ];

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
            backgroundColor: Color.beigeBg,
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
            resizeMode="cover"
          />
          {featuredData?.map((item, index) => {
            return (
              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: 1400 - index * 250,
                  right: 200 - index * 50,
                  transform: [{translateX}, {translateY}],
                }}>
                <StampImage data={item} />
              </Animated.View>
            );
          })}
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

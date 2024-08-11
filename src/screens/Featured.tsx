import React, {useRef} from 'react';
import {Animated, View} from 'react-native';
import Video from 'react-native-video';
import {Color, screenHeight, screenWidth} from '../Utils';
import {StampImage} from '../components/StampImage';
import Typography from '../components/Typography';
import {functionDataStore} from '../storeDefinitions';
import LoaderKit from 'react-native-loader-kit';
import {featuredData} from '../data';
import {observer} from 'mobx-react-lite';

export const Featured = observer(() => {
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
      {functionDataStore?.functionData?.loaderVisible && (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}>
          <View
            style={{
              padding: 16,
              borderRadius: 24,
            }}>
            <LoaderKit
              style={{width: 48, height: 48}}
              name={'BallPulse'}
              color={Color?.pinkPrimary}
            />
          </View>
        </View>
      )}
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
        <Typography
          text={'Experience Life'}
          variant="heading"
          size="x-large"
          color="#fff"
        />
      </View>
    </View>
  );
});

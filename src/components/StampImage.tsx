import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {LongPressGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {locationDetailsTA, locationPhotosTA, locationSearchTA} from '../APIs';
import TextComp from './TextComp';

export const StampImage = ({image = '', text1 = '', text2 = ''}) => {
  const [focused, setFocused] = useState(false);
  const scale = useSharedValue(1);
  const navigation = useNavigation();

  const loadDetails = (input: any) => {
    locationSearchTA(input)?.then(res => {
      locationDetailsTA(res[0]?.location_id)?.then(detailsResponse => {
        console.log(detailsResponse, '---details---');
        locationPhotosTA(res[0]?.location_id)?.then(photosResponse => {
          console.log(photosResponse, '---photos---');
          navigation?.navigate('LocationDetails', {
            photos: photosResponse,
            details: detailsResponse,
          });
        });
      });
    });
  };

  const handleLongPress = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setFocused(true);
      scale.value = withTiming(1.5, {duration: 300});
    }
  };

  const handlePress = event => {
    if (focused) {
      setFocused(false);
      scale.value = withTiming(1, {duration: 300});
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <LongPressGestureHandler
      onHandlerStateChange={handleLongPress}
      minDurationMs={500}>
      <Pressable onPressIn={handlePress}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            },
            animatedStyle,
          ]}>
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
              opacity: focused ? 1 : 0.8,
            }}
            resizeMode={FastImage.resizeMode.contain}
            source={image}
          />
        </Animated.View>
        {focused && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flex: 1,
                height: 120,
                aspectRatio: 1,
                // backgroundColor: 'white',
                flexDirection: 'row',
                zIndex: 5,
              },
              animatedStyle,
            ]}>
            <Pressable
              style={{
                flexDirection: 'column',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: 'white',
                padding: 6,
              }}
              onPress={() => loadDetails(text1)}>
              <TextComp
                text={text1 + ', ' + text2}
                textStyles={{
                  // padding: 4,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
              <TextComp
                text={'Click to View'}
                size="x-small"
                color="#6e6e6e"
                textStyles={{
                  // paddingHorizontal: 4,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
            </Pressable>
          </Animated.View>
        )}
      </Pressable>
    </LongPressGestureHandler>
  );
};

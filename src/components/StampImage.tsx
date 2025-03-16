import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Typography from './Typography';
import {Color, getImageURL} from '../utils/displayUtils';
import {loadLocationDetails} from '../utils/locationUtils';

export const StampImage = ({data = {}}) => {
  const [focused, setFocused] = useState(false);
  const scale = useSharedValue(1);
  const navigation = useNavigation();

  const loadDetails = (mapsId: string) => {
    loadLocationDetails(mapsId, navigation);
  };

  const handlePress = event => {
    if (!focused) {
      setFocused(true);
      scale.value = withTiming(1.5, {duration: 300});
    }
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
    <Pressable onPress={handlePress}>
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
          source={{uri: getImageURL('frame', 'png')}}
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
          source={{uri: getImageURL(data?.image)}}
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
              flexDirection: 'row',
              zIndex: 5,
            },
            animatedStyle,
          ]}>
          <Pressable
            style={({pressed}) => [
              {
                flexDirection: 'column',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: 'white',
                padding: 6,
                borderBottomWidth: pressed ? 1 : 3,
                borderBottomColor: Color?.graySend,
              },
            ]}
            onPress={() => loadDetails(data?.mapsId)}>
            <Typography
              text={data?.text1 + ', ' + data?.text2}
              textStyles={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
            <Typography
              text={'Click to View'}
              color="#6e6e6e"
              textStyles={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
          </Pressable>
        </Animated.View>
      )}
    </Pressable>
  );
};

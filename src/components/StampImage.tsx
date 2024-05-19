import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

export const StampImage = ({image = ''}) => {
  // const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  // useEffect(() => {
  //   Animated.timing(value, {
  //     toValue: {x: -1000, y: 0},
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }, []);
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

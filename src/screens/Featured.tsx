import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Video from 'react-native-video';

export const Featured = () => {
  return (
    <SafeAreaView>
      {/* <ScrollView> */}
        <View
          style={{
            backgroundColor: '#FEF9F5',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
            }}>
            <Video
              source={require('../assets/videos/video_02.mov')}
              style={{width: '100%', aspectRatio:0.5625}}
              repeat
            />
          </View>
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

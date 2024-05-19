import React from 'react';
import {ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextComp from '../components/TextComp';

export const LocationDetails = ({route}) => {
  const {photos, details} = route?.params;

  console.log(photos, 'photos in locationdetails');
  console.log(details, 'details in locationdetails');

  return (
    <>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FEF9F5',
            justifyContent: 'center',
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}>
            <FastImage
              style={{height: 60, aspectRatio: 1}}
              resizeMode={FastImage.resizeMode.contain}
              source={{uri: photos[0]}}
            />
          </View>

          <TextComp text={details?.description} variant="heading" />
        </View>
      </ScrollView>
    </>
  );
};

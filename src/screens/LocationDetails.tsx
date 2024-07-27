import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Typography from '../components/Typography';
import {FlashList} from '@shopify/flash-list';
import {Color, screenWidth} from '../Utils';
import {Translator} from '../components/Translator';
import {locationDetailsTA, locationSearchTA} from '../APIs';

export const LocationDetails = ({route}) => {
  const {details, nearbyLocationDetails} = route?.params;

  const [photos, setPhotos] = useState(details?.photos);
  const [formattedAddress, setFormattedAddress] = useState(
    details?.formattedAddress,
  );
  const [latitude, setLatitude] = useState(details?.latitude);
  const [longitude, setLongitude] = useState(details?.longitude);
  const [description, setDescription] = useState(details?.description);
  // console.log(details, 'details in locationdetails');
  // console.log(nearbyLocationDetails, 'nearby in locationdetails');

  useEffect(() => {
    if (!details?.description) {
      locationSearchTA(
        details?.formattedAddress,
        `${details?.latitude}%2C${details?.longitude}`,
      )?.then(res => {
        console.log(res, 'fetching loc');
        locationDetailsTA(res[0]?.location_id)?.then(response => {
          console.log(response, 'fetching desc');
          setDescription(response?.description);
        });
      });
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: Color.beigeBg,
          }}>
          <FlashList
            contentContainerStyle={{padding: 8}}
            data={photos}
            estimatedItemSize={322}
            renderItem={({item}) => (
              <View
                style={{
                  marginRight: 8,
                  padding: 4,
                  borderRadius: 14,
                  overflow: 'hidden',
                  backgroundColor: Color?.whiteBg,
                  shadowColor: Color?.black,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                  elevation: 10,
                }}>
                <FastImage
                  style={{
                    width: screenWidth * 0.8,
                    aspectRatio: 1.5,
                    borderRadius: 10,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{uri: item}}
                />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
          />
        </View>
        <View
          style={{
            backgroundColor: Color.beigeBg,
            padding: 16,
          }}>
          <Typography
            text={formattedAddress}
            variant="heading"
            textStyles={{marginVertical: 8}}
          />
          <Typography text={latitude + ',' + longitude} color="#888" />
          <Typography
            size="medium"
            text={description}
            textStyles={{marginVertical: 8}}
          />
          <View
            style={{
              position: 'absolute',
              padding: 32,
              bottom: 1,
              right: 1,
              width: '100%',
              alignItems: 'flex-end',
            }}>
            <Translator place={formattedAddress} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

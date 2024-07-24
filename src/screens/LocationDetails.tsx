import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Typography from '../components/Typography';
import {FlashList} from '@shopify/flash-list';
import {screenWidth} from '../Utils';
import {Translator} from '../components/Translator';

export const LocationDetails = ({route}) => {
  const {details, nearbyLocationDetails} = route?.params;

  // console.log(details, 'details in locationdetails');
  // console.log(nearbyLocationDetails, 'nearby in locationdetails');

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FEF9F5',
          }}>
          <FlashList
            contentContainerStyle={{padding: 8}}
            data={details?.photos}
            estimatedItemSize={322}
            renderItem={({item}) => (
              <View
                style={{
                  marginRight: 8,
                  padding: 4,
                  borderRadius: 14,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  shadowColor: '#000',
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
            backgroundColor: '#FEF9F5',
            padding: 16,
          }}>
          <Typography
            text={details?.formattedAddress}
            variant="heading"
            textStyles={{marginVertical: 8}}
          />
          <Typography
            text={details?.latitude + ',' + details?.longitude}
            color="#888"
          />
          <Typography
            size="medium"
            text={details?.description}
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
            <Translator place={details?.formattedAddress} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

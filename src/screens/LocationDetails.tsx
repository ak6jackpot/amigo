import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextComp from '../components/TextComp';
import {FlashList} from '@shopify/flash-list';
import {screenWidth} from '../Utils';

export const LocationDetails = ({route}) => {
  const {photos, details} = route?.params;

  console.log(photos, 'photos in locationdetails');
  console.log(details, 'details in locationdetails');

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FEF9F5',
            justifyContent: 'center',
            padding: 16,
          }}>
          <FlashList
            contentContainerStyle={{paddingRight: 16}}
            data={photos}
            estimatedItemSize={322}
            renderItem={({item}) => (
              <View style={{padding: 4, borderRadius: 10, overflow: 'hidden'}}>
                <FastImage
                  style={{
                    width: screenWidth * 0.8,
                    aspectRatio: 1.69,
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

          <TextComp
            text={details?.description}
            variant="heading"
            size="x-small"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Color, screenWidth} from '../Utils';
import itineraryStore from '../storeDefinitions';

export const ItineraryDetails = ({route}) => {
  const {itineraryId} = route?.params;

  const [itinerary, setItinerary] = useState({});
  const navigation = useNavigation();
  // console.log(details, 'details in locationdetails');
  // console.log(nearbyLocationDetails, 'nearby in locationdetails');

  useEffect(() => {
    const temp = itineraryStore?.itineraries?.find(
      item => item?.id === itineraryId,
    );
    console.log(temp, 'in itinerary details');

    setItinerary(temp);
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: Color.beigeBg,
        }}>
        <FlashList
          contentContainerStyle={{padding: 8}}
          data={itinerary?.locations}
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
    </SafeAreaView>
  );
};

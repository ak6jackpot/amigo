import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Color, generatePhotoUrl} from '../Utils';
import itineraryStore from '../storeDefinitions';
import Typography from '../components/Typography';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCircleCheck as checkRegular,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCircleCheck as checkSolid,
  faCircleDown,
  faCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import {observer} from 'mobx-react-lite';

export const ItineraryDetails = observer(({route}) => {
  const {itineraryId} = route?.params;

  const [itinerary, setItinerary] = useState({});
  const navigation = useNavigation();
  // console.log(details, 'details in locationdetails');
  // console.log(nearbyLocationDetails, 'nearby in locationdetails');

  useEffect(() => {
    const temp = itineraryStore?.itineraries?.find(
      item => item?.id === itineraryId,
    );

    setItinerary(temp);
  }, [itineraryId, itineraryStore.itineraries]);

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: Color.beigeBg,
          padding: 16,
          height: '100%',
          width: '100%',
        }}>
        <Typography text={itinerary?.name} />
        <Typography text={itinerary?.description} />

        <FlashList
          contentContainerStyle={{padding: 8}}
          data={itinerary?.locations}
          estimatedItemSize={322}
          renderItem={({item, index}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 8,
                borderWidth: 2,
                borderColor: Color?.graySend,
                borderRadius: 18,
                padding: 8,
                backgroundColor: Color?.grayTag,
                shadowColor: Color?.black,
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 5,
                elevation: 5,
              }}>
              <View style={{flex: 1}}>
                <FastImage
                  style={{
                    width: '100%',
                    aspectRatio: 1,
                    borderRadius: 12,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: generatePhotoUrl(
                      item?.images[0]?.name?.split('/')?.slice(-1),
                    ),
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  padding: 8,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Typography
                    text={item?.name}
                    variant="heading"
                    size="small"
                  />
                  <Typography
                    text={item?.description}
                    variant="label"
                    size="small"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Pressable
                    style={{
                      borderWidth: 1,
                      borderRadius: 1000,
                      borderColor: Color?.graySend,
                    }}
                    onPress={() => {
                      itineraryStore?.markLocationAsVisited(
                        itinerary?.id,
                        item?.id,
                      );
                    }}>
                    {item?.visited ? (
                      <FontAwesomeIcon icon={checkSolid} size={20} />
                    ) : (
                      <FontAwesomeIcon icon={checkRegular} size={20} />
                    )}
                  </Pressable>
                  <Pressable
                    style={{
                      borderWidth: 1,
                      borderRadius: 1000,
                      borderColor: Color?.graySend,
                    }}
                    onPress={() => {
                      itineraryStore?.reorderLocations(
                        itinerary?.id,
                        index,
                        index - 1,
                      );
                    }}>
                    <FontAwesomeIcon icon={faCircleUp} size={20} />
                  </Pressable>
                  <Pressable
                    style={{
                      borderWidth: 1,
                      borderRadius: 1000,
                      borderColor: Color?.graySend,
                    }}
                    onPress={() => {
                      itineraryStore?.reorderLocations(
                        itinerary?.id,
                        index,
                        index + 1,
                      );
                    }}>
                    <FontAwesomeIcon icon={faCircleDown} size={20} />
                  </Pressable>
                  <Pressable
                    style={{
                      borderWidth: 1,
                      borderRadius: 1000,
                      borderColor: Color?.graySend,
                    }}
                    onPress={() =>
                      itineraryStore?.removeLocation(itinerary.id, item?.id)
                    }>
                    <FontAwesomeIcon icon={faTrashCan} size={20} />
                  </Pressable>
                </View>
              </View>
            </View>
          )}
          snapToAlignment="start"
          decelerationRate="fast"
        />
      </View>
    </SafeAreaView>
  );
});

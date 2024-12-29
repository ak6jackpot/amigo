import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Animated, FlatList, Pressable, SafeAreaView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Color} from '../utils/displayUtils';
import {functionDataStore, itineraryDataStore} from '../utils/store';
import Typography from '../components/Typography';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCircleCheck as checkRegular,
  faCircleDown,
  faCircleUp,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCircleCheck as checkSolid,
  faPencil,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {observer} from 'mobx-react-lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderKit from 'react-native-loader-kit';
import {ScreenHeader} from '../components/ScreenHeader';
import {Snack} from '../components/Snack';
import {loadLocationDetails} from '../utils/locationUtils';

export const ItineraryDetails = observer(({route}) => {
  const {itineraryId} = route?.params;
  const navigation = useNavigation();

  const itinerary = itineraryDataStore.itineraries.find(
    item => item.id === itineraryId,
  );

  const animatedValues = useRef(
    itinerary?.locations.map(() => new Animated.Value(0)),
  ).current;

  const triggerAnimation = (index, direction) => {
    const toValue = direction === 'up' ? -100 : 100; // Adjust the value based on your needs

    Animated.parallel([
      Animated.timing(animatedValues[index], {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index + (direction === 'up' ? -1 : 1)], {
        toValue: -toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      itineraryDataStore?.reorderLocations(
        itinerary?.id,
        index,
        index + (direction === 'up' ? -1 : 1),
      );
      animatedValues.forEach(value => value.setValue(0));
      AsyncStorage?.setItem(
        'itineraries',
        JSON.stringify(itineraryDataStore?.itineraries),
      );
    });
  };

  console.log(itinerary?.locations, 'locations outside');

  return (
    <SafeAreaView>
      {functionDataStore?.functionData?.loaderVisible && (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}>
          <View
            style={{
              padding: 16,
              borderRadius: 24,
            }}>
            <LoaderKit
              style={{width: 48, height: 48}}
              name={'BallPulse'}
              color={Color?.pinkPrimary}
            />
          </View>
        </View>
      )}
      <View
        style={{
          backgroundColor: Color.beigeBg,
          padding: 16,
          height: '100%',
          width: '100%',
        }}>
        <ScreenHeader />

        <Typography text={itinerary?.name} variant="heading" />
        <Typography text={itinerary?.description} size="large" />

        <FlatList
          contentContainerStyle={{paddingVertical: 8}}
          data={itinerary?.locations}
          renderItem={({item, index}) => (
            <Animated.View
              style={{
                transform: [{translateY: animatedValues[index]}],
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginVertical: 8,
                  borderWidth: 2,
                  borderColor: Color?.graySend,
                  borderRadius: 18,
                  padding: 8,
                  backgroundColor: Color?.grayTag,
                }}
                onPress={() => {
                  loadLocationDetails(item?.details?.id, navigation);
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
                      uri: item?.details?.photos[0],
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 3,
                    paddingHorizontal: 8,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Typography
                      text={
                        item?.details?.name?.length > 30
                          ? item?.details?.name?.slice(0, 29) + '...'
                          : item?.details?.name
                      }
                      variant="heading"
                      size="small"
                      textStyles={{fontSize: 10}}
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
                        !item?.visited &&
                          Snack({
                            text: 'Marked as Visited!',
                            variant: 'success',
                          });
                        itineraryDataStore?.toggleLocationVisited(
                          itinerary?.id,
                          item?.details?.id,
                        );

                        setTimeout(() => {
                          AsyncStorage?.setItem(
                            'itineraries',
                            JSON.stringify(itineraryDataStore?.itineraries),
                          );
                        }, 500);
                      }}>
                      {item?.visited ? (
                        <FontAwesomeIcon
                          icon={checkSolid}
                          size={20}
                          color="green"
                        />
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
                        if (index > 0) {
                          triggerAnimation(index, 'up');
                        }
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
                        if (index < itinerary?.locations.length - 1) {
                          triggerAnimation(index, 'down');
                        }
                      }}>
                      <FontAwesomeIcon icon={faCircleDown} size={20} />
                    </Pressable>
                    <Pressable
                      style={{
                        borderWidth: 1,
                        borderRadius: 1000,
                        borderColor: Color?.graySend,
                      }}
                      onPress={() => {
                        itineraryDataStore?.removeLocation(
                          itinerary.id,
                          item?.details?.id,
                        );
                        setTimeout(() => {
                          AsyncStorage?.setItem(
                            'itineraries',
                            JSON.stringify(itineraryDataStore?.itineraries),
                          );
                        }, 500);
                      }}>
                      <FontAwesomeIcon icon={faTrashCan} size={20} />
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          )}
          snapToAlignment="start"
          decelerationRate="fast"
          ListFooterComponent={
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={({pressed}) => [
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 8,
                    borderColor: Color?.graySend,
                    borderRadius: 18,
                    padding: 8,
                    backgroundColor: Color?.grayTag,
                    opacity: pressed ? 0.7 : 1,
                    borderBottomWidth: pressed ? 2 : 4,
                    flex: 4,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('CreateItinerary', {
                    name: itinerary?.name,
                    description: itinerary?.description,
                    locations: itinerary?.locations,
                    id: itinerary?.id,
                  });
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderRadius: 1000,
                  }}>
                  <Typography text={'Add more destinations'} />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: Color?.gray900,
                    padding: 8,
                    borderRadius: 1000,
                  }}>
                  <FontAwesomeIcon icon={faPlus} size={16} />
                </View>
              </Pressable>
              <Pressable
                style={({pressed}) => [
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 8,
                    borderColor: Color?.graySend,
                    borderRadius: 18,
                    padding: 8,
                    backgroundColor: Color?.grayTag,
                    opacity: pressed ? 0.7 : 1,
                    borderBottomWidth: pressed ? 2 : 4,
                    flex: 1,
                    marginLeft: 8,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('CreateItinerary', {
                    name: itinerary?.name,
                    description: itinerary?.description,
                    locations: itinerary?.locations,
                    id: itinerary?.id,
                  });
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderRadius: 1000,
                  }}>
                  <Typography text={'Edit'} />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: Color?.gray900,
                    padding: 8,
                    borderRadius: 1000,
                  }}>
                  <FontAwesomeIcon icon={faPencil} size={16} />
                </View>
              </Pressable>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
});

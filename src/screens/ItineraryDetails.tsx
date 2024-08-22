import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Pressable, SafeAreaView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Color, loadLocationDetails, screenHeight, screenWidth} from '../Utils';
import itineraryStore, {functionDataStore} from '../storeDefinitions';
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
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderKit from 'react-native-loader-kit';
import {Header} from '../components/Header';

export const ItineraryDetails = observer(({route}) => {
  const {itineraryId} = route?.params;
  const navigation = useNavigation();
  const [animationTrigger, setAnimationTrigger] = useState(null);
  const [visitedMessage, setVisitedMessage] = useState(false);

  const itinerary = itineraryStore.itineraries.find(
    item => item.id === itineraryId,
  );

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
        <Header />

        <Typography text={itinerary?.name} variant="heading" />
        <Typography text={itinerary?.description} size="large" />
        {visitedMessage && (
          <Animatable.Text
            animation="fadeIn"
            style={{
              position: 'absolute',
              left: screenWidth / 3,
              top: screenHeight / 12,
            }}>
            <View
              style={{
                padding: 8,
                borderRadius: 500,
                zIndex: 2,
                backgroundColor: 'green',
              }}>
              <Typography text={'Marked As Visited'} color="white" />
            </View>
          </Animatable.Text>
          // @task -- dynamic text and color
        )}

        <FlatList
          contentContainerStyle={{paddingVertical: 8}}
          data={itinerary?.locations}
          renderItem={({item, index}) => (
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
                  flex: 1,
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
                  <Typography
                    text={
                      item?.details?.description?.length > 100
                        ? item?.details?.description?.slice(0, 99) + '...'
                        : item?.details?.description
                    }
                    variant="label"
                    size="small"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <Animatable.View
                    animation={
                      animationTrigger === index ? 'bounceIn' : undefined
                    }
                    iterationCount={1}>
                    <Pressable
                      style={{
                        borderWidth: 1,
                        borderRadius: 1000,
                        borderColor: Color?.graySend,
                      }}
                      onPress={() => {
                        setAnimationTrigger(index);
                        !item?.visited && setVisitedMessage(true);
                        itineraryStore?.toggleLocationVisited(
                          itinerary?.id,
                          item?.details?.id,
                        );

                        setTimeout(() => {
                          setAnimationTrigger(null);
                          AsyncStorage?.setItem(
                            'itineraries',
                            JSON.stringify(itineraryStore?.itineraries),
                          );
                        }, 500);
                        setTimeout(() => {
                          setVisitedMessage(false);
                        }, 1500);
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
                  </Animatable.View>
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
                      setTimeout(() => {
                        AsyncStorage?.setItem(
                          'itineraries',
                          JSON.stringify(itineraryStore?.itineraries),
                        );
                      }, 500);
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

                      setTimeout(() => {
                        AsyncStorage?.setItem(
                          'itineraries',
                          JSON.stringify(itineraryStore?.itineraries),
                        );
                      }, 500);
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
                      itineraryStore?.removeLocation(
                        itinerary.id,
                        item?.details?.id,
                      );
                      setTimeout(() => {
                        AsyncStorage?.setItem(
                          'itineraries',
                          JSON.stringify(itineraryStore?.itineraries),
                        );
                      }, 500);
                    }}>
                    <FontAwesomeIcon icon={faTrashCan} size={20} />
                  </Pressable>
                </View>
              </View>
            </Pressable>
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

import {faHeart, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import {fetchNearbyOpenAI, locationSearchMaps} from '../utils/serviceAPIcalls';
import {RightArrow} from '../assets/images/RightArrow';
import {ActivityCard} from '../components/ActivityCard';
import ButtonComp from '../components/ButtonComp';
import {ScreenHeader} from '../components/ScreenHeader';
import {Tag} from '../components/Tag';
import Typography from '../components/Typography';
import {
  functionDataStore,
  userDataStore,
  itineraryDataStore,
} from '../utils/store';
import {Color, getImageURL} from '../utils/displayUtils';
import LoaderKit from 'react-native-loader-kit';
import {observer} from 'mobx-react-lite';
import {cities} from '../data/data';
import GetLocation from 'react-native-get-location';
import {loadLocationDetails} from '../utils/locationUtils';

export const Home = observer(() => {
  const navigation = useNavigation();

  const fetchNearby = () => {
    if (
      userDataStore?.userData?.currentLocation?.latitude &&
      userDataStore?.userData?.currentLocation?.longitude
    ) {
      functionDataStore?.showLoader();
      fetchNearbyOpenAI(
        userDataStore?.userData?.currentLocation?.latitude,
        userDataStore?.userData?.currentLocation?.longitude,
      )
        ?.then(response => {
          // console.log(JSON?.parse(response));
          const final: any[] = [];
          JSON?.parse(response)?.map(item => {
            locationSearchMaps(item)?.then(searchresponse => {
              // console.log(searchresponse?.places[0], 'searchresponse');
              loadLocationDetails(searchresponse?.places[0]?.id)?.then(
                loadresponse => {
                  final?.push(loadresponse);
                },
              );
            });
          });

          setTimeout(() => {
            functionDataStore?.hideLoader();
            navigation?.navigate('NearbyLocations', {
              nearbyList: final,
            });
          }, 3000);
        })
        .catch(err => {
          console.log(err);
          functionDataStore?.hideLoader();
        });
    } else {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          // console.log(location, 'location');
          userDataStore?.setUserData({currentLocation: location});
          fetchNearby();
        })
        .catch(error => {
          const {code, message} = error;
          console.log(code, message);
        });
    }
  };

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
      <ScrollView>
        <View
          style={{
            backgroundColor: Color.beigeBg,
            justifyContent: 'center',
            padding: 16,
            paddingBottom: 64,
          }}>
          <ScreenHeader />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 120,
            }}>
            <Pressable
              onPress={() => {
                navigation?.navigate('Search');
              }}
              style={({pressed}) => [
                {
                  width: '100%',
                  backgroundColor: Color?.greenSearch,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  marginVertical: 8,
                  opacity: pressed ? 0.7 : 1,
                  borderBottomWidth: pressed ? 2 : 4,
                  borderBottomColor: Color?.graySend,
                },
              ]}>
              <Typography
                text={'✨ Where are you travelling next?'}
                size="large"
                textStyles={{alignSelf: 'flex-start', marginHorizontal: 16}}
              />
              <View
                style={{
                  backgroundColor: Color.beigeBg,
                  width: '90%',
                  marginTop: 8,
                  marginHorizontal: 8,
                  padding: 16,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  flexDirection: 'row',
                }}>
                <FontAwesomeIcon icon={faSearch} />
                <Typography
                  text={'Enter any place or city'}
                  textStyles={{marginHorizontal: 8, opacity: 0.6}}
                />
              </View>
            </Pressable>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Typography text={'Upcoming Trips'} variant="heading" />
              {itineraryDataStore?.itineraries?.length > 0 && (
                <Pressable
                  onPress={() => {
                    navigation?.navigate('Itineraries');
                  }}>
                  <Typography text={'See all'} />
                </Pressable>
              )}
            </View>
            {itineraryDataStore?.itineraries?.length > 0 ? (
              <FlatList
                contentContainerStyle={{paddingRight: 16, paddingVertical: 8}}
                data={itineraryDataStore?.itineraries}
                renderItem={({item}) => (
                  <ActivityCard
                    data={item}
                    icon={faHeart}
                    color="#ebebeb"
                    onPress={() => {
                      navigation?.navigate('ItineraryDetails', {
                        itineraryId: item?.id,
                      });
                    }}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="fast"
                ListFooterComponent={
                  <Pressable
                    style={({pressed}) => [
                      {
                        borderRadius: 20,
                        marginRight: 8,
                        padding: 12,
                        width: 160,
                        aspectRatio: 1,
                        backgroundColor: '#ebebeb',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: pressed ? 0.7 : 1,
                        borderBottomWidth: pressed ? 2 : 4,
                        borderBottomColor: Color?.graySend,
                      },
                    ]}
                    onPress={() => {
                      navigation?.navigate('CreateItinerary');
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderStyle: 'dashed',
                        borderColor: Color?.gray900,
                        padding: 12,
                        borderRadius: 1000,
                      }}>
                      <FontAwesomeIcon icon={faPlus} size={30} />
                    </View>
                  </Pressable>
                }
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 96,
                }}>
                <ButtonComp
                  textColor="black"
                  size="small"
                  text={"You don't have any trip coming up.\nPlan one now! ➡"}
                  customStyle={{
                    width: '75%',
                    marginVertical: 8,
                    borderRadius: 24,
                  }}
                  onPress={() => {
                    navigation?.navigate('CreateItinerary');
                  }}
                />
              </View>
            )}
          </View>
          <View style={{flexDirection: 'column'}}>
            <Typography
              text={'Plan a trip'}
              variant="heading"
              textStyles={{marginBottom: 8}}
            />
            <FlashList
              contentContainerStyle={{paddingRight: 16}}
              data={cities}
              estimatedItemSize={322}
              renderItem={({item}) => (
                <Tag
                  data={item}
                  onPress={() => {
                    loadLocationDetails(item?.mapsId, navigation);
                  }}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>
          <Pressable
            style={{
              width: '100%',
              aspectRatio: 2,
              borderRadius: 30,
              overflow: 'hidden',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 16,
            }}
            onPress={() => navigation.navigate('Featured')}>
            <Video
              source={{uri: getImageURL('video_04', 'mp4')}}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
              repeat
              muted
              resizeMode="cover"
            />
            <View style={{flex: 2, alignItems: 'flex-end'}}>
              <Typography
                text={'Featured Destinations'}
                variant="heading"
                color="white"
                size="large"
                textAlign="right"
              />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <RightArrow />
            </View>
          </Pressable>
          <View style={{flexDirection: 'column'}}>
            <Typography text={'Local Highlights'} variant="heading" />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 160,
              }}>
              <Pressable
                style={({pressed}) => [
                  {
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    backgroundColor: Color?.pinkPrimary,
                    borderRadius: 18,
                    overflow: 'hidden',
                    marginVertical: 16,
                    opacity: pressed ? 0.7 : 1,
                    borderBottomWidth: pressed ? 2 : 4,
                    borderBottomColor: Color?.graySend,
                  },
                ]}
                onPress={fetchNearby}>
                <FastImage
                  style={{flex: 1, height: '100%'}}
                  resizeMode={FastImage.resizeMode.contain}
                  source={{uri: getImageURL('local')}}
                />
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 16,
                    marginHorizontal: 12,
                  }}>
                  <Typography
                    text={'Explore Nearby Attractions'}
                    variant="heading"
                    textAlign="center"
                  />
                  <RightArrow color="black" size="40px" />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

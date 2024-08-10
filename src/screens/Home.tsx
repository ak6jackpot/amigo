import {faHeart, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import {nearbyLocationSearchMaps} from '../APIs';
import {RightArrow} from '../assets/images/RightArrow';
import {ActivityCard} from '../components/ActivityCard';
import ButtonComp from '../components/ButtonComp';
import {Header} from '../components/Header';
import {Tag} from '../components/Tag';
import Typography from '../components/Typography';
import itineraryStore, {
  functionDataStore,
  userDataStore,
} from '../storeDefinitions';
import {Color, loadLocationDetails} from '../Utils';
import LoaderKit from 'react-native-loader-kit';
import {observer} from 'mobx-react-lite';
import {cities} from '../data';

export const Home = observer(() => {
  const navigation = useNavigation();

  const fetchNearby = () => {
    functionDataStore?.showLoader();
    nearbyLocationSearchMaps(
      userDataStore?.userData?.currentLocation?.latitude,
      userDataStore?.userData?.currentLocation?.longitude,
    )
      ?.then(res => {
        // console.log(
        //   res,
        //   userDataStore?.userData?.currentLocation,
        //   res?.length,
        //   '--------------------',
        // );
        functionDataStore?.hideLoader();
        navigation?.navigate('NearbyLocations', {
          nearbyList: res,
        });
      })
      .catch(err => {
        console.log(err);
        functionDataStore?.hideLoader();
      });
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
          }}>
          <Header />
          <Pressable
            onPress={() => {
              navigation?.navigate('Search');
            }}
            style={{
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
            }}>
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
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                flexDirection: 'row',
              }}>
              <FontAwesomeIcon icon={faSearch} />
              <Typography
                text={'Enter any place or city'}
                textStyles={{marginHorizontal: 8, opacity: 0.6}}
              />
            </View>
          </Pressable>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Typography text={'Upcoming Trips'} variant="heading" />
              <Pressable
                onPress={() => {
                  navigation?.navigate('Itineraries');
                }}>
                <Typography text={'See all'} />
              </Pressable>
            </View>
            {itineraryStore?.itineraries?.length > 0 ? (
              <FlashList
                contentContainerStyle={{paddingRight: 16, paddingVertical: 8}}
                data={itineraryStore?.itineraries}
                estimatedItemSize={322}
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
                    style={{
                      borderRadius: 20,
                      marginRight: 8,
                      padding: 12,
                      width: 160,
                      aspectRatio: 1,
                      backgroundColor: '#ebebeb',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      navigation?.navigate('ItineraryTemplates');
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
                }}>
                <ButtonComp
                  shape="pill"
                  color={Color?.pinkPrimary}
                  textColor="black"
                  size="medium"
                  text="You don't have any trip coming up. Plan one now! ➡"
                  styles={{
                    width: '75%',
                    marginVertical: 8,
                    textAlign: 'center',
                  }}
                  onPress={() => {
                    navigation?.navigate('Itineraries');
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
                    loadLocationDetails(
                      item?.mapsId,
                      item?.tripAdvId,
                      navigation,
                    );
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
              source={require('../assets/videos/video_04.mov')}
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
            <Pressable
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: Color?.pinkPrimary,
                borderRadius: 25,
                overflow: 'hidden',
                marginVertical: 16,
              }}
              onPress={fetchNearby}>
              <FastImage
                style={{flex: 1, height: '100%'}}
                resizeMode={FastImage.resizeMode.contain}
                source={require('../assets/images/local.jpg')}
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
      </ScrollView>
    </SafeAreaView>
  );
});

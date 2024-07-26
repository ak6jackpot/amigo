import {faHeart, faSearch} from '@fortawesome/free-solid-svg-icons';
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
import {tripsDataStore, userDataStore} from '../storeDefinitions';

export const Home = () => {
  const navigation = useNavigation();

  const cities = [
    {
      label: '🇺🇸  New York',
      mapsId: 'ChIJOwg_06VPwokRYv534QaPC8g',
      tripAdvId: '60763',
    },
    {
      label: '🇿🇦 Cape Town',
      mapsId: 'ChIJ1-4miA9QzB0Rh6ooKPzhf2g',
      tripAdvId: '1722390',
    },
    {
      label: '🇩🇪  Berlin',
      mapsId: 'ChIJAVkDPzdOqEcRcDteW0YgIQQ',
      tripAdvId: '187323',
    },
    {
      label: '🇬🇧  London',
      mapsId: 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
      tripAdvId: '186338',
    },
    {
      label: '🇪🇸  Madrid',
      mapsId: 'ChIJgTwKgJcpQg0RaSKMYcHeNsQ',
      tripAdvId: '187514',
    },
    {
      label: '🇯🇵  Tokyo',
      mapsId: 'ChIJXSModoWLGGARILWiCfeu2M0',
      tripAdvId: '298184',
    },
    {
      label: '🇫🇷  Paris',
      mapsId: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
      tripAdvId: '187147',
    },
    {
      label: '🇦🇺  Sydney',
      mapsId: 'ChIJP3Sa8ziYEmsRUKgyFmh9AQM',
      tripAdvId: '255060',
    },
    {
      label: '🇦🇪  Dubai',
      mapsId: 'ChIJRcbZaklDXz4RYlEphFBu5r0',
      tripAdvId: '295424',
    },
    {
      label: '🇸🇬  Singapore',
      mapsId: 'ChIJdZOLiiMR2jERxPWrUs9peIg',
      tripAdvId: '294265',
    },
  ];

  const fetchNearby = () => {
    nearbyLocationSearchMaps(
      userDataStore?.userData?.currentLocation?.latitude,
      userDataStore?.userData?.currentLocation?.longitude,
    )
      ?.then(res => {
        console.log(res[0], '--------------------');
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FEF9F5',
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
              backgroundColor: '#E2F4A6',
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
                backgroundColor: '#FEF9F5',
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
            <Typography text={'Upcoming Trips'} variant="heading" />
            {tripsDataStore?.tripsData?.upcoming?.length > 0 ? (
              <FlashList
                contentContainerStyle={{paddingRight: 16}}
                data={tripsDataStore?.tripsData?.upcoming}
                estimatedItemSize={322}
                renderItem={({item}) => (
                  <ActivityCard
                    titleText="East Side Gallery"
                    subText="Date"
                    icon={faHeart}
                    color="#ebebeb"
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="fast"
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
                  color="pink"
                  textColor="black"
                  size="x-small"
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
              renderItem={({item}) => <Tag data={item} />}
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
                backgroundColor: '#f7c6ef',
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
};

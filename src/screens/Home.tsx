import {faHeart, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import Video from 'react-native-video';
import {RightArrow} from '../assets/images/RightArrow';
import {ActivityCard} from '../components/ActivityCard';
import ButtonComp from '../components/ButtonComp';
import {Header} from '../components/Header';
import {Tag} from '../components/Tag';
import Typography from '../components/Typography';
import {tripsDataStore} from '../storeDefinitions';

export const Home = () => {
  const navigation = useNavigation();

  const cities = [
    '🇺🇸  New York',
    '🇿🇦 Cape Town',
    '🇩🇪  Berlin',
    '🇬🇧  London',
    '🇪🇸  Madrid',
    '🇯🇵  Tokyo',
    '🇫🇷  Paris',
    '🇦🇺  Sydney',
    '🇦🇪  Dubai',
    '🇸🇬  Singapore',
  ];

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
                  text="You don't have any trip coming up. Plan one now! →"
                  styles={{
                    width: '75%',
                    marginVertical: 8,
                    textAlign: 'center',
                  }}
                  onPress={() => {
                    navigation?.navigate('Search');
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
              renderItem={({item}) => <Tag text={item} />}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

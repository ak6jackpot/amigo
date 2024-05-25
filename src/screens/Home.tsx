import {faBell, faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import {RightArrow} from '../assets/images/RightArrow';
import {ActivityCard} from '../components/ActivityCard';
import {Tag} from '../components/Tag';
import Typography from '../components/Typography';
import {useNavigation} from '@react-navigation/native';
import ButtonComp from '../components/ButtonComp';
import {tripsDataStore} from '../storeDefinitions';
import {FlashList} from '@shopify/flash-list';

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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}>
            <FastImage
              style={{height: 60, aspectRatio: 1}}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/images/logo_round.png')}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  height: 60,
                  aspectRatio: 1,
                  backgroundColor: 'gray',
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 16,
                  marginRight: 4,
                }}>
                <FontAwesomeIcon icon={faBell} size={'100%'} />
              </View>
              <View
                style={{
                  height: 60,
                  aspectRatio: 1,
                  backgroundColor: 'gray',
                  borderRadius: 100,
                }}></View>
            </View>
          </View>
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
              textStyles={{alignSelf: 'flex-start', marginLeft: 8}}
            />
            <TextInput
              placeholder="🔍  Enter any place or city"
              placeholderTextColor={'#000'}
              style={{
                backgroundColor: '#FEF9F5',
                width: '90%',
                marginTop: 8,
                paddingHorizontal: 16,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                fontFamily: 'Ubuntu-Regular',
                color: '#000',
                height: 32,
              }}
            />
          </Pressable>
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
                text="You don't have any trip coming up. Plan one now!"
                styles={{width: '75%', marginVertical: 8, textAlign: 'center'}}
                onPress={() => {
                  navigation?.navigate('Search');
                }}
              />
            </View>
          )}
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

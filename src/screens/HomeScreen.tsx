import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, TextInput, View} from 'react-native';
import TextComp from '../components/TextComp';
import {Tag} from '../components/Tag';
import {ActivityCard} from '../components/ActivityCard';
import {faBell, faHeart} from '@fortawesome/free-solid-svg-icons';
import {
  locationDetailsTA,
  locationPhotosTA,
  locationReviewsTA,
  locationSearchTA,
  nearbyLocationSearchTA,
} from '../APIs';
import FastImage from 'react-native-fast-image';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const HomeScreen = () => {
  useEffect(() => {
    // locationSearchTA('paris').then(res => console.log(res));
    // locationPhotosTA('187147').then(res => console.log(res));
    // locationDetailsTA('187147').then(res => console.log(res));
    // nearbyLocationSearchTA('42.3455', '-71.10767').then(res => console.log(res));
  }, []);
  return (
    <>
      <SafeAreaView>
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
          <View
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
            <TextComp
              text={'✨ Where are you travelling next?'}
              size="large"
              textStyles={{alignSelf: 'flex-start', marginLeft: 8}}
            />
            <TextInput
              placeholder="🔍  Enter any place or city"
              style={{
                backgroundColor: '#FEF9F5',
                width: '90%',
                marginTop: 8,
                paddingHorizontal: 16,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                fontFamily: 'Rubik-Regular',
                color: '#fff',
                height: 32,
              }}
            />
          </View>
          <TextComp text={'Upcoming Trips'} variant="heading" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <ActivityCard
                titleText="East Side Gallery"
                subText="Date"
                icon={faHeart}
                color="#ebebeb"
              />
              <ActivityCard
                titleText="East Side Gallery"
                subText="Date"
                icon={faHeart}
                color="#ebebeb"
              />
              <ActivityCard
                titleText="East Side Gallery"
                subText="Date"
                icon={faHeart}
                color="#ebebeb"
              />
              <ActivityCard
                titleText="East Side Gallery"
                subText="Date"
                icon={faHeart}
                color="#ebebeb"
              />
            </View>
          </ScrollView>
          <TextComp text={'Plan a trip'} variant="heading" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <Tag text="🇩🇪  Berlin" />
              <Tag text="🇮🇹  Geneve" />
              <Tag text="🇧🇪  Bruges" />
              <Tag text="🇳🇱  Amsterdam" />
            </View>
          </ScrollView>
          <TextComp text={'Featured Destinations'} variant="heading" />
        </View>
      </SafeAreaView>
    </>
  );
};

import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import TextComp from '../components/TextComp';
import {Tag} from '../components/Tag';
import {ActivityCard} from '../components/ActivityCard';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {
  locationDetailsTA,
  locationPhotosTA,
  locationReviewsTA,
  locationSearchTA,
  nearbyLocationSearchTA,
} from '../APIs';
import FastImage from 'react-native-fast-image';

export const HomeScreen = () => {
  useEffect(() => {
    // locationSearchTA('paris').then(res => console.log(res));
    // locationPhotosTA('187147').then(res => console.log(res));
    // locationDetailsTA('187147').then(res => console.log(res));
    // nearbyLocationSearchTA('42.3455', '-71.10767').then(res => console.log(res));
  });
  return (
    <>
      <View
        style={{
          backgroundColor: '#FEF9F5',
          justifyContent: 'center',
        }}>
        <TextComp text={'Next Trips'} variant="heading" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row', marginVertical: 2}}>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row', marginVertical: 2}}>
            <Tag text="🇩🇪  Berlin" />
            <Tag text="🇮🇹  Geneve" />
            <Tag text="🇧🇪  Bruges" />
            <Tag text="🇳🇱  Amsterdam" />
          </View>
        </ScrollView>
      </View>
      {/* <FastImage
        style={{width:'100%', aspectRatio: 1}}
        resizeMode={FastImage.resizeMode.contain}
        source={{uri: images[3], priority: FastImage.priority.normal}}
      /> */}
    </>
  );
};

import React from 'react';
import {ScrollView, View} from 'react-native';
import TextComp from '../components/TextComp';
import {Tag} from '../components/Tag';
import {ActivityCard} from '../components/ActivityCard';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

export const HomeScreen = () => {
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
    </>
  );
};

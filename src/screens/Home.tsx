import {faBell, faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {SafeAreaView, ScrollView, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ActivityCard} from '../components/ActivityCard';
import {Tag} from '../components/Tag';
import TextComp from '../components/TextComp';
import ButtonComp from '../components/ButtonComp';
import {useNavigation} from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation();
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
              <Tag text="🇺🇸  New York" />
              <Tag text="🇿🇦 Cape Town" />
              <Tag text="🇩🇪  Berlin" />
              <Tag text="🇬🇧  London" />
              <Tag text="🇪🇸  Madrid" />
              <Tag text="🇯🇵  Tokyo" />
              <Tag text="🇫🇷  Paris" />
              <Tag text="🇦🇺  Sydney" />
              <Tag text="🇦🇪  Dubai" />
              <Tag text="🇸🇬  Singapore" />
            </View>
          </ScrollView>
          <TextComp text={'Featured Destinations'} variant="heading" />
          <ButtonComp
            text="View All"
            onPress={() => navigation.navigate('Featured')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

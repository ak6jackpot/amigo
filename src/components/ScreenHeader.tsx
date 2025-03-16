import {faBell} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Color, getImageURL} from '../utils/displayUtils';
import Typography from './Typography';
import {useNavigation} from '@react-navigation/native';

type ScreenHeaderProps = {
  variant?: string;
  text?: string;
};

export const ScreenHeader = ({
  variant = 'home',
  text = 'It is the journey that matters...',
}: ScreenHeaderProps) => {
  const navigation = useNavigation();
  switch (variant) {
    case 'home':
      return (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            height: 64,
          }}>
          <Pressable
            style={{flex: 1, alignItems: 'flex-start'}}
            onPress={() => {
              navigation?.navigate('Tabs');
            }}>
            <FastImage
              style={{height: 60, aspectRatio: 1}}
              resizeMode={FastImage.resizeMode.contain}
              source={{uri: getImageURL('logo_round', 'png')}}
            />
          </Pressable>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 3,
              height: 60,
            }}>
            <Typography text={text} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                height: 60,
                aspectRatio: 1,
                backgroundColor: Color?.pinkPrimary,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}>
              <FontAwesomeIcon
                icon={faBell}
                size={'100%'}
                color={Color?.black}
              />
            </View>
          </View>
        </View>
      );
    default:
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
          <FastImage
            style={{height: 60, aspectRatio: 1}}
            resizeMode={FastImage.resizeMode.contain}
            source={{uri: getImageURL('logo_round', 'png')}}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                height: 60,
                aspectRatio: 1,
                backgroundColor: 'gray',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}>
              <FontAwesomeIcon icon={faBell} size={'100%'} />
            </View>
            <View
              style={{
                height: 60,
                aspectRatio: 1,
                backgroundColor: 'gray',
                borderRadius: 100,
              }}
            />
          </View>
        </View>
      );
  }
};

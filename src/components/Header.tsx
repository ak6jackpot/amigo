import {faBell} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Color} from '../Utils';

type HeaderProps = {
  variant?: string;
};

export const Header = ({variant = 'home'}: HeaderProps) => {
  switch (variant) {
    case 'home':
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
            flex: 1,
          }}>
          <FastImage
            style={{height: 60, aspectRatio: 1}}
            resizeMode={FastImage.resizeMode.contain}
            source={require('../assets/images/logo_round.png')}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                height: 60,
                aspectRatio: 1,
                backgroundColor: Color?.gray900,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
                marginRight: 4,
              }}>
              <FontAwesomeIcon icon={faBell} size={'100%'} color="#fff" />
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
            source={require('../assets/images/logo_round.png')}
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
              }}
            />
          </View>
        </View>
      );
  }
};

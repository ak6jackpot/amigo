import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';
import {CircularText} from './CircularText';

type DiscProps = {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  color?: string;
  icon?: any;
  mt?: string;
  ml?: string;
};

export const Disc = ({
  size = 'medium',
  text = '',
  color = '#fff',
  icon = faCircle,
  mt = '50%',
  ml = '50%',
}: DiscProps) => {
  return (
    <View
      style={{
        width: size == 'small' ? 80 : size == 'medium' ? 120 : 160,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        backgroundColor: color,
        position: 'absolute',
        marginLeft: ml,
        marginTop: mt,
        zIndex: 2,
      }}>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CircularText text={text} />
      </View>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{rotate: '180deg'}],
        }}>
        <CircularText text={text} />
      </View>

      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesomeIcon
          icon={icon}
          size={size == 'small' ? 20 : size == 'medium' ? 30 : 40}
        />
      </View>
    </View>
  );
};

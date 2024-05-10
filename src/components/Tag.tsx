import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';
import TextComp from './TextComp';

type TagProps = {
  text?: string;
  icon?: any;
  mt?: string;
  ml?: string;
  rotation?: string;
  variant?: 'fill' | 'outline';
};

export const Tag = ({
  text = '',
  icon = faCircle,
  mt = '50%',
  ml = '50%',
  rotation = '0deg',
  variant = 'fill',
}: TagProps) => {
  switch (variant) {
    case 'fill':
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 40,
            marginRight: 8,
            flexDirection: 'row',
            padding: 8,
            backgroundColor: '#EBEBEB',
          }}>
          <TextComp text={text} />
        </View>
      );
    case 'outline':
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 40,
            width: '30%',
            flexDirection: 'row',
            borderWidth: 2,
            borderColor: 'black',
            position: 'absolute',
            padding: 8,
            opacity: 0.6,
            marginLeft: ml,
            marginTop: mt,
            transform: [{rotate: rotation}],
            zIndex: 1,
          }}>
          <FontAwesomeIcon icon={icon} size={20} style={{marginRight: 5}} />
          <TextComp text={text} />
        </View>
      );
  }
};

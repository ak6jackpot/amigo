import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, View} from 'react-native';
import Typography from './Typography';
import {Color, loadLocationDetails} from '../Utils';

type TagProps = {
  text?: string;
  icon?: any;
  mt?: string;
  ml?: string;
  rotation?: string;
  variant?: 'fill' | 'outline';
  data?: Object;
};

export const Tag = ({
  text = '',
  icon = faCircle,
  mt = '50%',
  ml = '50%',
  rotation = '0deg',
  variant = 'fill',
  data = {},
}: TagProps) => {
  const navigation = useNavigation();

  const handlePress = (mapsId: string, tripAdvId: string) => {
    loadLocationDetails(mapsId, tripAdvId, navigation);
  };

  switch (variant) {
    case 'fill':
      return (
        <Pressable
          onPress={() => handlePress(data?.mapsId, data?.tripAdvId)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 40,
            marginRight: 8,
            flexDirection: 'row',
            padding: 8,
            backgroundColor: Color?.grayTag,
          }}>
          <Typography text={data?.label} />
        </Pressable>
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
          <Typography text={text} />
        </View>
      );
  }
};

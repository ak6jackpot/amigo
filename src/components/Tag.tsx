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
};

export const Tag = ({
  text = '',
  icon = faCircle,
  mt = '50%',
  ml = '50%',
  rotation = '0deg',
}: TagProps) => {
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
};

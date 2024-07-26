import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, View} from 'react-native';
import Typography from './Typography';

type ListItemProps = {
  variant?: 'search' | 'trip';
  icon?: any;
  text?: string;
  title?: string;
  textColor?: string;
  onPress?: () => void;
  data?: object;
};

export const ListItem = ({
  icon,
  text = '',
  variant = 'search',
  onPress,
  title = '',
  data = {},
  textColor = '#000',
}: ListItemProps) => {
  switch (variant) {
    case 'search':
      return (
        <Pressable
          onPress={onPress}
          style={({pressed}) => ({
            opacity: pressed ? 0.7 : 1,
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 24,
            borderBottomColor: '#fff',
            borderBottomWidth: 1,
            backgroundColor: '#fff',
          })}>
          <View style={{justifyContent: 'center', marginLeft: 16}}>
            <Typography text={data?.displayName?.text} />
          </View>
        </Pressable>
      );
    case 'trip':
      return (
        <Pressable
          onPress={onPress}
          style={({pressed}) => ({
            opacity: pressed ? 0.7 : 1,
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 24,
            borderBottomColor: '#fff',
            borderBottomWidth: 1,
            backgroundColor: '#fff',
          })}>
          <View
            style={{
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {icon && <FontAwesomeIcon icon={icon} size={16} color={'#000'} />}
          </View>
          <View style={{justifyContent: 'center', marginLeft: 16}}>
            <Typography variant="label" size="large" text={text} />
          </View>
        </Pressable>
      );
  }
};

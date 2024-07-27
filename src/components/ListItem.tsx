import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, View} from 'react-native';
import Typography from './Typography';
import {Color} from '../Utils';

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
  variant = 'search',
  onPress,
  data = {},
  textColor = Color?.black,
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
            borderBottomColor: Color?.whiteBg,
            borderBottomWidth: 1,
            backgroundColor: Color?.whiteBg,
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
            borderBottomColor: Color?.whiteBg,
            borderBottomWidth: 1,
            backgroundColor: Color?.whiteBg,
          })}>
          <View
            style={{
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {icon && (
              <FontAwesomeIcon icon={icon} size={16} color={Color?.black} />
            )}
          </View>
          <View style={{justifyContent: 'center', marginLeft: 16}}>
            <Typography variant="label" size="large" text={data?.text} />
          </View>
        </Pressable>
      );
  }
};

import React, {ReactNode} from 'react';
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
  rightElement?: ReactNode;
  onPressRight?: () => void;
};

export const ListItem = ({
  icon,
  variant = 'search',
  onPress,
  data = {},
  textColor = Color?.black,
  rightElement = null,
  onPressRight,
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
            paddingHorizontal: 2,
            paddingVertical: 2,
            borderColor: Color?.pinkSecodary,
            borderWidth: 3,
            borderRadius: 12,
          })}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: Color?.pinkPrimary,
              width: '100%',
              borderRadius: 9,
              padding: 8,
            }}>
            <Typography
              variant="label"
              size="large"
              text={data?.name}
              color={textColor}
            />
            <Typography
              variant="label"
              size="small"
              text={data?.description}
              color={textColor}
            />
          </View>
          {rightElement && (
            <Pressable
              style={{
                position: 'absolute',
                right: 10,
                height: '100%',
                aspectRatio: 0.5,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={onPressRight}>
              {rightElement}
            </Pressable>
          )}
        </Pressable>
      );
  }
};

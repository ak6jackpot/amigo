import React, {ReactNode} from 'react';
import {Pressable, View} from 'react-native';
import Typography from './Typography';
import {Color, randomColorGenerator} from '../Utils';

type ListItemProps = {
  variant?: 'search' | 'trip' | 'city' | 'template';
  icon?: any;
  text?: string;
  title?: string;
  textColor?: string;
  onPress?: () => void;
  data?: object;
  rightElement?: ReactNode;
  onPressRight?: () => void;
  expanded?: boolean;
};

export const ListItem = ({
  variant = 'search',
  onPress,
  data = {},
  textColor = Color?.black,
  rightElement = null,
  onPressRight,
  expanded = false,
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
            borderBottomColor: Color?.graySend,
            borderBottomWidth: pressed ? 1 : 3,
            backgroundColor: Color?.whiteBg,
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
            borderLeftColor: Color?.graySend,
            borderRightColor: Color?.graySend,
            marginVertical: 4,
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
    case 'city':
      return (
        <Pressable
          onPress={onPress}
          style={({pressed}) => ({
            opacity: pressed ? 0.7 : 1,
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 2,
            paddingVertical: 2,
            borderRadius: 12,
          })}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: randomColorGenerator(),
              width: '100%',
              borderRadius: 9,
              padding: 24,
            }}>
            <Typography
              variant="label"
              text={data?.details?.name}
              color={textColor}
            />
          </View>
          {rightElement && (
            <Pressable
              style={{
                position: 'absolute',
                right: 18,
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
    case 'template':
      return (
        <Pressable
          onPress={onPress}
          style={({pressed}) => ({
            opacity: pressed ? 0.7 : 1,
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 2,
            paddingVertical: expanded ? 0 : 2,
            borderColor: Color?.grayTag,
            borderWidth: 3,
            borderRadius: 12,
            borderBottomWidth: expanded ? 0 : 3,
            borderBottomLeftRadius: expanded ? 0 : 12,
            borderBottomRightRadius: expanded ? 0 : 12,
          })}>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: '#f0f7fc',
              width: '100%',
              borderRadius: 9,
              padding: 8,
              borderBottomLeftRadius: expanded ? 0 : 9,
              borderBottomRightRadius: expanded ? 0 : 9,
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

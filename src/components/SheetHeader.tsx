import {
  faAdd,
  faArrowLeft,
  faShareNodes,
  faToggleOff,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {ActivityIndicator, Pressable, SafeAreaView, View} from 'react-native';
import {Color} from '../utils/displayUtils';
import Typography from './Typography';

type SheetHeaderProps = {
  title?: string;
  rightTitle?: string;
  rightIcon?: any;
  titleSuffix?: React.ReactNode;
  titleStyle?: any;
  left?: 'none' | 'cross' | 'back';
  right?:
    | 'none'
    | 'share'
    | 'family'
    | 'cart'
    | 'expand'
    | 'expanded'
    | 'loader'
    | 'card'
    | 'add';
  onPressLeft?: () => void;
  onPressRight?: () => void;
  description?: string;
  variant?: 'dark' | 'light';
  itemCount?: number;
  closable?: boolean;
  bgColor?: string;
};

const SheetHeader = observer(
  ({
    title = '',
    rightTitle = '',
    rightIcon,
    titleSuffix,
    titleStyle,
    onPressLeft,
    left = 'cross',
    right = 'none',
    onPressRight,
    closable,
    bgColor,
  }: SheetHeaderProps) => {
    const titleOnLeft = left !== 'none' || closable;
    return (
      <SafeAreaView
        style={{
          width: '100%',
          alignItems: 'flex-end',
          flexDirection: 'row',
          backgroundColor: bgColor || Color.background,
          borderTopWidth: 0.1667,
          borderRadius: 24,
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 16,
              paddingHorizontal: 16,
            }}>
            <Pressable
              style={({pressed}) => ({
                alignItems: 'flex-start',
                justifyContent: 'center',
                flex: 1,
                opacity: pressed ? 0.7 : 1,
                paddingBottom: 8,
              })}
              onPress={onPressLeft}>
              {(() => {
                switch (left) {
                  case 'back':
                    return (
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        size={24}
                        color={Color.content}
                      />
                    );
                  case 'cross':
                    return (
                      <FontAwesomeIcon
                        icon={faXmark}
                        size={24}
                        color={Color.content}
                      />
                    );
                  default:
                    return null;
                }
              })()}
            </Pressable>
            <Pressable
              onPress={onPressRight}
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                flex: 1,
              }}>
              {(() => {
                switch (right) {
                  case 'loader':
                    return (
                      <ActivityIndicator
                        color={'white'}
                        size={'large'}
                        style={{margin: 12, height: 10, width: 10}}
                      />
                    );
                  case 'share':
                    return (
                      <FontAwesomeIcon
                        icon={faShareNodes}
                        size={24}
                        color={Color.background}
                      />
                    );
                  case 'expand':
                    return (
                      <FontAwesomeIcon
                        icon={faToggleOff}
                        size={24}
                        color={Color.background}
                      />
                    );
                  case 'expanded':
                    return (
                      <FontAwesomeIcon
                        icon={faToggleOff}
                        size={24}
                        style={{transform: [{rotate: '180deg'}]}}
                        color={Color.background}
                      />
                    );
                  case 'add':
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          borderColor: 'white',
                          borderWidth: 1,
                          borderRadius: 8,
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                        }}>
                        <FontAwesomeIcon
                          icon={faAdd}
                          size={16}
                          style={{transform: [{rotate: '180deg'}]}}
                          color={Color.background}
                        />
                        <Typography
                          text={'Add new Card'}
                          color={'white'}
                          capitalize
                        />
                      </View>
                    );
                  default:
                    return null;
                }
              })()}
            </Pressable>
          </View>
          {!!title && (
            <View style={{paddingBottom: 16, paddingHorizontal: 22}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  ...titleStyle,
                }}>
                <Typography
                  // style={{paddingBottom: 16}}
                  variant={'heading'}
                  size="small"
                  text={title}
                  textAlign={titleOnLeft ? 'left' : 'center'}
                  color={Color.background}
                />
                {titleSuffix}
              </View>
              {!!rightTitle && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                  }}>
                  {!!rightIcon && (
                    <FontAwesomeIcon
                      icon={rightIcon}
                      size={14}
                      style={{marginRight: 6}}
                      color={Color.background}
                    />
                  )}
                  <Typography
                    variant={'label'}
                    size="small"
                    text={rightTitle}
                    textAlign={'left'}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  },
);

export default SheetHeader;

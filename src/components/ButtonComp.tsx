import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {ActivityIndicator, Pressable, TextStyle, ViewStyle} from 'react-native';
import {Color} from '../utils/displayUtils';
import Typography from './Typography';
import {throttle} from '../utils/functionalUtils';
import {faHandSparkles} from '@fortawesome/free-solid-svg-icons';

type ButtonSuperProps = {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary';
  shape?: 'pill' | 'rect' | 'square' | 'circle';
  state?: 'enabled' | 'active' | 'disabled' | 'loading';
  onPress?: () => void;
  text?: string;
  iconLeft?: IconProp;
  iconRight?: IconProp;
  onPressIn?: () => void;
  loadingText?: string;
  customStyle?: ViewStyle;
  activeColor?: string;
  throttleTime?: any;
  textColor?: string;
};

const ButtonComp = ({
  size = 'medium',
  variant = 'primary',
  shape = 'rect',
  onPress,
  text = '',
  iconLeft,
  iconRight,
  onPressIn,
  state = 'enabled',
  loadingText = '',
  customStyle = {},
  activeColor,
  throttleTime,
  textColor,
}: ButtonSuperProps) => {
  let buttonStyles: ViewStyle = {
    borderColor: '#ddd',
  };

  let textStyles: TextStyle = {
    color: 'black',
  };

  switch (size) {
    case 'x-small':
      textStyles.fontSize = 12;
      textStyles.lineHeight = 16;
      textStyles.fontFamily = 'UberMove-Regular';
      buttonStyles = {...buttonStyles, minHeight: 30};
      break;
    case 'small':
      textStyles.fontSize = 14;
      textStyles.lineHeight = 20;
      textStyles.fontFamily = 'UberMove-Medium';
      buttonStyles = {...buttonStyles, minHeight: 36};
      break;
    case 'medium':
      textStyles.fontSize = 16;
      textStyles.lineHeight = 24;
      textStyles.fontFamily = 'UberMove-Bold';
      buttonStyles = {...buttonStyles, minHeight: 48};
      break;
    case 'large':
      textStyles.fontSize = 18;
      textStyles.lineHeight = 24;
      textStyles.fontFamily = 'UberMove-Bold';
      buttonStyles = {...buttonStyles, minHeight: 56};
      break;
  }

  switch (state) {
    case 'loading':
    case 'enabled':
      switch (variant) {
        case 'primary':
          buttonStyles = {
            ...buttonStyles,
            backgroundColor: activeColor ? activeColor : Color.black,
          };
          break;
        case 'secondary':
          buttonStyles = {
            ...buttonStyles,
            backgroundColor: Color.gray900,
          };
          break;
        case 'tertiary':
          buttonStyles = {...buttonStyles, backgroundColor: 'transparent'};
          break;
      }
      break;
    case 'active':
      switch (variant) {
        case 'secondary':
        case 'tertiary':
          buttonStyles = {
            ...buttonStyles,
            backgroundColor: Color.black,
          };
          break;
      }
      break;
    case 'disabled':
      switch (variant) {
        case 'primary':
        case 'secondary':
          buttonStyles = {
            ...buttonStyles,
            opacity: 0.7,
            backgroundColor: Color.gray900,
          };
          break;
        case 'tertiary':
          buttonStyles = {
            ...buttonStyles,
            opacity: 0.7,
            backgroundColor: 'transparent',
          };
          break;
      }
      break;
  }

  switch (shape) {
    case 'rect':
      buttonStyles = {
        ...buttonStyles,
        ...{
          borderRadius: 8,
          padding: 16,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          flexDirection: 'row',
        },
      };
      break;
    case 'circle':
      buttonStyles = {
        ...buttonStyles,
        ...{
          borderRadius: 1000,
          alignItems: 'center',
          aspectRatio: 1,
          justifyContent: 'center',
        },
      };
      break;

    case 'square':
      buttonStyles = {
        ...buttonStyles,
        ...{
          borderRadius: 8,
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: buttonStyles?.minHeight,
        },
      };
      break;
    case 'pill':
      buttonStyles = {
        ...buttonStyles,
        ...{
          borderRadius: 1000,
          paddingHorizontal: textStyles?.lineHeight / 2,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      };
      break;
  }

  const btnStyle = ({pressed}: {pressed: boolean}) => [
    buttonStyles,
    variant == 'primary' && state != 'disabled'
      ? {opacity: pressed ? 0.7 : 1}
      : pressed && {
          backgroundColor: Color.graySend,
        },
    customStyle,
  ];

  // console.log(
  //   'from btn super',
  //   buttonStyles?.backgroundColor,
  //   checkBrightness(String(buttonStyles?.backgroundColor)),
  // );

  return (
    <Pressable
      style={btnStyle}
      onPressIn={onPressIn}
      onPress={onPress && throttle(onPress, throttleTime || 1000)}
      disabled={state == 'disabled' || state == 'loading'}>
      {iconLeft && (
        <FontAwesomeIcon
          size={textStyles?.lineHeight}
          icon={iconLeft}
          color={Color.whiteBg}
          style={
            shape == 'rect' || shape == 'pill'
              ? {
                  marginRight: textStyles?.lineHeight / 2,
                }
              : {}
          }
        />
      )}
      {state == 'loading' ? (
        <>
          <ActivityIndicator color={'#266ef1'} size={textStyles?.lineHeight} />
          {loadingText && (
            <Typography
              variant="label"
              size={size}
              color={Color.whiteBg}
              text={loadingText}
              capitalize={false}
            />
          )}
        </>
      ) : (
        text && (
          <Typography
            variant="label"
            size={size}
            color={!!textColor ? textColor : Color.whiteBg}
            text={text}
            capitalize={false}
          />
        )
      )}
      {(iconRight || (iconLeft && shape == 'rect')) && (
        <FontAwesomeIcon
          size={textStyles?.fontSize}
          icon={iconRight || faHandSparkles}
          color={iconLeft ? 'transparent' : Color.whiteBg}
        />
      )}
    </Pressable>
  );
};

export default ButtonComp;

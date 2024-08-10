import React, {ReactNode} from 'react';
import {Pressable, Text, TextStyle, View, ViewStyle} from 'react-native';
import {Color} from '../Utils';

type ButtonCompProps = {
  size?: 'small' | 'medium' | 'large';
  shape?: 'pill' | 'rect' | 'square' | 'circle';
  onPress?: () => void;
  text?: string;
  left?: ReactNode;
  right?: ReactNode;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  onPressIn?: () => void;
  styles?: Object;
};

const ButtonComp = ({
  size = 'large',
  shape = 'rect',
  onPress,
  text = '',
  left,
  right,
  color = Color?.whiteBg,
  disabled = false,
  textColor = Color?.black,
  onPressIn,
  styles = {},
}: ButtonCompProps) => {
  let buttonStyles: ViewStyle = {
    borderRadius:
      shape === 'pill'
        ? 36
        : shape === 'square'
        ? 0
        : shape === 'circle'
        ? 20
        : 18,
    padding: size === 'small' ? 4 : size === 'large' ? 16 : 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 4,
    borderBottomColor: Color.graySend,
    ...styles,
  };

  const textStyles: TextStyle = {
    color: textColor,
  };

  switch (size) {
    case 'small':
      textStyles.fontSize = 10;
      textStyles.lineHeight = 14;
      textStyles.fontFamily = 'Ubuntu-Regular';
      buttonStyles = {...buttonStyles, minHeight: 30};
      break;
    case 'medium':
      textStyles.fontSize = 12;
      textStyles.lineHeight = 16;
      textStyles.fontFamily = 'Ubuntu-Regular';
      buttonStyles = {...buttonStyles, minHeight: 36};
      break;
    case 'large':
      textStyles.fontSize = 22;
      textStyles.lineHeight = 26;
      textStyles.fontFamily = 'Ubuntu-Bold';
      buttonStyles = {...buttonStyles, minHeight: 56};
      break;
  }

  return (
    <Pressable
      style={({pressed}) => [
        buttonStyles,
        {opacity: pressed ? 0.7 : 1},
        {backgroundColor: color},
        {borderBottomWidth: pressed ? 2 : 4},
      ]}
      onPressIn={onPressIn}
      onPress={onPress}
      disabled={disabled}>
      {left && <View style={{marginRight: 10}}>{left}</View>}
      {text && (
        <View>
          <Text
            style={{
              color: textStyles?.color,
              fontSize: textStyles?.fontSize,
              lineHeight: textStyles?.lineHeight,
              fontFamily: textStyles?.fontFamily,
              textAlign: 'center',
            }}>
            {text}
          </Text>
        </View>
      )}
      {right && <View>{right}</View>}
    </Pressable>
  );
};

export default ButtonComp;

import React from 'react';
import {Text, TextStyle} from 'react-native';

type TypographyProps = {
  variant?: 'label' | 'heading' | 'display' | 'featured';
  size?: 'x-large' | 'large' | 'medium' | 'small';
  color?: string;
  text?: string | number;
  textAlign?: 'center' | 'left' | 'right';
  capitalize?: true | false;
  textStyles?: Object;
  fontFamily?: string;
};

const Typography = ({
  variant = 'label',
  size = 'small',
  color = 'black',
  text,
  textAlign,
  capitalize,
  fontFamily,
  textStyles = {},
}: TypographyProps) => {
  let styles: TextStyle = {
    color: color,
    ...textStyles,
  };

  if (capitalize) {
    styles = {...styles, ...{textTransform: 'capitalize'}};
  }

  switch (variant) {
    case 'label':
      styles = {
        ...styles,
        ...{
          fontFamily: 'Ubuntu-Regular',
          textAlign: 'left',
        },
        ...(capitalize !== false ? {textTransform: 'capitalize'} : {}),
      };
      switch (size) {
        case 'x-large':
          styles = {
            ...styles,
            fontSize: 20,
            lineHeight: 24,
          };
          break;
        case 'large':
          styles = {
            ...styles,
            fontSize: 18,
            lineHeight: 22,
          };
          break;
        case 'medium':
          styles = {
            ...styles,
            fontSize: 16,
            lineHeight: 20,
          };
          break;
        case 'small':
          styles = {
            ...styles,
            fontSize: 14,
            lineHeight: 18,
          };
          break;
      }
      break;
    case 'heading':
      styles = {
        ...styles,
        fontFamily: 'Ubuntu-Medium',
        textAlign: 'left',
      };
      console.log(size, text);
      switch (size) {
        case 'x-large':
          console.log('x-large', text);

          styles = {
            ...styles,
            fontSize: 32,
            lineHeight: 40,
          };
          break;
        case 'large':
          console.log('large', text);

          styles = {
            ...styles,
            fontSize: 28,
            lineHeight: 36,
          };
          break;
        case 'medium':
          console.log('med', text);

          styles = {
            ...styles,
            fontSize: 24,
            lineHeight: 32,
          };
          break;
        case 'small':
          console.log('smal', text);

          styles = {
            ...styles,
            fontSize: 20,
            lineHeight: 28,
          };
          break;
      }
      break;
    case 'display':
      styles = {
        ...styles,
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'left',
      };
      switch (size) {
        case 'x-large':
          styles = {
            ...styles,
            fontSize: 68,
            lineHeight: 76,
          };
          break;
        case 'large':
          styles = {
            ...styles,
            fontSize: 60,
            lineHeight: 68,
          };
          break;
        case 'medium':
          styles = {
            ...styles,
            fontSize: 52,
            lineHeight: 60,
          };
          break;
        case 'small':
          styles = {
            ...styles,
            fontSize: 44,
            lineHeight: 52,
          };
          break;
      }
      break;
    case 'featured':
      styles = {
        ...styles,
        fontFamily: fontFamily || 'BebasNeue-Regular',
        textAlign: 'left',
      };
      switch (size) {
        case 'x-large':
          styles = {
            ...styles,
            fontSize: 68,
            lineHeight: 76,
          };
          break;
        case 'large':
          styles = {
            ...styles,
            fontSize: 44,
            lineHeight: 52,
          };
          break;
        case 'medium':
          styles = {
            ...styles,
            fontSize: 36,
            lineHeight: 44,
          };
          break;
        case 'small':
          console.log('yaha ayega', text);

          styles = {
            ...styles,
            fontSize: 20,
            lineHeight: 24,
          };
          break;
      }
      break;
  }
  return (
    <Text allowFontScaling={false} style={[styles, {textAlign: textAlign}]}>
      {text}
    </Text>
  );
};

export default Typography;

import React from 'react';
import {Text, TextStyle} from 'react-native';

type TextCompProps = {
  variant?: 'label' | 'heading' | 'display';
  size?: 'xx-large' | 'x-large' | 'large' | 'medium' | 'small' | 'x-small';
  color?: string;
  text?: string | number;
  textAlign?: 'center' | 'left' | 'right';
  capitalize?: true | false;
  textStyles?: Object;
};

const TextComp = ({
  variant = 'label',
  size = 'small',
  color = 'black',
  text,
  textAlign,
  capitalize,
  textStyles = {},
}: TextCompProps) => {
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
          fontFamily: 'Rubik-Medium',
          textAlign: 'left',
        },
        ...(capitalize !== false ? {textTransform: 'capitalize'} : {}),
      };
      switch (size) {
        case 'large':
          styles = {
            ...styles,
            fontSize: 18,
            lineHeight: 24,
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
        case 'x-small':
          styles = {
            ...styles,
            fontSize: 12,
            lineHeight: 16,
          };
          break;
      }
      break;
    case 'heading':
      styles = {
        ...styles,
        fontFamily: 'Rubik-Bold',
        textAlign: 'left',
      };
      switch (size) {
        case 'xx-large':
          styles = {
            ...styles,
            fontSize: 40,
            lineHeight: 52,
          };
          break;
        case 'x-large':
          styles = {
            ...styles,
            fontSize: 36,
            lineHeight: 44,
          };
          break;
        case 'large':
          styles = {
            ...styles,
            fontSize: 32,
            lineHeight: 40,
          };
          break;
        case 'medium':
          styles = {
            ...styles,
            fontSize: 28,
            lineHeight: 36,
          };
          break;
        case 'small':
          styles = {
            ...styles,
            fontSize: 24,
            lineHeight: 32,
          };
          break;
        case 'x-small':
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
        fontFamily: 'Rubik-Bold',
        textAlign: 'left',
      };
      switch (size) {
        case 'large':
          styles = {
            ...styles,
            fontSize: 96,
            lineHeight: 112,
          };
          break;
        case 'medium':
          styles = {
            ...styles,
            fontSize: 52,
            lineHeight: 64,
          };
          break;
        case 'small':
          styles = {
            ...styles,
            fontSize: 44,
            lineHeight: 52,
          };
          break;
        case 'x-small':
          styles = {
            ...styles,
            fontSize: 36,
            lineHeight: 44,
          };
          break;
      }
      break;

      styles = {
        ...styles,
        fontFamily: 'UberMoveMono-Medium',
        textAlign: 'left',
      };
      switch (size) {
        case 'large':
          styles = {
            ...styles,
            fontSize: 96,
            lineHeight: 112,
          };
          break;
        case 'medium':
          styles = {
            ...styles,
            fontSize: 52,
            lineHeight: 64,
          };
          break;
        case 'small':
          styles = {
            ...styles,
            fontSize: 44,
            lineHeight: 52,
          };
          break;
        case 'x-small':
          styles = {
            ...styles,
            fontSize: 36,
            lineHeight: 44,
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

export default TextComp;

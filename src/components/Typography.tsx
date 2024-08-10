import React from 'react';
import {Text, TextStyle} from 'react-native';

type TypographyProps = {
  variant?: 'paragraph' | 'label' | 'heading' | 'featured';
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
    case 'paragraph':
      styles = {
        ...styles,
        ...{
          fontFamily: 'Ubuntu-Regular',
          textAlign: 'left',
        },
      };
      switch (size) {
        case 'x-large':
          styles = {
            ...styles,
            fontSize: 16,
            lineHeight: 20,
          };
          break;
        case 'large':
          styles = {
            ...styles,
            fontSize: 14,
            lineHeight: 18,
          };
          break;
        case 'medium':
          styles = {
            ...styles,
            fontSize: 12,
            lineHeight: 16,
          };
          break;
        case 'small':
          styles = {
            ...styles,
            fontSize: 8,
            lineHeight: 12,
          };
          break;
      }
      break;
    case 'label':
      styles = {
        ...styles,
        ...{
          fontFamily: 'Ubuntu-Regular',
          textAlign: 'left',
        },
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
      switch (size) {
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
            fontSize: 28,
            lineHeight: 36,
          };
          break;
        case 'medium':
          styles = {
            ...styles,
            fontSize: 24,
            lineHeight: 32,
          };
          break;
        case 'small':
          styles = {
            ...styles,
            fontSize: 20,
            lineHeight: 28,
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

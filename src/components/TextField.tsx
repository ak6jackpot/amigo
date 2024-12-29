import {useFocusEffect} from '@react-navigation/native';
import React, {forwardRef, ReactNode, useCallback} from 'react';
import {TextInput, TextStyle, View, ViewStyle} from 'react-native';
import Typography from './Typography';
import {Color, primitives} from '../utils/displayUtils';

export type TextFieldProps = {
  label?: string;
  helperText?: string;
  placeholder?: string;
  maxLength?: number;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  autoCapitalize?: 'sentences' | 'words' | 'characters' | 'none';
  disabled?: boolean;
  variant?: 'paragraph' | 'label' | 'heading' | 'display';
  size?: 'x-large' | 'large' | 'medium' | 'small';
  autoFocus?: boolean;
  prefillValue?: string;
  onChangeText?: (e: string) => void;
  sheetName?: string;
  insetElement?: ReactNode;
  startInsetElement?: ReactNode;
  value?: string;
  textAlign?: 'center' | 'left';
  customContainerStyle?: ViewStyle;
  ref?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  insetElementStyle?: ViewStyle;
  startInsetElementWide?: boolean;
};

export const TextField = forwardRef((props: TextFieldProps, ref) => {
  const {
    label,
    helperText,
    placeholder,
    maxLength,
    keyboardType = 'default',
    autoCapitalize,
    disabled = false,
    autoFocus = false,
    variant = 'label',
    size = 'medium',
    onChangeText,
    value = '',
    insetElement,
    startInsetElement,
    textAlign = 'left',
    customContainerStyle,
    onFocus,
    onBlur,
    insetElementStyle,
    startInsetElementWide = false,
  } = props;

  let styles: TextStyle = {color: primitives?.black, flex: 1};
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
  const textRef = ref;

  useFocusEffect(
    useCallback(() => {
      const focus = () => {
        if (autoFocus) {
          setTimeout(() => {
            textRef?.current?.focus();
          }, 10);
        }
      };
      focus();
      return focus;
    }, [autoFocus]),
  );

  return (
    <View
      style={{
        width: '100%',
      }}>
      {!!label && (
        <Typography
          variant="label"
          size="medium"
          text={label}
          capitalize={false}
        />
      )}
      <View
        style={[
          {
            width: '100%',
            aspectRatio: 6.9,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Color.whiteBg,
            borderRadius: 100,
            borderWidth: 2,
            marginVertical: 8,
            borderColor: '#fae1cd',
            paddingLeft: startInsetElement ? 0 : 8,
            paddingRight: insetElement ? 0 : 8,
            overflow: 'hidden',
          },
          customContainerStyle,
        ]}>
        {startInsetElement && (
          <View style={{flex: 1}}>{startInsetElement}</View>
        )}
        <View
          style={{
            flex: startInsetElementWide ? 4 : 7 - (startInsetElement ? 1 : 0),
          }}>
          <TextInput
            placeholderTextColor="#6b6b6b"
            cursorColor="#266ef1"
            style={[styles]}
            ref={textRef}
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType}
            placeholder={placeholder}
            editable={!disabled}
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            autoFocus={autoFocus}
            textAlign={textAlign}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </View>
        {insetElement && (
          <View
            style={[
              {
                paddingRight: 8,
                alignItems: 'flex-end',
              },
              insetElementStyle,
            ]}>
            {insetElement}
          </View>
        )}
      </View>
      {helperText && (
        <View style={{marginTop: 4, marginBottom: 4}}>
          <Typography
            variant="paragraph"
            size="medium"
            text={helperText}
            color="#6B6B6B"
          />
        </View>
      )}
    </View>
  );
});

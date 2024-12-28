import React, {useEffect, useRef, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {Blinker} from './Blinker';
import Typography from './Typography';

const PINCode = ({
  code,
  setCode,
  maximumLength,
  setIsPinReady = () => {},
  label,
  helperText = '',
  PINRef = useRef(),
  autoFocus = false,
  variant = 'num',
  aspectRatio = 1,
  labelVariant = 'label',
}) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = PINRef;

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(true);

  const handleOnPress = () => {
    inputRef.current?.focus();
    setIsInputBoxFocused(true);
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code?.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);
  const boxDigit = (num: number, index: number) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code?.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code?.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    return (
      <View
        style={{
          height: '100%',
          aspectRatio: aspectRatio,
          marginLeft: index % maximumLength !== 0 && 8,
          backgroundColor: '#eeeeee',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          flexDirection: 'row',
          borderRadius: Math.ceil(40 / maximumLength),
          borderColor: isInputBoxFocused && isValueFocused ? 'black' : '#eee',
        }}
        key={index}>
        <Typography
          variant="label"
          size="medium"
          text={digit}
          color={'black'}
        />
        {isInputBoxFocused && isValueFocused && !digit && (
          <Blinker size={24} color="#266ef1" />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
      }}>
      {label && (
        <Typography
          capitalize={false}
          variant={labelVariant}
          size="medium"
          text={label}
        />
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 4,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            aspectRatio: 7,
            overflow: 'hidden',
          }}
          onPress={handleOnPress}>
          {boxArray.map(boxDigit)}
          <TextInput
            style={{
              opacity: 0,
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            keyboardType={variant == 'str' ? 'default' : 'numeric'}
            value={code}
            ref={inputRef}
            onChangeText={setCode}
            maxLength={maximumLength}
            autoFocus={autoFocus}
            caretHidden={true}
            onBlur={handleOnBlur}
            autoComplete="one-time-code"
          />
        </TouchableOpacity>
      </View>
      {helperText && (
        <View style={{marginBottom: 4}}>
          <Typography
            variant="paragraph"
            size="x-small"
            text={helperText}
            color="#6B6B6B"
          />
        </View>
      )}
    </View>
  );
};

export default PINCode;

/* eslint-disable react/react-in-jsx-scope */
import {Pressable, View} from 'react-native';
import Typography from './Typography';
import {Color} from '../Utils';
import {functionDataStore} from '../storeDefinitions';

export type SnackType = {
  text: string;
  duration?: 'default' | 'stay' | 'indefinite';
  actionFunction?: Function;
  actionText?: string;
  variant?: 'error' | 'success' | 'warning' | 'quote';
};

export const SnackUI = ({
  text,
  duration = 'default',
  actionFunction,
  actionText,
  variant = 'quote',
}: SnackType) => (
  <Pressable
    onPress={() => {
      actionFunction ? actionFunction() : functionDataStore?.clearSnack();
    }}
    style={({pressed}) => [
      {opacity: pressed ? 0.7 : 1},
      {
        position: 'absolute',
        width: '100%',
        padding: 16,
        bottom: 56,
        zIndex: 9999,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:
          variant === 'success'
            ? '#0e8345'
            : variant === 'error'
            ? '#de1165'
            : variant === 'quote'
            ? Color?.whiteBg
            : '#f6bc2f',
      },
    ]}>
    <View style={{}}>
      <Typography color={Color?.whiteBg} text={text} size="medium" />
    </View>
    <View style={{}}>
      {actionText ? (
        <Typography color={Color?.whiteBg} text={actionText} size="medium" />
      ) : null}
    </View>
  </Pressable>
);

export const Snack = ({
  text,
  duration = 'default',
  actionFunction,
  actionText,
  variant = 'quote',
}: SnackType) => {
  functionDataStore?.showSnack({
    text: typeof text === 'object' ? JSON.stringify(text) : text,
    variant: variant,
    duration:
      duration === 'stay' ? 4000 : duration === 'indefinite' ? 60000 : 2750,
    actionFunction: actionFunction,
    actionText: actionText,
  });
};

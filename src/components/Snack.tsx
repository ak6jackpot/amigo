/* eslint-disable react/react-in-jsx-scope */
import {Pressable, View} from 'react-native';
import Typography from './Typography';
import {Color} from '../utils/displayUtils';
import {functionDataStore} from '../utils/store';
import * as Animatable from 'react-native-animatable';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

export type SnackType = {
  text: string;
  duration?: number;
  actionFunction?: Function;
  actionText?: string;
  variant?: 'error' | 'success' | 'warning' | 'quote';
  animation?:
    | 'bounce'
    | 'flash'
    | 'jello'
    | 'pulse'
    | 'rotate'
    | 'rubberBand'
    | 'shake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | 'bounceIn'
    | 'bounceInDown'
    | 'bounceInUp'
    | 'bounceInLeft'
    | 'bounceInRight'
    | 'bounceOut'
    | 'bounceOutDown'
    | 'bounceOutUp'
    | 'bounceOutLeft'
    | 'bounceOutRight'
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutDownBig'
    | 'fadeOutUp'
    | 'fadeOutUpBig'
    | 'fadeOutLeft'
    | 'fadeOutLeftBig'
    | 'fadeOutRight'
    | 'fadeOutRightBig'
    | 'flipInX'
    | 'flipInY'
    | 'flipOutX'
    | 'flipOutY'
    | 'lightSpeedIn'
    | 'lightSpeedOut'
    | 'slideInDown'
    | 'slideInUp'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideOutDown'
    | 'slideOutUp'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'zoomIn'
    | 'zoomInDown'
    | 'zoomInUp'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'zoomOut'
    | 'zoomOutDown'
    | 'zoomOutUp'
    | 'zoomOutLeft'
    | 'zoomOutRight';
};

export const SnackUI = ({
  text,
  duration = 2500,
  actionFunction,
  actionText,
  variant = 'quote',
  animation = 'bounceInUp',
}: SnackType) => (
  <Animatable.View animation={animation} iterationCount={1} duration={2000}>
    <Pressable
      onPress={() => {
        actionFunction ? actionFunction() : null;
      }}
      disabled={actionFunction ? false : true}
      style={({pressed}) => [
        {opacity: pressed ? 0.7 : 1},
        {
          position: 'absolute',
          // width: '80%',
          padding: 16,
          bottom: 54,
          zIndex: 9999,
          alignSelf: 'center',
          borderRadius: 12,
          shadowColor: Color?.black,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor:
            variant === 'success'
              ? '#0e8345'
              : variant === 'error'
              ? '#de1165'
              : variant === 'quote'
              ? Color?.black
              : '#f6bc2f',
        },
      ]}>
      <View style={{}}>
        <Typography color={Color?.whiteBg} text={text} size="medium" />
      </View>
      <Pressable
        style={{}}
        onPress={() => {
          actionFunction ? actionFunction() : functionDataStore?.clearSnack();
        }}>
        {actionText ? (
          <View
            style={{
              padding: 12,
              marginLeft: 8,
              borderRadius: 8,
              backgroundColor:
                variant === 'success'
                  ? '#22b567'
                  : variant === 'error'
                  ? '#f55f9e'
                  : variant === 'quote'
                  ? '#828181'
                  : '#8f6c14',
            }}>
            <Typography
              color={Color?.whiteBg}
              text={actionText}
              size="medium"
            />
          </View>
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            color={Color?.whiteBg}
            style={{marginLeft: 8}}
            size={24}
          />
        )}
      </Pressable>
    </Pressable>
  </Animatable.View>
);

export const Snack = ({
  text,
  duration = 2500,
  actionFunction,
  actionText,
  variant = 'quote',
  animation,
}: SnackType) => {
  functionDataStore?.showSnack({
    text: typeof text === 'object' ? JSON.stringify(text) : text,
    variant: variant,
    duration: duration,
    actionFunction: actionFunction,
    actionText: actionText,
    animation: animation,
  });
};

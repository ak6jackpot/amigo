import {faChevronDown, faMobile} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';
import ButtonComp from '../components/ButtonComp';
import PINCode from '../components/PINCode';
import SheetHeader from '../components/SheetHeader';
import {Snack} from '../components/Snack';
import {TextField} from '../components/TextField';
import Typography from '../components/Typography';
import {
  SheetManagerSuper,
  hideAllSheets,
  hideMultipleSheets,
} from '../utils/SheetManagerSuper';
import {Color, getImageURL} from '../utils/displayUtils';
import serverCall from '../utils/serverCall';
import {idDataStore, userDataStore} from '../utils/store';
import {countryList} from './Country';
import {allSheetNames} from './sheets';

export const Login = () => {
  const timerCount = 30;
  const [phone, setPhone] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const navigation = useNavigation();
  const [counter, setCounter] = useState(timerCount);
  const [resend, setResend] = useState(false);
  const [otpCode, setOTPCode] = useState('');
  const [activityIndicatorVisible, setActivityIndicatorVisible] =
    useState(false);
  const [buttonLoaderVisible, setButtonLoaderVisible] = useState(false);
  const sheetRef = useRef(null);
  const inputRef = useRef(null);
  const [country, setCountry] = useState(countryList[0]);
  const [authType, setAuthType] = useState('signup');
  const [authMethod, setAuthMethod] = useState('');
  // function used to set input value for phone
  const onChangePhone = (e: string) => {
    setPhone(e?.replace(/[^\d.-]+/g, '').slice(-1 * country?.maxLength));
    if (e?.length == country?.maxLength) {
      Keyboard.dismiss();
    } else {
      setOtpSent(false);
      setOTPCode('');
    }
  };

  const onButtonClick = () => {
    setButtonLoaderVisible(true);
    AsyncStorage.setItem('phone', country?.value + phone);

    setResend(false);
    setCounter(timerCount);

    const requestBody = {
      phone: country?.value + phone,
      appOrigin: 'superpe',
      whatsapp: true,
      deviceId: idDataStore?.idData?.deviceId,
    };
    serverCall('generateOtp', requestBody, 0)
      .then(async result => {
        const {merchant_id, phone, session_id} = result?.data?.data || {};
        const status = result?.status;
        switch (status) {
          case 200:
            if (merchant_id && phone && session_id) {
              AsyncStorage.setItem('sessionId', session_id);
              AsyncStorage.setItem('merchantId', merchant_id);
              AsyncStorage.setItem('phone', phone);

              setActivityIndicatorVisible(false);
              Snack({
                text: 'Validating you Super fast ✨',
                variant: 'quote',
              });
              idDataStore?.setIDData({
                sessionId: session_id,
                merchantId: merchant_id,
              });
              userDataStore?.setUserData({
                phone: phone,
              });
              hideMultipleSheets(allSheetNames);

              setTimeout(() => {
                Snack({
                  text: 'Welcome to SuperPe! 👋🏼',
                  variant: 'quote',
                });
                navigation.navigate('HomeTopTabs');
              }, 500);
            } else {
              setOtpSent(true);
            }
            break;
        }
        setButtonLoaderVisible(false);
      })
      .catch(error => {
        console.error('API error:', error);
        Snack({
          text: 'Something went wrong',
          variant: 'error',
        });
        setButtonLoaderVisible(false);
      });
  };

  useEffect(() => {
    const timer =
      counter &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    if (counter === 0) {
      setResend(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  return (
    <ActionSheet
      ref={sheetRef}
      closable={true}
      closeOnTouchBackdrop={true}
      closeOnPressBack={true}
      containerStyle={{
        backgroundColor: Color.background,
      }}>
      <SheetHeader
        onPressLeft={() => {
          sheetRef?.current?.hide();
        }}
      />
      <View
        style={{
          padding: 16,
          alignItems: 'center',
          height: authMethod == '' ? '100%' : 'auto',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        {authMethod == 'email' ? (
          <></>
        ) : authMethod == 'phone' ? (
          <View style={{width: '100%', alignItems: 'center'}}>
            {activityIndicatorVisible && (
              <View
                style={{
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                  zIndex: 200,
                }}>
                <View
                  style={{
                    width: '100%',
                    position: 'absolute',
                    height: '100%',
                    backgroundColor: '#fff',
                    opacity: 0.5,
                  }}
                />
                <ActivityIndicator size="large" color="#266ef1" />
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}>
              <TextField
                ref={inputRef}
                onChangeText={onChangePhone}
                value={phone}
                label={'Phone Number'}
                maxLength={15} //for enabling auto fill
                keyboardType="phone-pad"
                autoFocus={Platform.OS === 'ios' ? true : false}
                placeholder="Enter your phone number"
                startInsetElement={
                  <Pressable
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      SheetManagerSuper('Country', {
                        payload: {setCountry},
                      });
                    }}>
                    <Typography text={country?.title} variant="heading" />
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{marginLeft: 8}}
                      size={8}
                    />
                  </Pressable>
                }
                startInsetElementWide
              />
            </View>
            {otpSent ? (
              <View style={{marginTop: 16}}>
                <PINCode
                  code={otpCode}
                  setCode={setOTPCode}
                  maximumLength={4}
                  setIsPinReady={(pinReady: boolean) => {
                    if (pinReady && otpCode?.length === 4) {
                      const requestBody = {
                        phone: country?.value + phone,
                        source: 'mewtapp',
                        token: otpCode,
                        deviceId: rootStore?.ID?.idData?.deviceId,
                      };
                      setActivityIndicatorVisible(true);
                      serverCall('validateOtp', requestBody, 0)
                        .then(result => {
                          // console.log(result?.data);
                          const status = result?.status;

                          switch (status) {
                            case 200:
                              setActivityIndicatorVisible(false);
                              Snack({
                                text: 'Validating you Super fast ✨',
                                variant: 'quote',
                              });
                              AsyncStorage.setItem(
                                'sessionId',
                                result?.data?.data?.sessionId,
                              );
                              idDataStore?.setIDData({
                                sessionId: result?.data?.data?.sessionId,
                              });
                              userDataStore?.setUserData({
                                phone: phone,
                              });
                              const requestBody = {
                                phone: country?.value + phone,
                              };
                              serverCall('createUser', requestBody)
                                .then(result => {
                                  console.log(
                                    'create merchant API response:',
                                    result?.data,
                                  );
                                  AsyncStorage.setItem(
                                    'merchantId',
                                    result?.data?.merchantId,
                                  ).then(async () => {
                                    idDataStore?.setIDData({
                                      merchantId: result?.data?.merchantId,
                                    });
                                  });
                                  hideAllSheets();

                                  Snack({
                                    text: 'Welcome to Amigo! 👋🏼',
                                    variant: 'quote',
                                  });
                                  setTimeout(() => {
                                    navigation.navigate('HomeTopTabs');
                                  }, 500);
                                })
                                .catch(error => {
                                  console.error('API error:', error);
                                  Snack({
                                    variant: 'error',
                                    text:
                                      error?.response?.data?.error?.message ||
                                      '',
                                  });
                                });
                              break;
                            case 500:
                              setActivityIndicatorVisible(false);
                              Snack({
                                text: 'Wrong OTP entered! New OTP will be sent after 3 unsuccessful attempts.',
                                variant: 'error',
                              });
                              break;
                            default:
                              setActivityIndicatorVisible(false);
                              Snack({
                                text: 'Something went wrong',
                                variant: 'error',
                              });
                              break;
                          }
                        })
                        .catch(error => {
                          console.log(
                            error?.response?.data,
                            'validateotp error',
                          );

                          setActivityIndicatorVisible(false);

                          if (
                            error?.response?.data?.error?.message ==
                            'OTP not verified'
                          ) {
                            Snack({
                              variant: 'error',
                              text: 'Wrong OTP entered! New OTP will be sent after 3 unsuccessful attempts.',
                            });
                          } else {
                            Snack({
                              variant: 'error',
                              text: error?.response?.data?.error?.message || '',
                            });
                          }
                        });
                    }
                  }}
                  label="One time password"
                  autoFocus={true}
                  helperText={
                    country?.value == '+91'
                      ? 'Check SMS for the OTP recieved'
                      : 'You will receive the OTP via a phone call'
                  }
                />
                <View style={{justifyContent: 'center'}}>
                  {resend && (
                    <ButtonComp
                      variant="tertiary"
                      size="large"
                      text={'Resend OTP'}
                      onPress={onButtonClick}
                    />
                  )}
                  {!resend && (
                    <View style={{flexDirection: 'row'}}>
                      <Typography
                        text={'Send OTP again in'}
                        variant="paragraph"
                        size="medium"
                      />
                      <Typography
                        text={` 00:${
                          counter?.toString()?.length > 1
                            ? counter
                            : '0' + counter?.toString()
                        }`}
                        variant="paragraph"
                        size="medium"
                      />
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <ButtonComp
                state={
                  buttonLoaderVisible
                    ? 'loading'
                    : phone?.length == country?.maxLength
                    ? 'enabled'
                    : 'disabled'
                }
                onPress={onButtonClick}
                text={'Next'}
                size="large"
                throttleTime={5000}
                customStyle={{marginVertical: 8}}
              />
            )}
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
              height: '100%',
            }}>
            <Text
              style={{
                fontFamily: 'KaushanScript-Regular',
                fontSize: 40,
                color: 'black',
              }}>
              amigo
            </Text>
            <View style={{paddingHorizontal: 16, alignItems: 'center'}}>
              <Pressable
                style={{
                  width: '100%',
                  borderRadius: 100,
                  flexDirection: 'row',
                  borderWidth: 1,
                  padding: 16,
                }}
                onPress={() => {
                  setAuthMethod('email');
                }}>
                <FastImage
                  style={{height: 24, aspectRatio: 1, marginRight: 4}}
                  resizeMode={FastImage.resizeMode.contain}
                  source={{uri: getImageURL('google', 'png')}}
                />
                <Typography
                  text={`${
                    authType === 'signup' ? 'Sign up' : 'Log in'
                  } using Google`}
                  size="large"
                />
              </Pressable>
              <Typography text={'OR'} textStyles={{marginVertical: 16}} />
              <Pressable
                style={{
                  width: '100%',
                  borderRadius: 100,
                  flexDirection: 'row',
                  borderWidth: 1,
                  padding: 16,
                }}
                onPress={() => {
                  setAuthMethod('phone');
                }}>
                <FontAwesomeIcon
                  icon={faMobile}
                  size={24}
                  style={{marginRight: 4}}
                />
                <Typography
                  text={`${
                    authType === 'signup' ? 'Sign up' : 'Log in'
                  } using Phone number`}
                  size="large"
                />
              </Pressable>
            </View>
            <Pressable
              style={{
                width: '100%',
                padding: 1,
                alignSelf: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                setAuthType(authType == 'signup' ? 'login' : 'signup');
              }}>
              <View>
                <Typography
                  text={`${
                    authType === 'signup'
                      ? 'Already have an account? '
                      : 'New to Amigo? '
                  }`}
                />
              </View>
              <View style={{borderBottomWidth: 1, padding: 1}}>
                <Typography
                  text={`${authType === 'signup' ? 'Log in' : 'Sign up'}`}
                />
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </ActionSheet>
  );
};

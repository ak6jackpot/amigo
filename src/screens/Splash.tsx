import {faHand} from '@fortawesome/free-regular-svg-icons';
import {
  faCar,
  faChampagneGlasses,
  faEarthAmericas,
  faMapLocationDot,
  faPlaneCircleCheck,
  faRoute,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect} from 'react';
import {BackHandler, Text, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import ButtonComp from '../components/ButtonComp';
import {Disc} from '../components/Disc';
import {Tag} from '../components/Tag';
import Typography from '../components/Typography';
import {
  SheetManagerSuper,
  hideMultipleSheets,
} from '../utils/SheetManagerSuper';
import {appInitialisation} from '../utils/appInitialisation';
import {Color, screenHeight, screenWidth} from '../utils/displayUtils';
import {idDataStore, userDataStore} from '../utils/store';

export const Splash = observer(() => {
  const navigation = useNavigation();

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const AsyncGet = async () => {
    await AsyncStorage.multiGet([
      'consent',
      'sessionId',
      'merchantId',
      'phone',
      'biometricRequired',
      'disclaimer',
      'firstTimeAppOpen',
    ])
      .then(async response => {
        const [
          consent,
          session,
          merchant,
          phoneNumber,
          biometricRequired,
          disclaimer,
          firstTimeAppOpen,
        ] = [
          response[0][1],
          response[1][1],
          response[2][1],
          response[3][1],
          response[4][1],
          response[5][1],
          response[6][1],
        ];

        let sessionId = session;
        let merchantId = merchant;
        let phone = phoneNumber;

        console.log(
          consent,
          session,
          merchant,
          phoneNumber,
          biometricRequired,
          disclaimer,
          firstTimeAppOpen,
          'splash -- async get',
        );

        idDataStore?.setIDData({
          biometricRequired: biometricRequired,
        });

        if (sessionId !== null && merchantId !== null) {
          console.log('splash -- previously logged in');

          idDataStore?.setIDData({
            sessionId: sessionId,
            merchantId: merchantId,
          });
          userDataStore?.setUserData({
            phone: phone,
          });
          appInitialisation(navigation).then(async resp => {
            console.log('splash -- fetching loc and navigating');

            GetLocation.getCurrentPosition({
              enableHighAccuracy: true,
              timeout: 60000,
            }).then(location => {
              // console.log(location, 'location');
              userDataStore?.setUserData({currentLocation: location});
            });
            navigation.navigate('Tabs');
          });
        } else {
          console.log('splash -- navigating to login');
          SheetManagerSuper('Login');
        }
      })
      .catch(error => console.log(error, 'splash -- async get error'));
  };

  useFocusEffect(
    useCallback(() => {
      AsyncGet();
      return () => {
        hideMultipleSheets(['Login']);
      };
    }, []),
  );

  return (
    <View
      style={{
        padding: 8,
        backgroundColor: Color.beigeBg,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
        height: screenHeight,
      }}>
      <Text
        style={{
          fontFamily: 'KaushanScript-Regular',
          fontSize: 40,
          color: 'black',
        }}>
        amigo
      </Text>

      <View style={{width: '100%', marginVertical: 16, height: 400}}>
        <Disc
          icon={faEarthAmericas}
          text="Go Anywhere"
          color="#bbfdf8"
          ml="10%"
          mt="5%"
          size="small"
        />
        <Disc icon={faHand} text="Hey There" color="#fafe78" ml="60%" mt="5%" />
        <Disc
          icon={faPlaneCircleCheck}
          text="Verified Routes"
          color="#f3b2b0"
          ml="40%"
          mt="30%"
          size="small"
        />
        <Disc
          icon={faRoute}
          text="Plan your Trip"
          color="#f9da84"
          ml="10%"
          mt="60%"
        />
        <Disc
          icon={faUmbrellaBeach}
          text="Chill with Amigo"
          color="#fcefcb"
          ml="70%"
          mt="60%"
          size="medium"
        />

        <Tag
          text="Car Trip"
          icon={faCar}
          ml="0%"
          mt="25%"
          rotation="-30deg"
          variant="outline"
        />
        <Tag
          text="Celebrate"
          icon={faChampagneGlasses}
          ml="55%"
          mt="40%"
          rotation="30deg"
          variant="outline"
        />
        <Tag
          text="Explore"
          icon={faMapLocationDot}
          ml="35%"
          mt="70%"
          variant="outline"
        />
      </View>
      <Typography text={'Travel Planner'} variant="heading" />

      <Typography
        text={'Travel anywhere in the world'}
        variant="label"
        size="small"
      />
      <Typography text={'without any hassle'} variant="label" size="small" />
    </View>
  );
});

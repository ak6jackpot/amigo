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
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Color, screenHeight, screenWidth} from '../Utils';
import ButtonComp from '../components/ButtonComp';
import {Disc} from '../components/Disc';
import {Tag} from '../components/Tag';
import Typography from '../components/Typography';
import {useNavigation} from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import itineraryStore, {userDataStore} from '../storeDefinitions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {observer} from 'mobx-react-lite';

export const Splash = observer(() => {
  const navigation = useNavigation();

  const AsyncGet = async () => {
    AsyncStorage?.getItem('itineraries').then(res => {
      JSON?.parse(res)?.map(item => {
        itineraryStore?.addItinerary(item);
      });
    });
  };
  useEffect(() => {
    AsyncGet();
  }, []);
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

      <ButtonComp
        text="Let's Get started!"
        color={Color.pinkPrimary}
        textColor="#190b14"
        onPress={() => {
          // Snack({
          //   text: 'This destination has already been added!',
          //   variant: 'quote',
          //   actionText: 'View',
          //   actionFunction: () => {
          //     navigation?.navigate('Tabs');
          //   },
          // });
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
          })
            .then(location => {
              // console.log(location, 'location');
              userDataStore?.setUserData({currentLocation: location});
            })
            .catch(error => {
              const {code, message} = error;
              console.log(code, message);
            });
          navigation.navigate('Tabs');
        }}
      />
    </View>
  );
});

import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Color} from '../Utils';
import Typography from '../components/Typography';
import ButtonComp from '../components/ButtonComp';

export const ItineraryTemplates = observer(({route}) => {
  const navigation = useNavigation();
  const [animationTrigger, setAnimationTrigger] = useState(null);
  const [visitedMessage, setVisitedMessage] = useState(false);

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: Color.beigeBg,
          padding: 16,
          height: '100%',
          width: '100%',
        }}>
        <Typography text={'Plan your dream Vacation!'} variant="heading" />
        <Typography
          text={
            'Pick from specially-curated itineraries or create one on your own!'
          }
          size="large"
        />
        <Typography text={'North america'} variant="heading" size="x-small" />
        <Typography text={'europe'} variant="heading" size="x-small" />
        <Typography text={'south east asia'} variant="heading" size="x-small" />
        <Typography text={'australia & nz'} variant="heading" size="x-small" />
        <Typography text={'arab'} variant="heading" size="x-small" />

        <ButtonComp
          text="Create one from Scratch"
          color={Color.buttonPink}
          textColor="#190b14"
          shape="pill"
          onPress={() => {
            navigation?.navigate('CreateItinerary');
          }}
        />
      </View>
    </SafeAreaView>
  );
});

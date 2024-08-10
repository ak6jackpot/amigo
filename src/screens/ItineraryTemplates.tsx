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
        <Typography text={'North america'} variant="paragraph" size="large" />
        <Typography text={'europe'} variant="paragraph" size="large" />
        <Typography text={'south east asia'} variant="paragraph" size="large" />
        <Typography text={'australia & nz'} variant="paragraph" size="large" />
        <Typography text={'arab'} variant="paragraph" size="large" />

        <ButtonComp
          text="Create one from Scratch"
          color={Color.buttonPink}
          textColor="#190b14"
          onPress={() => {
            navigation?.navigate('CreateItinerary');
          }}
        />
      </View>
    </SafeAreaView>
  );
});

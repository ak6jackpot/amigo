import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Color} from '../Utils';
import Typography from '../components/Typography';
import ButtonComp from '../components/ButtonComp';

export const CreateItinerary = observer(({route}) => {
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
        <Typography text={'name input'} variant="heading" />
      </View>
    </SafeAreaView>
  );
});

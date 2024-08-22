import {observer} from 'mobx-react-lite';
import React from 'react';
import {View} from 'react-native';
import {Color} from '../Utils';
import Typography from '../components/Typography';
import {Header} from '../components/Header';

export const Profile = observer(({route}) => {
  return (
    <View
      style={{
        backgroundColor: Color.beigeBg,
        padding: 16,
        flex: 1,
      }}>
      <Header />

      <Typography text={'profile'} />
    </View>
  );
});

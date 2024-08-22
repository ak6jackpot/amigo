import {observer} from 'mobx-react-lite';
import React from 'react';
import {View} from 'react-native';
import {Color} from '../Utils';
import Typography from '../components/Typography';

export const Profile = observer(({route}) => {
  return (
    <View
      style={{
        backgroundColor: Color.beigeBg,
        padding: 16,
        flex: 1,
      }}>
      <Typography text={'profile'} />
    </View>
  );
});

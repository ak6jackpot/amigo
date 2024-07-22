import React from 'react';
import {View} from 'react-native';
import Typography from '../components/Typography';
import {ListItem} from '../components/ListItem';
import {faHourglass} from '@fortawesome/free-solid-svg-icons';

export const Search = ({route}) => {
  return (
    <View
      style={{
        backgroundColor: '#FEF9F5',
        padding: 16,
        flex: 1,
      }}>
      <Typography text={'input here'} />
      <ListItem text="yooo" icon={faHourglass} />
    </View>
  );
};

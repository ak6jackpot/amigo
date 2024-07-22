import React from 'react';
import {View} from 'react-native';
import Typography from '../components/Typography';
import {ListItem} from '../components/ListItem';
import {faHourglass} from '@fortawesome/free-solid-svg-icons';
import ButtonComp from '../components/ButtonComp';
import {tripsDataStore} from '../storeDefinitions';

export const Itineraries = ({route}) => {
  return (
    <View
      style={{
        backgroundColor: '#FEF9F5',
        padding: 16,
        flex: 1,
      }}>
      <Typography text={'Your Trips'} />
      {tripsDataStore?.tripsData?.upcoming?.length > 0 ? (
        <ListItem text="yooo" variant="trip" icon={faHourglass} />
      ) : (
        <Typography text={'No trips created yet!'} />
      )}
      <ButtonComp text="Create New" />
    </View>
  );
};

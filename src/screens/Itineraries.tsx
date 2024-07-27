import React from 'react';
import {View} from 'react-native';
import Typography from '../components/Typography';
import {ListItem} from '../components/ListItem';
import {faHourglass} from '@fortawesome/free-solid-svg-icons';
import ButtonComp from '../components/ButtonComp';
import {tripsDataStore} from '../storeDefinitions';
import {Color} from '../Utils';

export const Itineraries = ({route}) => {
  return (
    <View
      style={{
        backgroundColor: Color.beigeBg,
        padding: 16,
        flex: 1,
      }}>
      <Typography variant="heading" text={'Your Trips'} />
      <View style={{marginVertical: 8}}>
        {tripsDataStore?.tripsData?.upcoming?.length > 0 ? (
          <ListItem text="yooo" variant="trip" icon={faHourglass} />
        ) : (
          <Typography text={'No trips created yet!'} />
        )}
      </View>
      <ButtonComp
        text="Create Now"
        color="#EEA0FF"
        textColor="#190b14"
        shape="pill"
        onPress={() => {}}
      />
    </View>
  );
};

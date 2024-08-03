import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Typography from '../components/Typography';
import ButtonComp from '../components/ButtonComp';
import itineraryStore from '../storeDefinitions';
import {Color} from '../Utils';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from '../components/ListItem';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

export const Itineraries = ({route}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: Color.beigeBg,
          padding: 16,
        }}>
        <Typography variant="heading" text={'Your Trips'} />
        <View style={{marginVertical: 8}}>
          {itineraryStore?.itineraries?.length > 0 ? (
            <FlatList
              data={itineraryStore?.itineraries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <ListItem
                  variant="trip"
                  data={item}
                  onPress={() => {
                    navigation?.navigate('ItineraryDetails', {
                      itineraryId: item?.id,
                    });
                  }}
                  rightElement={
                    <FontAwesomeIcon icon={faTrash} color={'#e35f59'} />
                  }
                  onPressRight={() => {
                    itineraryStore?.removeItinerary(item.id);
                  }}
                />
              )}
            />
          ) : (
            <>
              <Typography text={'No trips created yet!'} />
              <ButtonComp
                text="Create Now"
                color="#EEA0FF"
                textColor="#190b14"
                shape="pill"
                onPress={() => {}}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

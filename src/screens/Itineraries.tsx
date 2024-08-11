import React, {useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {observer} from 'mobx-react-lite';

export const Itineraries = observer(({route}) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(itineraryStore?.itineraries, '-----------');
  }, [itineraryStore?.itineraries]);

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
            <>
              <FlatList
                contentContainerStyle={{
                  marginVertical: 16,
                  width: '100%',
                }}
                data={itineraryStore?.itineraries}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={{marginVertical: 8}}>
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
                        setTimeout(() => {
                          AsyncStorage?.setItem(
                            'itineraries',
                            JSON.stringify(itineraryStore?.itineraries),
                          );
                        }, 500);
                      }}
                    />
                  </View>
                )}
              />
              <ButtonComp
                text="Create another trip"
                color={Color.buttonPink}
                textColor="#190b14"
                width100={true}
                onPress={() => {
                  navigation?.navigate('ItineraryTemplates');
                }}
              />
            </>
          ) : (
            <>
              <Typography text={'No trips created yet!'} />
              <ButtonComp
                text="Create Now"
                color={Color.buttonPink}
                textColor="#190b14"
                onPress={() => {
                  navigation?.navigate('ItineraryTemplates');
                }}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
});

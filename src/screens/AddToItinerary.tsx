import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import Typography from '../components/Typography';
import ButtonComp from '../components/ButtonComp';
import {itineraryDataStore} from '../utils/store';
import {Color} from '../utils/displayUtils';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from '../components/ListItem';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {observer} from 'mobx-react-lite';
import {ScreenHeader} from '../components/ScreenHeader';
import {Snack} from '../components/Snack';
import {loadLocationDetails} from '../utils/locationUtils';

export const AddToItinerary = observer(({route}) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(itineraryDataStore?.itineraries, '-----------');
  }, [itineraryDataStore?.itineraries]);

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: Color.beigeBg,
          padding: 16,
          height: '100%',
          width: '100%',
        }}>
        <ScreenHeader />

        <Typography
          variant="heading"
          text={'Add ' + route?.params?.name + ' to itinerary'}
        />
        <View style={{marginVertical: 8}}>
          {itineraryDataStore?.itineraries?.length > 0 ? (
            <View style={{marginVertical: 8, width: '100%', aspectRatio: 0.6}}>
              <FlatList
                data={itineraryDataStore?.itineraries}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <View style={{marginVertical: 8}}>
                    <ListItem
                      variant="trip"
                      data={item}
                      onPress={() => {
                        if (
                          item?.locations?.some(location => {
                            return location?.details?.name?.includes(
                              route?.params?.name,
                            );
                          })
                        ) {
                          Snack({
                            text:
                              route?.params?.name +
                              ' is already added to this itinerary',
                            variant: 'error',
                          });
                        } else {
                          console.log();

                          loadLocationDetails(route?.params?.id).then(dets => {
                            dets['visited'] = false;
                            itineraryDataStore?.addLocation(item?.id, dets);
                          });
                          Snack({
                            text:
                              route?.params?.name + ' added to ' + item?.name,
                            variant: 'success',
                            actionText: 'View',
                            actionFunction: () => {
                              navigation?.navigate('ItineraryDetails', {
                                itineraryId: item?.id,
                              });
                            },
                          });

                          setTimeout(() => {
                            AsyncStorage?.setItem(
                              'itineraries',
                              JSON.stringify(itineraryDataStore?.itineraries),
                            );
                            navigation?.goBack();
                          }, 1000);
                        }
                      }}
                    />
                  </View>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                marginVertical: 8,
                width: '100%',
                aspectRatio: 0.6,
              }}>
              <Typography text={'No trips created yet!'} />
            </View>
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 64,
            alignSelf: 'center',
          }}>
          {itineraryDataStore?.itineraries?.length > 0 ? (
            <ButtonComp
              text="Create another trip"
              color={Color.pinkPrimary}
              textColor="#190b14"
              width100={true}
              onPress={() => {
                navigation?.navigate('CreateItinerary');
              }}
            />
          ) : (
            <ButtonComp
              text="Create Now"
              color={Color.pinkPrimary}
              textColor="#190b14"
              onPress={() => {
                navigation?.navigate('CreateItinerary');
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
});

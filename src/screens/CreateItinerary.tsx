import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {FlatList, Pressable, SafeAreaView, TextInput, View} from 'react-native';
import {Color, loadLocationDetails} from '../Utils';
import ButtonComp from '../components/ButtonComp';
import {FlashList} from '@shopify/flash-list';
import {cities} from '../data';
import {Tag} from '../components/Tag';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {locationSearchMaps} from '../APIs';
import {ListItem} from '../components/ListItem';
import itineraryStore, {functionDataStore} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderKit from 'react-native-loader-kit';
import {Snack} from '../components/Snack';
import uuid from 'react-native-uuid';

export const CreateItinerary = observer(({route}) => {
  const navigation = useNavigation();
  const [name, setName] = useState(
    route?.params?.name ? route?.params?.name : '',
  );
  const [description, setDescription] = useState(
    route?.params?.description ? route?.params?.description : '',
  );
  const [locations, setLocations] = useState(
    route?.params?.locations ? route?.params?.locations : [],
  );
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = text => {
    setSearchText(text);
    locationSearchMaps(text)?.then(res => {
      setSearchResults(res?.places);
    });
  };

  return (
    <SafeAreaView>
      {functionDataStore?.functionData?.loaderVisible && (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}>
          <View
            style={{
              padding: 16,
              borderRadius: 24,
            }}>
            <LoaderKit
              style={{width: 48, height: 48}}
              name={'BallPulse'}
              color={Color?.pinkPrimary}
            />
          </View>
        </View>
      )}
      <View
        style={{
          backgroundColor: Color.beigeBg,
          padding: 16,
          height: '100%',
          width: '100%',
        }}>
        <TextInput
          style={{
            fontFamily: 'Ubuntu-Regular',
            color: Color?.black,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: Color?.gray900,
            padding: 16,
          }}
          autoFocus={route?.params?.name ? false : true}
          placeholder="Enter a Name for your trip"
          placeholderTextColor={Color?.gray900}
          maxLength={20}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={{
            fontFamily: 'Ubuntu-Regular',
            color: Color?.black,
            borderRadius: 12,
            borderWidth: 1,
            padding: 16,
            borderColor: Color?.gray900,
          }}
          placeholder="Enter a Description for your trip"
          placeholderTextColor={Color?.gray900}
          value={description}
          maxLength={60}
          onChangeText={setDescription}
        />
        {name?.length > 4 && description?.length > 9 && (
          <View style={{marginVertical: 8}}>
            <FlashList
              contentContainerStyle={{paddingRight: 16}}
              data={cities}
              estimatedItemSize={322}
              renderItem={({item}) => (
                <Tag
                  data={item}
                  onPress={() => {
                    loadLocationDetails(item?.mapsId).then(dets => {
                      dets['visited'] = false;
                      const x = locations?.find(location => {
                        return location?.details?.id === item?.mapsId;
                      });
                      if (x?.details?.id) {
                        Snack({
                          text: 'This destination has already been added!',
                          variant: 'error',
                        });
                      } else {
                        setLocations(prevLocations => [...prevLocations, dets]);
                      }
                    });
                  }}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              decelerationRate="fast"
            />
            <View style={{marginVertical: 8}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Color?.whiteBg,
                  borderRadius: 50,
                  paddingHorizontal: 12,
                  elevation: 2,
                  marginBottom: 16,
                }}>
                <FontAwesomeIcon icon={faSearch} size={20} color="#888" />
                <TextInput
                  style={{
                    flex: 1,
                    marginLeft: 8,
                    fontSize: 16,
                    fontFamily: 'Ubuntu-Regular',
                    padding: 16,
                  }}
                  placeholder="Search a city, location, or description"
                  placeholderTextColor={Color?.gray900}
                  value={searchText}
                  onChangeText={handleSearch}
                />
                {searchText !== '' && (
                  <Pressable
                    onPress={() => {
                      setSearchText('');
                      setSearchResults([]);
                    }}>
                    <FontAwesomeIcon icon={faXmark} size={20} color="#888" />
                  </Pressable>
                )}
              </View>
              <FlatList
                data={
                  searchResults?.length > 3
                    ? searchResults.slice(0, 2)
                    : searchResults
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <ListItem
                    data={item}
                    onPress={() => {
                      loadLocationDetails(item?.id, undefined).then(dets => {
                        dets['visited'] = false;
                        const x = locations?.find(location => {
                          return location?.details?.id === item?.id;
                        });
                        if (x?.details?.id) {
                          Snack({
                            text: 'This destination has already been added!',
                            variant: 'error',
                          });
                        } else {
                          setLocations(prevLocations => [
                            ...prevLocations,
                            dets,
                          ]);
                        }
                      });
                    }}
                  />
                )}
              />
            </View>

            <View
              style={{
                width: '100%',
                aspectRatio: searchResults?.length > 0 ? 0.9 : 0.8,
              }}>
              <FlatList
                contentContainerStyle={{}}
                data={locations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <ListItem
                    data={item}
                    variant="city"
                    onPress={() => {
                      // loadLocationDetails(item?.id, undefined, navigation);
                    }}
                    rightElement={<FontAwesomeIcon icon={faXmark} />}
                    onPressRight={() => {
                      const temp = locations?.filter(
                        locationitem =>
                          locationitem?.details?.id !== item?.details?.id,
                      );
                      setLocations([...temp]);
                    }}
                  />
                )}
              />
            </View>
          </View>
        )}
        {locations?.length > 1 &&
          name?.length > 4 &&
          description?.length > 9 && (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bottom: 16,
                alignSelf: 'center',
              }}>
              <ButtonComp
                text={route?.params?.id ? 'Save' : 'Finish'}
                color={Color.pinkPrimary}
                textColor="#190b14"
                width100={true}
                onPress={() => {
                  if (route?.params?.id) {
                    itineraryStore?.removeItinerary(route?.params?.id);

                    setTimeout(() => {
                      itineraryStore?.addItinerary({
                        id: route?.params?.id,
                        name: name,
                        description: description,
                        startDate: new Date('2024-08-01'),
                        endDate: new Date('2024-08-15'),
                        locations: locations,
                        createdBy: 'akshat',
                        collaborators: ['akshat'],
                        isPublic: true,
                      });
                      console.log(itineraryStore?.itineraries, 'after store');
                    }, 500);

                    setTimeout(() => {
                      console.log('before async');

                      AsyncStorage?.setItem(
                        'itineraries',
                        JSON.stringify(itineraryStore?.itineraries),
                      );
                      console.log('after async');

                      navigation?.goBack();
                    }, 1000);
                  } else {
                    const x = itineraryStore?.itineraries?.find(item => {
                      return item?.name === name;
                    });
                    if (x?.id) {
                      Snack({
                        text: 'Itinerary with this name already exists! Please create another.',
                        variant: 'error',
                      });
                    } else {
                      itineraryStore?.addItinerary({
                        id: uuid.v4(),
                        name: name,
                        description: description,
                        startDate: new Date('2024-08-01'),
                        endDate: new Date('2024-08-15'),
                        locations: locations,
                        createdBy: 'akshat',
                        collaborators: ['akshat'],
                        isPublic: true,
                      });
                      setTimeout(() => {
                        AsyncStorage?.setItem(
                          'itineraries',
                          JSON.stringify(itineraryStore?.itineraries),
                        );
                      }, 500);
                      navigation?.goBack();
                    }
                  }
                }}
              />
            </View>
          )}
      </View>
    </SafeAreaView>
  );
});

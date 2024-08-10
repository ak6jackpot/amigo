import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, SafeAreaView, TextInput, View} from 'react-native';
import {Color, loadLocationDetails} from '../Utils';
import Typography from '../components/Typography';
import ButtonComp from '../components/ButtonComp';
import {FlashList} from '@shopify/flash-list';
import {cities} from '../data';
import {Tag} from '../components/Tag';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons';
import {locationSearchMaps} from '../APIs';
import {ListItem} from '../components/ListItem';
import itineraryStore from '../storeDefinitions';

export const CreateItinerary = observer(({route}) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [locations, setLocations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = text => {
    setSearchText(text);
    locationSearchMaps(text)?.then(res => {
      setSearchResults(res?.places);
    });
  };

  useEffect(() => {
    console.log(locations, '-----');
  }, [locations]);

  return (
    <SafeAreaView>
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
            paddingHorizontal: 16,
            borderColor: Color?.gray900,
          }}
          autoFocus={true}
          placeholder="Enter a Name for your trip"
          placeholderTextColor={Color?.gray900}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={{
            fontFamily: 'Ubuntu-Regular',
            color: Color?.black,
            borderRadius: 12,
            borderWidth: 1,
            paddingHorizontal: 16,
            borderColor: Color?.gray900,
          }}
          placeholder="Enter a Description for your trip"
          placeholderTextColor={Color?.gray900}
          value={description}
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
                    loadLocationDetails(item?.mapsId, item?.tripAdvId).then(
                      dets => {
                        dets['visited'] = false;
                        const temp = locations;
                        temp?.push(dets);
                        setLocations(temp);
                      },
                    );
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
                  }}
                  placeholder="Search a city, location, or description"
                  value={searchText}
                  onChangeText={handleSearch}
                />
                {searchText !== '' && (
                  <Pressable onPress={() => setSearchText('')}>
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
                        const temp = locations;
                        temp?.push(dets);
                        setLocations(temp);
                      });
                    }}
                  />
                )}
              />
            </View>

            <View style={{width: '100%', aspectRatio: 1.69}}>
              <FlatList
                contentContainerStyle={{}}
                data={locations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <ListItem
                    data={item}
                    variant="city"
                    onPress={() => {
                      // navigation?.goBack();
                      // loadLocationDetails(item?.id, undefined, navigation);
                    }}
                    rightElement={<FontAwesomeIcon icon={faTrash} />}
                    onPressRight={() => {
                      const temp = locations?.filter(locationitem => {
                        locationitem?.details?.id !== item?.details?.id;
                      });
                      console.log(temp, 'onpress');
                      setLocations(temp);
                    }}
                  />
                )}
              />
            </View>
            {locations?.length > 1 && (
              <ButtonComp
                text="Create one from Scratch"
                color={Color.buttonPink}
                textColor="#190b14"
                shape="pill"
                onPress={() => {
                  // navigation?.navigate('CreateItinerary');
                  itineraryStore?.addItinerary({
                    id: name?.slice(0, 4) + description?.slice(0, 9),
                    name: name,
                    description: description,
                    startDate: new Date('2024-08-01'),
                    endDate: new Date('2024-08-15'),
                    locations: locations,
                    createdBy: 'akshat',
                    collaborators: ['akshat'],
                    isPublic: true,
                  });
                }}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
});

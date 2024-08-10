import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {FlatList, Pressable, SafeAreaView, TextInput, View} from 'react-native';
import {Color, loadLocationDetails} from '../Utils';
import Typography from '../components/Typography';
import ButtonComp from '../components/ButtonComp';
import {FlashList} from '@shopify/flash-list';
import {cities} from '../data';
import {Tag} from '../components/Tag';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {locationSearchMaps} from '../APIs';
import {ListItem} from '../components/ListItem';

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

  console.log(locations, '-----');

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
                  borderRadius: 8,
                  padding: 8,
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
                    variant="trip"
                    onPress={() => {
                      console.log(item);

                      // navigation?.goBack();
                      // loadLocationDetails(item?.id, undefined, navigation);
                    }}
                  />
                )}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
});

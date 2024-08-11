import React, {useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import Typography from '../components/Typography';
import {ListItem} from '../components/ListItem';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FlashList} from '@shopify/flash-list';
import {locationSearchMaps} from '../APIs';
import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {Color, loadLocationDetails} from '../Utils';
import {useNavigation} from '@react-navigation/native';

export const Search = ({route}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  const handleSearch = text => {
    setSearchText(text);
    locationSearchMaps(text)?.then(res => {
      setSearchResults(res?.places);
    });
  };

  return (
    <View
      style={{
        backgroundColor: Color.beigeBg,
        padding: 16,
        flex: 1,
      }}>
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
          autoFocus={true}
          onChangeText={handleSearch}
        />
        <Pressable
          onPress={() => {
            setSearchText('');
            setSearchResults([]);
          }}>
          <FontAwesomeIcon icon={faXmark} size={20} color="#888" />
        </Pressable>
      </View>
      <FlashList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={100}
        renderItem={({item}) => (
          <ListItem
            data={item}
            onPress={() => {
              navigation?.goBack();
              loadLocationDetails(item?.id, undefined, navigation);
            }}
          />
        )}
        ListEmptyComponent={
          searchText !== '' && <Typography text={'No results found'} />
        }
      />
    </View>
  );
};

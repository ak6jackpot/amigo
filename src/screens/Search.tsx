import React, {useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import Typography from '../components/Typography';
import {ListItem} from '../components/ListItem';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {FlashList} from '@shopify/flash-list';
import {locationSearchMaps} from '../utils/serviceAPIcalls';
import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {Color} from '../utils/displayUtils';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {loadLocationDetails} from '../utils/locationUtils';
import {TextField} from '../components/TextField';

export const Search = observer(({route}) => {
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
      <TextField
        onChangeText={handleSearch}
        value={searchText}
        autoFocus={true}
        placeholder="Search a city, location, or description"
        startInsetElement={
          <FontAwesomeIcon
            icon={faSearch}
            size={20}
            color="#888"
            style={{alignSelf: 'center'}}
          />
        }
        insetElement={
          <Pressable
            onPress={() => {
              setSearchText('');
              setSearchResults([]);
            }}>
            <FontAwesomeIcon icon={faXmark} size={20} color="#888" />
          </Pressable>
        }
      />
      <FlashList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={100}
        keyboardShouldPersistTaps={'always'}
        renderItem={({item}) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 78,
            }}>
            <ListItem
              data={item}
              onPress={() => {
                navigation?.goBack();
                loadLocationDetails(item?.id, navigation);
              }}
            />
          </View>
        )}
        ListEmptyComponent={
          searchText !== '' && <Typography text={'No results found'} />
        }
      />
    </View>
  );
});

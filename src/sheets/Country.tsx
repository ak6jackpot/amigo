import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Fuse from 'fuse.js';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import ActionSheet, {FlatList} from 'react-native-actions-sheet';
import {ListItem} from '../components/ListItem';
import {TextField} from '../components/TextField';
import Typography from '../components/Typography';
import {screenHeight} from '../utils/displayUtils';
export const countryList = [
  {title: '🇮🇳', value: '+91', name: 'India', maxLength: 10},
  {title: '🇺🇸', value: '+1', name: 'USA', maxLength: 10},
];

export const Country = props => {
  const sheetRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  return (
    <ActionSheet ref={sheetRef} gestureEnabled={false} closable={true}>
      <View style={{width: '100%', maxHeight: screenHeight / 3, padding: 16}}>
        <View
          style={{
            padding: 8,
          }}>
          <TextField
            placeholder="Search Country ..."
            onChangeText={search => {
              setSearchText(search);
            }}
            value={searchText}
            startInsetElement={
              <FontAwesomeIcon icon={faSearch} style={{alignSelf: 'center'}} />
            }
            label={''}
            helperText={''}
            variant={'label'}
          />
        </View>

        <FlatList
          data={
            searchText?.length != 0
              ? new Fuse(countryList, {
                  threshold: 0.3,
                  keys: ['name', 'value', 'title'],
                })
                  .search(searchText)
                  ?.map(x => x?.item)
              : countryList
          }
          renderItem={({item}) => (
            <ListItem
              variant="country"
              data={item}
              onPress={() => {
                props?.payload?.setCountry && props?.payload?.setCountry(item);
                sheetRef.current.hide();
              }}
            />
          )}
          ListEmptyComponent={
            <View style={{padding: 16}}>
              <Typography
                text="No country found"
                variant="heading"
                size="large"
              />
            </View>
          }
        />
      </View>
    </ActionSheet>
  );
};

import {FlashList} from '@shopify/flash-list';
import Fuse from 'fuse.js';
import React, {useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {ListItem} from '../components/ListItem';
import Typography from '../components/Typography';
import {hideMultipleSheets} from '../utils/SheetManagerSuper';
import {allSheetNames} from './sheets';
export const countryList = [
  {title: '🇮🇳', value: '+91', name: 'India', maxLength: 10},
  {title: '🇺🇸', value: '+1', name: 'USA', maxLength: 10},
];

export const Country = props => {
  const sheetRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  return (
    <ActionSheet ref={sheetRef} gestureEnabled={false} closable={true}>
      <View style={{width: '100%', height: '100%'}}>
        <View
          style={{
            padding: 8,
          }}>
          <TextInput
            placeholder="Search Country ..."
            onChangeText={searchText => {
              setSearchText(searchText);
            }}
            value={searchText}
          />
        </View>

        <FlashList
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
                props?.payload?.setCountry(item);
                hideMultipleSheets(allSheetNames);
              }}
            />
          )}
          estimatedItemSize={100}
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

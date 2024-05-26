import React from 'react';
import {ScrollView, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {API_key_Maps} from '../../secrets.json';
import Typography from '../components/Typography';

export const Search = ({route}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#FEF9F5',
        justifyContent: 'center',
        padding: 16,
      }}>
      <GooglePlacesAutocomplete
        placeholder="Type a place"
        query={{key: API_key_Maps, language: 'en'}}
        fetchDetails={true}
        onPress={(data, details) => console.log(data, details)}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        disableScroll={true}
        styles={{
          textInput: {color: '#000'},
          textInputContainer: {backgroundColor: '#f3f3f3'},
        }}
        listEmptyComponent={() => (
          <View style={{flex: 1}}>
            <Typography text={'No results were found'} />
          </View>
        )}
      />
    </ScrollView>
  );
};

import React, {useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {API_key_Maps} from '../../secrets.json';
import {screenHeight, screenWidth} from '../Utils';
import {userDataStore} from '../storeDefinitions';

export const Search = ({route}) => {
  const mapRef = useRef(null);
  const initialRegion = {
    latitude: userDataStore?.userData?.currentLocation
      ? userDataStore?.userData?.currentLocation?.latitude
      : 28.4624,
    longitude: userDataStore?.userData?.currentLocation
      ? userDataStore?.userData?.currentLocation?.longitude
      : -81.7932,
    latitudeDelta: 0.04,
    longitudeDelta: (0.04 * screenWidth) / screenHeight,
  };
  const [regionInput, setRegionInput] = useState(initialRegion);

  return (
    <View
      style={{
        backgroundColor: '#FEF9F5',
        padding: 16,
        flex: 1,
      }}>
      <View style={{zIndex: 1, flex: 0.5}}>
        <GooglePlacesAutocomplete
          placeholder="Type a place"
          query={{
            key: API_key_Maps,
            language: 'en',
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(data);
            console.log(details?.geometry?.location);
            setRegionInput({
              latitude: details?.geometry?.location?.lat,
              longitude: details?.geometry?.location?.lng,
              latitudeDelta: 0.08,
              longitudeDelta: (0.08 * screenWidth) / screenHeight,
            });
          }}
          keyboardShouldPersistTaps={'always'}
          keepResultsAfterBlur={true}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
          disableScroll={true}
          styles={{
            textInput: {color: 'black'},
            textInputContainer: {backgroundColor: '#f3f3f3'},
          }}
        />
      </View>
      <MapView
        provider={
          Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        ref={mapRef}
        style={{...StyleSheet.absoluteFillObject, zIndex: 0}}
        initialRegion={initialRegion}
        region={regionInput}>
        <Marker
          coordinate={{
            latitude: regionInput?.latitude,
            longitude: regionInput?.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {API_key_Maps} from '../../secrets.json';
import {screenHeight, screenWidth} from '../Utils';

export const Search = ({route}) => {
  const mapRef = useRef(null);
  const [regionInput, setRegionInput] = useState({
    latitude: 28.4624,
    longitude: -81.7932,
    latitudeDelta: 0.08,
    longitudeDelta: (0.08 * screenWidth) / screenHeight,
  });

  // async function moveToLocation(latiude, longitude) {
  //   console.log(latiude, longitude, 'inside moveToLocation');

  //   mapRef.current.animateToRegion(
  //     {
  //       latiude: latiude,
  //       longitude: longitude,
  //       latitudeDelta: 0.015,
  //       longitudeDelta: 0.01,
  //     },
  //     2000,
  //   );
  // }

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
            textInput: {color: '#000'},
            textInputContainer: {backgroundColor: '#f3f3f3'},
          }}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={{...StyleSheet.absoluteFillObject, zIndex: 0}}
        initialRegion={{
          latitude: 28.4624,
          longitude: -81.7932,
          latitudeDelta: 0.08,
          longitudeDelta: (0.08 * screenWidth) / screenHeight,
        }}
        region={regionInput}>
        <Marker
          coordinate={{
            latitude: 28.4624,
            longitude: -81.7932,
          }}
        />
      </MapView>
    </View>
  );
};

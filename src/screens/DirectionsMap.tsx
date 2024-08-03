import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {API_key_Maps} from '../../secrets.json';
import {Color, screenHeight, screenWidth} from '../Utils';
import {userDataStore} from '../storeDefinitions';

export const DirectionsMap = ({route}) => {
  const {destination} = route?.params;
  const mapRef = useRef(null);
  const mapViewDirectionsRef = useRef(null);
  const [userDeltaInit, setUserDeltaInit] = useState(0.04);
  const userLocation = {
    latitude: userDataStore?.userData?.currentLocation
      ? userDataStore?.userData?.currentLocation?.latitude
      : 28.4624,
    longitude: userDataStore?.userData?.currentLocation
      ? userDataStore?.userData?.currentLocation?.longitude
      : -81.7932,
    latitudeDelta: userDeltaInit,
    longitudeDelta: (userDeltaInit * screenWidth) / screenHeight,
  };

  console.log(destination, userLocation, 'in directions');

  const zoomIn = () => {
    const newDelta = userDeltaInit / 2;
    setUserDeltaInit(newDelta);
    mapRef.current.animateToRegion({
      ...userLocation,
      latitudeDelta: newDelta,
      longitudeDelta: (newDelta * screenWidth) / screenHeight,
    });
  };

  const zoomOut = () => {
    const newDelta = userDeltaInit * 2;
    setUserDeltaInit(newDelta);
    mapRef.current.animateToRegion({
      ...userLocation,
      latitudeDelta: newDelta,
      longitudeDelta: (newDelta * screenWidth) / screenHeight,
    });
  };

  return (
    <View
      style={{
        backgroundColor: Color.beigeBg,
        padding: 16,
        flex: 1,
      }}>
      <MapView
        provider={
          Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        ref={mapRef}
        style={{...StyleSheet.absoluteFillObject, zIndex: 0}}
        initialRegion={userLocation}>
        <Marker coordinate={userLocation} title="You" />
        <Marker coordinate={destination} />
        {userLocation?.latitude && destination?.latitude ? (
          <MapViewDirections
            ref={mapViewDirectionsRef}
            origin={userLocation}
            destination={destination}
            apikey={API_key_Maps}
            strokeColor="blue"
            strokeWidth={5}
            onError={error => {
              //@task -- show error in toast or snackbar that its too far
            }}
          />
        ) : null}
      </MapView>
      <View
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          flexDirection: 'row',
          backgroundColor: Color?.whiteBg,
          borderRadius: 1000,
          borderWidth: 1,
          borderColor: Color?.gray900,
        }}>
        <Pressable
          onPress={zoomIn}
          style={{
            borderRightWidth: 1,
            padding: 8,
            borderColor: Color?.gray900,
          }}>
          <FontAwesomeIcon icon={faPlus} size={24} />
        </Pressable>
        <Pressable
          onPress={zoomOut}
          style={{
            borderLeftWidth: 1,
            padding: 8,
            borderColor: Color?.gray900,
          }}>
          <FontAwesomeIcon icon={faMinus} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

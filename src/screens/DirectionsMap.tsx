import {faMinus, faPlus, faXmark} from '@fortawesome/free-solid-svg-icons';
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
import {useNavigation} from '@react-navigation/native';
import Typography from '../components/Typography';
import * as Animatable from 'react-native-animatable';

export const DirectionsMap = ({route}) => {
  const {destination} = route?.params;
  const mapRef = useRef(null);
  const mapViewDirectionsRef = useRef(null);
  const [userDeltaInit, setUserDeltaInit] = useState(0.04);
  const [error, setError] = useState(false);

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

  const navigation = useNavigation();
  // console.log(destination, userLocation, 'in directions');

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
      <View
        style={{
          position: 'absolute',
          left: 32,
          top: 64,
          zIndex: 2,
          flexDirection: 'row',
          maxHeight: 30,
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            navigation?.goBack();
          }}
          style={{
            padding: 8,
            borderColor: Color?.gray900,
            backgroundColor: Color?.whiteBg,
            borderRadius: 1000,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: 1,
          }}>
          <FontAwesomeIcon icon={faXmark} size={24} />
        </Pressable>
        {error && (
          <Animatable.Text
            animation="fadeIn"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 32,
            }}>
            <View
              style={{
                padding: 8,
                borderRadius: 500,
                zIndex: 4,
                backgroundColor: Color?.red,
              }}>
              <Typography
                text={'Location is too far to navigate!'}
                color={Color?.whiteBg}
              />
            </View>
          </Animatable.Text>
        )}
      </View>

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
              setError(true);

              setTimeout(() => {
                setError(false);
              }, 2500);
              setTimeout(() => {
                navigation?.goBack();
              }, 3000);
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

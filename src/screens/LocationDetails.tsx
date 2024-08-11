import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Typography from '../components/Typography';
import {FlashList} from '@shopify/flash-list';
import {Color, screenHeight, screenWidth} from '../Utils';
import {Translator} from '../components/Translator';
import {fetchDescriptionOpenAI} from '../APIs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDiamondTurnRight} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

export const LocationDetails = ({route}) => {
  const {details, nearbyLocationDetails} = route?.params;

  const [photos, setPhotos] = useState(details?.photos);
  const [formattedAddress, setFormattedAddress] = useState(
    details?.formattedAddress,
  );
  const [latitude, setLatitude] = useState(details?.latitude);
  const [longitude, setLongitude] = useState(details?.longitude);
  const [description, setDescription] = useState(details?.description);
  const navigation = useNavigation();
  // console.log(
  //   JSON.stringify({
  //     details: {...details, description: description},
  //     visited: false,
  //   }),
  //   'details in locationdetails',
  // );
  // console.log(nearbyLocationDetails, 'nearby in locationdetails');

  useEffect(() => {
    if (!details?.description) {
      fetchDescriptionOpenAI(details?.formattedAddress)?.then(response => {
        // console.log(response);
        setDescription(response);
      });
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: Color.beigeBg,
          }}>
          <FlashList
            contentContainerStyle={{padding: 8}}
            data={photos}
            estimatedItemSize={322}
            renderItem={({item}) => (
              <View
                style={{
                  marginRight: 8,
                  padding: 4,
                  borderRadius: 14,
                  overflow: 'hidden',
                  backgroundColor: Color?.whiteBg,
                  shadowColor: Color?.black,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                  elevation: 10,
                }}>
                <FastImage
                  style={{
                    width: screenWidth * 0.8,
                    aspectRatio: 1.5,
                    borderRadius: 10,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{uri: item}}
                />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
          />
        </View>
        <View
          style={{
            backgroundColor: Color.beigeBg,
            padding: 16,
          }}>
          <Typography
            text={formattedAddress}
            variant="heading"
            textStyles={{marginVertical: 8}}
          />
          <Typography text={latitude + ',' + longitude} color="#888" />
          <Typography
            size="medium"
            text={description}
            textStyles={{marginVertical: 8}}
          />
          <View
            style={{
              position: 'absolute',
              padding: 16,
              bottom: 1,
              right: 1,
              width: '50%',
              alignItems: 'flex-end',
              flexDirection: 'row',
            }}>
            <Pressable
              onPress={() => {
                // console.log(item?.location);
                navigation?.navigate('DirectionsMap', {
                  destination: {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: (0.04 * screenWidth) / screenHeight,
                  },
                });
              }}
              style={({pressed}) => [
                {
                  height: 60,
                  aspectRatio: 1,
                  backgroundColor: Color?.pinkPrimary,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 16,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}>
              <FontAwesomeIcon icon={faDiamondTurnRight} size={'100%'} />
            </Pressable>
            <Translator place={formattedAddress} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

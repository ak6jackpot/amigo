import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Typography from '../components/Typography';
import {FlashList} from '@shopify/flash-list';
import {
  Color,
  generatePhotoUrl,
  loadLocationDetails,
  screenHeight,
  screenWidth,
} from '../Utils';
import {Translator} from '../components/Translator';
import {fetchDescriptionOpenAI} from '../APIs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDiamondTurnRight} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {Header} from '../components/Header';

export const LocationDetails = observer(({route}) => {
  const {details, nearbyLocationDetails} = route?.params;

  const [photos, setPhotos] = useState(details?.photos);
  const [name, setName] = useState(details?.name);
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
  console.log(
    nearbyLocationDetails[0]?.displayName,
    'nearby in locationdetails',
  );

  useEffect(() => {
    if (!details?.description) {
      fetchDescriptionOpenAI(details?.name)?.then(response => {
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
          <View
            style={{
              backgroundColor: Color.beigeBg,
              padding: 16,
              paddingBottom: 0,
            }}>
            <Header />
          </View>

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
            text={name}
            variant="heading"
            textStyles={{marginVertical: 8}}
          />
          <Typography text={latitude + ',' + longitude} color="#888" />
          <Typography
            size="medium"
            text={description}
            textStyles={{marginVertical: 8}}
          />
          {description && (
            <>
              <Typography
                text={'Things to do'}
                variant="heading"
                size="small"
              />
              <View style={{height: 200}}>
                <FlashList
                  contentContainerStyle={{}}
                  data={nearbyLocationDetails}
                  estimatedItemSize={36}
                  renderItem={({item, index}) => (
                    <Pressable
                      style={{
                        flexDirection: 'row',
                        marginVertical: 8,
                        borderWidth: 2,
                        borderColor: Color?.graySend,
                        borderRadius: 18,
                        padding: 8,
                        width: screenWidth * 0.8,
                        backgroundColor: Color?.grayTag,
                        marginRight: 8,
                      }}
                      onPress={() => {
                        loadLocationDetails(item?.id, navigation);
                      }}>
                      <View style={{flex: 1}}>
                        <FastImage
                          style={{
                            height: 64,
                            aspectRatio: 1,
                            borderRadius: 6,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                          source={{
                            uri: generatePhotoUrl(
                              item?.photos[0]?.name?.split('/')?.slice(-1),
                            ),
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          paddingHorizontal: 4,
                          flexDirection: 'column',
                          justifyContent: 'space-evenly',
                          alignItems: 'flex-start',
                        }}>
                        <Typography
                          text={
                            item?.displayName?.text?.length > 20
                              ? item?.displayName?.text?.slice(0, 20) + '...'
                              : item?.displayName?.text
                          }
                          variant="heading"
                          size="small"
                          textStyles={{fontSize: 10}}
                        />
                        <Typography text={'Explore →'} />
                      </View>
                    </Pressable>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  snapToAlignment="start"
                  decelerationRate="fast"
                />
              </View>
            </>
          )}
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
            <Translator place={name} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

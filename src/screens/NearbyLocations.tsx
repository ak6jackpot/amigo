import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Typography from '../components/Typography';
import {FlashList} from '@shopify/flash-list';
import {Color, screenHeight, screenWidth} from '../utils/displayUtils';
import FastImage from 'react-native-fast-image';
import ButtonComp from '../components/ButtonComp';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {ScreenHeader} from '../components/ScreenHeader';
import {loadLocationDetails} from '../utils/locationUtils';

export const NearbyLocations = observer(({route}) => {
  const {nearbyList} = route?.params;

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: Color.beigeBg,
          padding: 16,
        }}>
        <ScreenHeader />

        <Typography
          variant="heading"
          text={'Check out amazing locations around you!'}
        />
        <View style={{height: screenHeight}}>
          <FlashList
            data={nearbyList}
            keyExtractor={(item, index) => index.toString()}
            estimatedItemSize={100}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                  justifyContent: 'space-evenly',
                  marginVertical: 8,
                  borderWidth: 2,
                  borderBottomWidth: 5,
                  borderColor: Color?.graySend,
                  borderRadius: 18,
                  padding: 8,
                  backgroundColor: Color?.grayTag,
                }}>
                <View style={{flex: 1}}>
                  <FastImage
                    style={{
                      width: '100%',
                      aspectRatio: 1,
                      borderRadius: 12,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: item?.details?.photos[0],
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                    flexDirection: 'column',
                  }}>
                  <Typography
                    text={item?.details?.name}
                    variant="label"
                    textAlign="center"
                    size="medium"
                  />
                  <View style={{flexDirection: 'row', marginTop: 8}}>
                    <ButtonComp
                      text="Directions"
                      color={Color?.pinkPrimary}
                      textColor="#190b14"
                      size="small"
                      onPress={() => {
                        // console.log(item?.location);
                        navigation?.navigate('DirectionsMap', {
                          destination: {
                            latitude: item?.details?.latitude,
                            longitude: item?.details?.longitude,
                            latitudeDelta: 0.04,
                            longitudeDelta: (0.04 * screenWidth) / screenHeight,
                          },
                        });
                      }}
                      styles={{flex: 1, margin: 1, padding: 6}}
                    />
                    <ButtonComp
                      text="View Details"
                      color={Color?.pinkPrimary}
                      textColor="#190b14"
                      size="small"
                      onPress={() => {
                        loadLocationDetails(item?.details?.id, navigation);
                      }}
                      styles={{flex: 1, margin: 1, padding: 6}}
                    />
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={<Typography text={'No results found'} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
});

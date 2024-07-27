import React from 'react';
import {View} from 'react-native';
import Typography from '../components/Typography';
import {FlashList} from '@shopify/flash-list';
import {Color, generatePhotoUrl, loadLocationDetails} from '../Utils';
import FastImage from 'react-native-fast-image';
import ButtonComp from '../components/ButtonComp';
import {useNavigation} from '@react-navigation/native';

export const NearbyLocations = ({route}) => {
  const {nearbyList} = route?.params;

  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: Color.beigeBg,
        padding: 16,
        flex: 1,
      }}>
      <Typography
        variant="heading"
        text={'Check out amazing locations around you!'}
      />
      <FlashList
        data={nearbyList}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={100}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 16,
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
                  uri: generatePhotoUrl(
                    item?.photos[0]?.name?.split('/')?.slice(-1),
                  ),
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
                flexDirection: 'column',
              }}>
              <Typography
                text={item?.displayName?.text}
                variant="label"
                textAlign="center"
                size="medium"
              />
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <ButtonComp
                  text="Directions"
                  color={Color?.pinkPrimary}
                  textColor="#190b14"
                  shape="pill"
                  size="medium"
                  onPress={() => {}}
                  styles={{flex: 1, margin: 1}}
                />
                <ButtonComp
                  text="View Details"
                  color={Color?.pinkPrimary}
                  textColor="#190b14"
                  shape="pill"
                  size="medium"
                  onPress={() => {
                    loadLocationDetails(item?.id, undefined, navigation);
                  }}
                  styles={{flex: 1, margin: 1}}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Typography text={'No results found'} />}
      />
    </View>
  );
};

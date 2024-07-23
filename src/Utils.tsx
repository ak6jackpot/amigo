import {Dimensions} from 'react-native';
import {
  locationDetailsMaps,
  locationDetailsTA,
  nearbyLocationSearchMaps,
} from './APIs';
import {API_key_Maps} from '../secrets.json';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const loadLocationDetails = (
  mapsId: string,
  tripAdvId: string,
  navigation?: any,
) => {
  locationDetailsMaps(mapsId)?.then(searchResponse => {
    console.log(searchResponse, '---maps----');
    nearbyLocationSearchMaps(
      searchResponse?.latitude,
      searchResponse?.longitude,
      'restaurant',
      2,
    ).then(nearbyResponse => {
      console.log(nearbyResponse, 'nearbyResponse');
    });
  });

  locationDetailsTA(tripAdvId)?.then(detailsResponse => {
    console.log(detailsResponse, '---tripadvisor---');
  });

  navigation?.navigate('LocationDetails', {
    photos: [],
    details: {},
  });
};

export const generatePhotoUrl = (photoReference: any) => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/photo';
  const maxwidth = 400; // You can adjust the max width or height as needed
  return `${baseUrl}?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${API_key_Maps}`;
};

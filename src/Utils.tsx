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
  mapsId?: string,
  tripAdvId?: string,
  navigation?: any,
) => {
  Promise.all([
    mapsId && locationDetailsMaps(mapsId),
    tripAdvId && locationDetailsTA(tripAdvId),
  ])
    .then(([searchResponse, detailsResponse]) => {
      // console.log(searchResponse, '---maps----');
      if (searchResponse) {
        nearbyLocationSearchMaps(
          searchResponse.latitude,
          searchResponse.longitude,
        ).then(nearbyResponse => {
          // console.log(nearbyResponse, 'nearbyResponse');
          navigation?.navigate('LocationDetails', {
            details: {
              ...searchResponse,
              description: detailsResponse?.description,
            },
            nearbyLocationDetails: nearbyResponse,
          });
        });
      }
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
};

export const generatePhotoUrl = (photoReference: any) => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/photo';
  const maxwidth = 400; // You can adjust the max width or height as needed
  return `${baseUrl}?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${API_key_Maps}`;
};

export const Color = {
  whiteBg: '#fff',
  grayTag: '#EBEBEB',
  gray900: '#999',
  graySend: '#ddd',
  greenSearch: '#E2F4A6',
  pinkPrimary: '#f7c6ef',
  pinkSecodary: 'pink',
  black: '#000',
  incomingMessage: '#e6e6e6',
  outgoingMessage: '#dcf8c6',
  beigeBg: '#FEF9F5',
};

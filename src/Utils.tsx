import {Dimensions} from 'react-native';
import {
  locationDetailsMaps,
  locationDetailsTA,
  nearbyLocationSearchMaps,
} from './APIs';
import {API_key_Maps} from '../secrets.json';
import {functionDataStore} from './storeDefinitions';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const loadLocationDetails = (
  mapsId?: string,
  tripAdvId?: string,
  navigation?: any,
): Promise<any> => {
  functionDataStore?.showLoader();
  return Promise.all([
    mapsId && locationDetailsMaps(mapsId),
    tripAdvId && locationDetailsTA(tripAdvId),
  ])
    .then(([searchResponse, detailsResponse]) => {
      // console.log(searchResponse, '----1-----');

      if (searchResponse) {
        return nearbyLocationSearchMaps(
          searchResponse.latitude,
          searchResponse.longitude,
        ).then(nearbyResponse => {
          const result = {
            details: {
              ...searchResponse,
              description: detailsResponse?.description,
            },
            nearbyLocationDetails: nearbyResponse,
          };

          navigation &&
            navigation?.navigate('LocationDetails', {
              details: result.details,
              nearbyLocationDetails: result.nearbyLocationDetails,
            });

          // console.log(result, '-----2-----');

          functionDataStore?.hideLoader();
          return result;
        });
      } else {
        functionDataStore?.hideLoader();
        return null;
      }
    })
    .catch(error => {
      console.error('An error occurred:', error);
      functionDataStore?.hideLoader();
      throw error;
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
  buttonPink: '#EEA0FF',
  red: '#e85046',
};

import {Dimensions} from 'react-native';
import {API_key_Maps} from '../../secrets.json';
import {locationDetailsMaps, nearbyLocationSearchMaps} from './serviceAPIcalls';
import {functionDataStore} from './store';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const loadLocationDetails = (
  mapsId?: string,
  navigation?: any,
  modal?: boolean,
): Promise<any> => {
  functionDataStore?.showLoader();
  return locationDetailsMaps(mapsId)
    .then(searchResponse => {
      // console.log(searchResponse, '----1-----');

      if (searchResponse) {
        return nearbyLocationSearchMaps(
          searchResponse.latitude,
          searchResponse.longitude,
        ).then(nearbyResponse => {
          const result = {
            details: {
              ...searchResponse,
              description: null,
            },
            nearbyLocationDetails: nearbyResponse,
          };

          if (navigation) {
            modal
              ? navigation?.navigate('LocationDetailsModal', {
                  details: result.details,
                  nearbyLocationDetails: result.nearbyLocationDetails,
                })
              : navigation?.navigate('LocationDetails', {
                  details: result.details,
                  nearbyLocationDetails: result.nearbyLocationDetails,
                });
          }

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

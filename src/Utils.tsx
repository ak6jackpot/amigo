import {Dimensions} from 'react-native';
import {locationDetailsMaps, nearbyLocationSearchMaps} from './APIs';
import {API_key_Maps} from '../secrets.json';
import {functionDataStore} from './storeDefinitions';

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

export const Color = {
  whiteBg: '#fff',
  grayTag: '#EBEBEB',
  gray900: '#999',
  graySend: '#ddd',
  greenSearch: '#E2F4A6',
  pinkPrimary: '#edc6ff',
  pinkSecodary: '#f7c6ef',
  black: '#000',
  incomingMessage: '#e6e6e6',
  outgoingMessage: '#dcf8c6',
  beigeBg: '#FEF9F5',
  buttonPink: '#EEA0FF',
  red: '#e85046',
};

export const randomColorGenerator = () => {
  const colors = [
    '#feeff9',
    '#f9f1ff',
    '#eff4fe',
    '#e2f8fb',
    '#eaf6ed',
    '#fdf2dc',
    '#fff1e1',
    '#fff0e9',
    '#fff0ee',
    '#f3f3f3',
    '#f9e8e4 ',
    '#f3e7f5',
    '#f4f9f4',
    '#fff9e8',
    '#fef6f0',
    '#f0f7fc',
    '#f7f8f2',
    '#e7f7f3',
    '#f5f0f7',
  ];

  return colors[
    Math.floor(Math.random() * colors?.length + 1) % colors?.length
  ];
};

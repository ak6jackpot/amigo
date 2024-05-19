import axios from 'axios';
import {API_key_TA} from '../secrets.json';

export const locationSearchTA = async (searchQuery: string) => {
  return await axios
    .get(
      `https://api.content.tripadvisor.com/api/v1/location/search?language=en&key=${API_key_TA}&searchQuery=${searchQuery}`,
    )
    .then(response => {
      // console.log(response?.data?.data, '// location search API');
      return response?.data?.data;
    })
    .catch(error => {
      console.log(error?.response?.data);
    });
};

export const locationPhotosTA = async (locationId: string) => {
  return await axios
    .get(
      `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=${API_key_TA}&language=en`,
    )
    .then(response => {
      // console.log(response?.data?.data, '// location photos API');
      const temp: [] = [];
      response?.data?.data?.map(item => {
        temp?.push(item?.images?.large?.url);
      });
      return temp;
    })
    .catch(error => {
      console.log(error?.response?.data);
    });
};

export const locationDetailsTA = async (locationId: string) => {
  return await axios
    .get(
      `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${API_key_TA}&language=en`,
    )
    .then(response => {
      // console.log(response?.data, '// location details API');

      return {
        description: response?.data?.description,
        latitude: response?.data?.latitude,
        longitude: response?.data?.longitude,
        webUrl: response?.data?.web_url,
      };
    })
    .catch(error => {
      console.log(error?.response?.data);
    });
};

export const locationReviewsTA = async (locationId: string) => {
  return await axios
    .get(
      `https://api.content.tripadvisor.com/api/v1/location/${locationId}/reviews?key=${API_key_TA}&language=en`,
    )
    .then(response => {
      // console.log(response?.data?.data, '// location review API');
    })
    .catch(error => {
      console.log(error?.response?.data);
    });
};

export const nearbyLocationSearchTA = async (
  latitude: string,
  longitude: string,
) => {
  return await axios
    .get(
      `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${latitude}%2C${longitude}&key=${API_key_TA}&language=en`,
    )
    .then(response => {
      // console.log(response?.data?.data, '// nearby location search API');

      return response?.data?.data;
    })
    .catch(error => {
      console.log(error?.response?.data);
    });
};

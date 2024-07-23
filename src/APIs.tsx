import axios from 'axios';
import {API_key_TA} from '../secrets.json';
import {API_key_Maps} from '../secrets.json';
import {API_key_OpenAI} from '../secrets.json';
import {generatePhotoUrl} from './Utils';

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

export const locationSearchMaps = async (searchQuery: string) => {
  return await axios
    .post(
      'https://places.googleapis.com/v1/places:searchText',
      {
        textQuery: searchQuery,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_key_Maps,
          'X-Goog-FieldMask':
            'places.displayName,places.id,places.location,places.googleMapsUri,places.utcOffsetMinutes,places.photos,',
        },
      },
    )
    .then(response => {
      // console.log(response?.data, '// location search API');
      return response?.data;
    })
    .catch(error => {
      console.log(error?.response?.data);
    });
};

export const locationDetailsMaps = async (locationId: string) => {
  return await axios
    .get(`https://places.googleapis.com/v1/places/${locationId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': `${API_key_Maps}`,
        'X-Goog-FieldMask':
          'displayName,id,location,googleMapsUri,utcOffsetMinutes,photos,formattedAddress',
      },
    })
    .then(response => {
      // console.log(response?.data, '// location details API');

      const temp = [];
      response?.data?.photos?.map(item => {
        temp?.push(generatePhotoUrl(item?.name?.split('/')?.slice(-1)));
      });
      return {
        photos: temp,
        latitude: response?.data?.location?.latitude,
        longitude: response?.data?.location?.longitude,
        webUrl: response?.data?.googleMapsUri,
        formattedAddress: response?.data?.formattedAddress,
      };
    })
    .catch(error => {
      console.log(error?.response?.data?.error?.details[0]?.fieldViolations);
    });
};

export const nearbyLocationSearchMaps = async (
  latitude: string,
  longitude: string,
  includedType?: string,
  maxCount?: number,
) => {
  console.log({
    includedTypes: includedType ? [includedType] : [],
    maxResultCount: maxCount ? maxCount : 3,
    locationRestriction: {
      circle: {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        radius: 500.0,
      },
    },
  });

  return await axios
    .post(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        includedTypes: includedType ? [includedType] : [],
        maxResultCount: maxCount ? maxCount : 3,
        locationRestriction: {
          circle: {
            center: {
              latitude: latitude,
              longitude: longitude,
            },
            radius: 500.0,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_key_Maps,
          'X-Goog-FieldMask':
            'places.id,places.formattedAddress,places.location,places.rating,places.googleMapsUri,places.photos,places.generativeSummary,places.displayName',
        },
      },
    )
    .then(response => {
      console.log(response?.data, '// nearby location search API');

      return response?.data?.places;
    })
    .catch(error => {
      console.log(error?.response?.data);
    });
};

export const autocompleteSearchMaps = async (
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

export const fetchTranslationOpenAI = async (
  phrase: string,
  location: string,
) => {
  return await axios
    .post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Translate '${phrase}' for someone visiting ${location}.The translation should be in ${location}'s primary language but Make it readable and speakable for english speakers. Provide the translation and its pronunciation in english as your response in the format of a JSON string - {"translation": "abc", "pronunciation": "def"} `,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_key_OpenAI}`,
        },
      },
    )
    .then(response => {
      console.log(response?.data?.choices[0]?.message, '// translation API');

      return JSON?.parse(response?.data?.choices[0]?.message?.content);
    })
    .catch(error => {
      console.log(error?.response?.data);
    });
};

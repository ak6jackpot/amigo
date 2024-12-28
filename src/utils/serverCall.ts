import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {APIBaseConfig, APIEndpointsType} from '../data/APIDefinitions';
import {SheetManagerSuper} from './SheetManagerSuper';
import {idDataStore} from './store';

const BASE_URL = '';

interface ApiResponse<T> {
  status: number;
  data: T;
}

async function serverCall<T>(
  apiName: APIEndpointsType,
  data: Record<string, any> = {},
  retry: number = 2,
  header?: object,
): Promise<ApiResponse<T>> {
  const apiDetails = APIBaseConfig[apiName];

  const headers = {
    Authorization: 'AUTH_TOKEN',
    'app-origin': 'superpe',
    'Content-Type': 'application/json',
    'session-id': idDataStore?.idData?.sessionId || 'RANDOM_ID',
    'merchant-id': idDataStore?.idData?.merchantId || 'RANDOM_ID',
    ...header,
  };

  if (!apiDetails) {
    throw new Error(`API configuration not found for ${apiName}`);
  }

  const {endpoint, method} = apiDetails;
  const url = `${endpoint?.includes('https://') ? '' : BASE_URL}${replaceParams(
    endpoint,
    data,
    method,
  )}`;

  const requestOptions: AxiosRequestConfig = {
    method,
    url,
    headers: headers,
    data: method !== 'GET' ? data : undefined,
  };
  // console.log(requestOptions, '-----request options 🍄🍄🍄----');

  try {
    const response: AxiosResponse<T> = await axios(requestOptions);

    const result: ApiResponse<T> = {
      status: response?.status,
      data: response?.data,
    };
    // console.log(requestOptions, result, '--- ✅✅ //SUCCESS API// ✅✅ ---');

    const lastApiCallTime = Date.now();
    idDataStore?.setIDData({lastApiCallTime});

    return result;
  } catch (error) {
    console.error(
      `API request error[${url}]:`,
      JSON.stringify(error?.response),
    );
    // console.log(requestOptions, '--- 💥💥 //ERROR API// 💥💥 ---');
    error?.code == 'ERR_NETWORK' &&
      (() => {
        fetch('https://www.google.com').catch(error => {
          SheetManagerSuper('NoInternet');
        });
      })();

    if (error?.response?.status == 401 && !idDataStore?.idData?.sessionId) {
      SheetManagerSuper('Logout');
    } else if (
      (error?.response?.status == 500 || error?.response?.status == 502) &&
      retry > 0
    ) {
      console.log('--------retrying---------', apiName);
      serverCall(apiName, data, retry - 1);
    }

    throw error;
  }
}

function replaceParams(
  endpoint: string,
  params: Record<string, any>,
  method: string,
): string {
  Object.entries(params).forEach(([key, value]) => {
    const placeholder = `<${key}>`;
    const encodedValue = encodeURIComponent(value);
    endpoint = endpoint?.split(placeholder).join(encodedValue);
  });

  if (method === 'GET') {
    const queryParams = new URLSearchParams(params).toString();
    if (queryParams) {
      endpoint += `?${queryParams}`;
    }
  }

  return endpoint;
}

export default serverCall;

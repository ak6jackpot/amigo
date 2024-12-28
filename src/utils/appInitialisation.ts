import {SheetManagerSuper} from './SheetManagerSuper';
import serverCall from './serverCall';
import {idDataStore} from './store';

export const appInitialisation = async (navigation: any) => {
  console.log('------- came inside appInitialisation');

  const getUserDetails = async () => {
    return true;
  };

  const getUserItineraries = async () => {
    return true;
  };

  const postDataInit = async () => {
    Promise.all([getUserItineraries()]).catch(err => console.log(err));
  };

  return serverCall('checkSession', {
    sessionId: idDataStore?.idData?.sessionId,
  })
    .then(resp => {
      console.log(resp?.data);
      if (resp?.data) {
        return Promise.allSettled([getUserDetails()])
          .then(async response => {
            console.log('------- exiting FetchInitialData');
            if (response?.reduce((a, b) => a && b?.value, true)) {
              postDataInit();
              return true;
            } else {
              return false;
            }
          })
          .catch(err => {
            console.log(err);
            return false;
          });
      } else {
        SheetManagerSuper('Logout');
        return true;
      }
    })
    .catch(err => {
      console.log('//from fetch init check session block', err);
      return true;
    });
};

export const systemInit = async () => {
  console.log('initialising system');
};

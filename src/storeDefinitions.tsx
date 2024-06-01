import {makeAutoObservable} from 'mobx';

interface TripsData {
  upcoming?: [];
}

class TripsDataStore {
  tripsData: TripsData = {
    upcoming: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  setTripsData(value: object) {
    this.tripsData = {
      ...this.tripsData,
      ...value,
    };
  }

  reset() {
    Object.entries(this.tripsData).forEach(([key, value]) => {
      switch (typeof value) {
        case 'string':
          this.tripsData[key as keyof TripsData] = '';
          break;
        case 'number':
          this.tripsData[key as keyof TripsData] = 0;
          break;
        case 'boolean':
          this.tripsData[key as keyof TripsData] = false;
          break;
        case 'object':
          if (Array.isArray(value)) {
            this.tripsData[key as keyof TripsData] = [];
          } else {
            this.tripsData[key as keyof TripsData] = {};
          }
          break;
        default:
          this.tripsData[key as keyof TripsData] = '';
      }
    });
  }
}

export const tripsDataStore = new TripsDataStore();

interface UserData {
  currentLocation?: {};
}

class UserDataStore {
  userData: UserData = {
    currentLocation: {},
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUserData(value: object) {
    this.userData = {
      ...this.userData,
      ...value,
    };
  }

  reset() {
    Object.entries(this.userData).forEach(([key, value]) => {
      switch (typeof value) {
        case 'string':
          this.userData[key as keyof UserData] = '';
          break;
        case 'number':
          this.userData[key as keyof UserData] = 0;
          break;
        case 'boolean':
          this.userData[key as keyof UserData] = false;
          break;
        case 'object':
          if (Array.isArray(value)) {
            this.userData[key as keyof UserData] = [];
          } else {
            this.userData[key as keyof UserData] = {};
          }
          break;
        default:
          this.userData[key as keyof UserData] = '';
      }
    });
  }
}

export const userDataStore = new UserDataStore();

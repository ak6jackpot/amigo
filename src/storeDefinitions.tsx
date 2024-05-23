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

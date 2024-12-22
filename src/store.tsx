import {makeAutoObservable} from 'mobx';

interface Itinerary {
  id: any;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  locations: object[];
  createdBy: string;
  collaborators?: string[];
  isPublic?: boolean;
}

class ItineraryStore {
  itineraries: Itinerary[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItinerary(itinerary: Itinerary) {
    this.itineraries.push(itinerary);
  }

  removeItinerary(id: string) {
    this.itineraries = this.itineraries.filter(
      itinerary => itinerary.id !== id,
    );
  }

  updateItinerary(updatedItinerary: Itinerary) {
    const index = this.itineraries.findIndex(
      itinerary => itinerary.id === updatedItinerary.id,
    );
    if (index !== -1) {
      this.itineraries[index] = updatedItinerary;
    }
  }

  addLocation(itineraryId: string, location: object) {
    const itinerary = this.itineraries.find(item => item.id === itineraryId);
    if (itinerary) {
      itinerary.locations.push(location);
    }
  }

  removeLocation(itineraryId: string, locationId: string) {
    const itinerary = this.itineraries.find(item => item.id === itineraryId);
    if (itinerary) {
      itinerary.locations = itinerary.locations.filter(
        location => location.details.id !== locationId,
      );
    }
  }

  reorderLocations(itineraryId: string, startIndex: number, endIndex: number) {
    const itinerary = this.itineraries.find(item => item.id === itineraryId);
    if (itinerary) {
      const [movedLocation] = itinerary.locations.splice(startIndex, 1);
      itinerary.locations.splice(endIndex, 0, movedLocation);
    }
  }
  toggleLocationVisited(itineraryId: string, locationId: string) {
    const itinerary = this.itineraries.find(item => item.id === itineraryId);
    if (itinerary) {
      const location = itinerary.locations.find(
        item => item.details.id === locationId,
      );
      if (location) {
        if (location.visited) {
          location.visited = false;
        } else {
          location.visited = true;
        }
      }
    }
  }
}

const itineraryStore = new ItineraryStore();
export default itineraryStore;

interface UserData {
  currentLocation?: object;
  name: string;
  phone: string;
  email: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  countryCode: string;
  currency: string;
  preferences: {
    destinationType: string;
    numberOfTravellers: number;
    tripDuration: number;
    keyActivities: string[];
    budget: number;
  };
}

class UserDataStore {
  initialUserData: UserData = {
    currentLocation: {},
    name: 'Akshat',
    phone: '9902635821',
    email: 'akshatsingh8140@gmail.com',
    address: {
      addressLine1: '24282, Building 2 Tower 4',
      addressLine2: 'Prestige Falcon City',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560062',
    },
    currency: 'INR',
    countryCode: '+91',
    preferences: {
      destinationType: 'Mountain',
      numberOfTravellers: 2,
      tripDuration: 6,
      keyActivities: ['Sky Diving', 'Scuba Diving'],
      budget: 100000,
    },
  };
  userData: UserData = this?.initialUserData;

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
    this.userData = {...this.initialUserData};
  }
}

export const userDataStore = new UserDataStore();

interface Function {
  loaderVisible?: boolean;
  snackData: any;
}

class FunctionStore {
  initialFunctionData: Function = {
    loaderVisible: false,
    snackData: {},
  };
  functionData: Function = this?.initialFunctionData;

  constructor() {
    makeAutoObservable(this);
  }

  setFunctionData(value: object) {
    this.functionData = {
      ...this.functionData,
      ...value,
    };
  }

  setLoaderVisible(visible: boolean) {
    this.setFunctionData({loaderVisible: visible});
  }

  showLoader() {
    this.setLoaderVisible(true);
  }

  hideLoader() {
    this.setLoaderVisible(false);
  }

  clearSnack() {
    this.functionData.snackData = {};
  }
  showSnack(data: {}) {
    this.functionData.snackData = {...this.functionData.snackData, ...data};
    setTimeout(() => {
      this.clearSnack();
    }, data?.duration);
  }
  reset() {
    this.functionData = {...this.initialFunctionData};
  }
}

export const functionDataStore = new FunctionStore();

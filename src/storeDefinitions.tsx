import {makeAutoObservable} from 'mobx';

interface Itinerary {
  id: string;
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
        location => location.id !== locationId,
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
      const location = itinerary.locations.find(item => item.id === locationId);
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
  currentLocation?: {};
}

class UserDataStore {
  initialUserData: UserData = {
    currentLocation: {},
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
}

class FunctionStore {
  initialFunctionData: Function = {
    loaderVisible: false,
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

  reset() {
    this.functionData = {...this.initialFunctionData};
  }
}

export const functionDataStore = new FunctionStore();

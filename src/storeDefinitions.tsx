import {makeAutoObservable} from 'mobx';

interface Location {
  id: string;
  name: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  visited: boolean;
  description?: string;
  images?: string[];
  notes?: string;
  address?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

interface Itinerary {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  locations: Location[];
  createdBy: string;
  collaborators?: string[];
  isPublic?: boolean;
}

class ItineraryStore {
  itineraries: Itinerary[] = [
    {
      id: 'itinerary1',
      name: 'Trip to Europe',
      description: 'A fun trip to Europe covering major cities.',
      startDate: new Date('2024-08-01'),
      endDate: new Date('2024-08-15'),
      locations: [
        {
          id: 'location1',
          name: 'Eiffel Tower',
          city: 'Paris',
          coordinates: {lat: 48.8584, lng: 2.2945},
          visited: false,
          description: 'Iconic symbol of Paris.',
          images: ['eiffel1.jpg', 'eiffel2.jpg'],
          notes: 'Best time to visit is early morning or late evening.',
          address:
            'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
          contactInfo: {
            phone: '+33 892 70 12 39',
            website: 'https://www.toureiffel.paris/en',
          },
        },
        {
          id: 'location2',
          name: 'Louvre Museum',
          city: 'Paris',
          coordinates: {lat: 48.8606, lng: 2.3376},
          visited: false,
          description: "World's largest art museum.",
          images: ['louvre1.jpg', 'louvre2.jpg'],
          notes: 'Closed on Tuesdays.',
          address: 'Rue de Rivoli, 75001 Paris, France',
          contactInfo: {
            phone: '+33 1 40 20 50 50',
            website: 'https://www.louvre.fr/en',
          },
        },
      ],
      createdBy: 'user1',
      collaborators: ['user2', 'user3'],
      isPublic: true,
    },
  ];

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

  addLocation(itineraryId: string, location: Location) {
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
  markLocationAsVisited(itineraryId: string, locationId: string) {
    const itinerary = this.itineraries.find(item => item.id === itineraryId);
    if (itinerary) {
      const location = itinerary.locations.find(item => item.id === locationId);
      if (location) {
        location.visited = true;
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

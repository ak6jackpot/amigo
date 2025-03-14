import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import {Home} from './screens/Home';
import {Splash} from './screens/Splash';
import {LocationDetails} from './screens/LocationDetails';
import {Featured} from './screens/Featured';
import {Search} from './screens/Search';
import {Itineraries} from './screens/Itineraries';
import {NearbyLocations} from './screens/NearbyLocations';
import {DirectionsMap} from './screens/DirectionsMap';
import {ItineraryDetails} from './screens/ItineraryDetails';
import {CreateItinerary} from './screens/CreateItinerary';
import {ItineraryTemplates} from './screens/ItineraryTemplates';
import {Tabs} from './Tabs';
import {SnackUI} from './components/Snack';
import {functionDataStore} from './utils/store';
import {observer} from 'mobx-react-lite';
import {AddToItinerary} from './screens/AddToItinerary';
import {LocationDetailsModal} from './screens/LocationDetailsModal';
import {SheetProvider} from 'react-native-actions-sheet';

export const AppNavigator = observer(() => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>('');
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name as string;
      }}>
      <SheetProvider>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name={'Home'}
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Tabs'}
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Splash'}
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'LocationDetails'}
            component={LocationDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Featured'}
            component={Featured}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Search'}
            component={Search}
            options={{headerShown: false, presentation: 'modal'}}
          />
          <Stack.Screen
            name={'AddToItinerary'}
            component={AddToItinerary}
            options={{headerShown: false, presentation: 'modal'}}
          />
          <Stack.Screen
            name={'LocationDetailsModal'}
            component={LocationDetailsModal}
            options={{headerShown: false, presentation: 'modal'}}
          />
          <Stack.Screen
            name={'Itineraries'}
            component={Itineraries}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'NearbyLocations'}
            component={NearbyLocations}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'DirectionsMap'}
            component={DirectionsMap}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'ItineraryDetails'}
            component={ItineraryDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'CreateItinerary'}
            component={CreateItinerary}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'ItineraryTemplates'}
            component={ItineraryTemplates}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SheetProvider>
      {functionDataStore?.functionData?.snackData?.text && (
        <SnackUI {...functionDataStore?.functionData?.snackData} />
      )}
    </NavigationContainer>
  );
});

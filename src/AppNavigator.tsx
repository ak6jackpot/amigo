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

export const AppNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>('');
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name as string;
      }}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name={'Home'}
          component={Home}
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
          name={'Itineraries'}
          component={Itineraries}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

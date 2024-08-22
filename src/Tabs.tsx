import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Color} from './Utils';
import {faHome, faRoute, faUser} from '@fortawesome/free-solid-svg-icons';
import {Home} from './screens/Home';
import {Itineraries} from './screens/Itineraries';
import {Profile} from './screens/Profile';

export const Tabs = observer(() => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color?.black,
        tabBarStyle: {
          backgroundColor: Color?.whiteBg,
          justifyContent: 'center',
          paddingVertical: 4,
          elevation: 5,
          shadowColor: Color?.black,
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          marginHorizontal: 48,
          position: 'absolute',
          bottom: 12,
          paddingTop: 12,
          paddingBottom: 12,
          alignItems: 'center',
          borderRadius: 1000,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUser}
              size={'100%'}
              color={focused ? Color?.black : Color?.gray900}
            />
          ),
        }}
        name={'Profile'}
        component={Profile}
      />
      <Tab.Screen
        options={{
          tabBarItemStyle: {
            borderLeftWidth: 1,
            borderColor: Color?.gray900,
            borderRightWidth: 1,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faHome}
              size={'100%'}
              color={focused ? Color?.black : Color?.gray900}
            />
          ),
        }}
        name={'Home'}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faRoute}
              size={'100%'}
              color={focused ? Color?.black : Color?.gray900}
            />
          ),
        }}
        name={'Trips'}
        component={Itineraries}
      />
    </Tab.Navigator>
  );
});

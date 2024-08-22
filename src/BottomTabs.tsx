import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Color} from './Utils';
import {faHome, faUmbrella} from '@fortawesome/free-solid-svg-icons';
import {Home} from './screens/Home';
import {Itineraries} from './screens/Itineraries';
import {Profile} from './screens/Profile';

export const BottomTabs = observer(() => {
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
          elevation: 0,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontSize: 9,
            marginVertical: 4,
          },
          tabBarIconStyle: {width: '100%'},
          tabBarBadgeStyle: {
            backgroundColor: '#266ef1',
            minWidth: 8,
            minHeight: 8,
            maxWidth: 8,
            maxHeight: 8,
            borderRadius: 500,
            position: 'absolute',
            left: 65,
            top: 5,
          },
          tabBarIcon: ({focused}) => <></>,
        }}
        name={'Profile'}
        component={Profile}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: 9,
            marginVertical: 4,
          },
          tabBarBadgeStyle: {
            backgroundColor: '#266ef1',
            minWidth: 8,
            minHeight: 8,
            maxWidth: 8,
            maxHeight: 8,
            borderRadius: 500,
            position: 'absolute',
            left: 15,
            top: 5,
          },
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faHome}
              size={20}
              color={focused ? Color?.black : Color?.gray900}
            />
          ),
        }}
        name={'Home'}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Trips',
          tabBarLabelStyle: {
            fontSize: 9,
            marginVertical: 4,
          },
          tabBarBadgeStyle: {
            backgroundColor: '#266ef1',
            minWidth: 8,
            minHeight: 8,
            maxWidth: 8,
            maxHeight: 8,
            borderRadius: 500,
            position: 'absolute',
            left: 15,
            top: 5,
          },
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUmbrella}
              size={20}
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

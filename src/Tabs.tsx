import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Color} from './Utils';
import {faHome, faRoute, faUser} from '@fortawesome/free-solid-svg-icons';
import {Home} from './screens/Home';
import {Itineraries} from './screens/Itineraries';
import {Profile} from './screens/Profile';
import {View} from 'react-native';

export const Tabs = observer(() => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: Color?.black,
        tabBarStyle: {
          backgroundColor: Color?.whiteBg,
          justifyContent: 'center',
          elevation: 5,
          shadowColor: Color?.black,
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          marginHorizontal: 48,
          position: 'absolute',
          bottom: 12,
          paddingTop: 4,
          paddingBottom: 4,
          alignItems: 'center',
          borderRadius: 1000,
          height: 54,
        },
        tabBarLabel: '',
        tabBarIcon: ({focused}) => {
          return (
            <View
              style={{
                borderBottomColor: Color?.pinkPrimary,
                borderLeftColor: Color?.graySend,
                borderRightColor: Color?.graySend,
                borderBottomWidth: focused ? 6 : 0,
                borderRightWidth: focused ? 2 : 0,
                borderLeftWidth: focused ? 2 : 0,
                paddingHorizontal: 24,
                paddingVertical: 8,
                borderRadius: 12,
                // backgroundColor: focused ? '#faf2f9' : Color?.whiteBg,
              }}>
              <FontAwesomeIcon
                icon={
                  route?.name === 'Profile'
                    ? faUser
                    : route?.name === 'Trips'
                    ? faRoute
                    : faHome
                }
                size={30}
                color={Color?.gray900}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{tabBarShowLabel: false}}
      />
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{tabBarShowLabel: false}}
      />
      <Tab.Screen
        name={'Trips'}
        component={Itineraries}
        options={{tabBarShowLabel: false}}
      />
    </Tab.Navigator>
  );
});

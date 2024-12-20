import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet} from 'react-native';
import TabMenu from './components/TabMenu';
import {Home} from './screens/Home';
import {Itineraries} from './screens/Itineraries';
import {Profile} from './screens/Profile';
import {faHouse, faRoute, faUser} from '@fortawesome/free-solid-svg-icons';

export const Tabs = observer(() => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {...styles.tabContainer},
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabMenu screen={'Profile'} focused={focused} icon={faUser} />
          ),
        }}
      />

      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabMenu screen={'Home'} focused={focused} icon={faHouse} />
          ),
        }}
      />
      <Tab.Screen
        name={'Trips'}
        component={Itineraries}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabMenu screen={'Trips'} focused={focused} icon={faRoute} />
          ),
        }}
      />
    </Tab.Navigator>
  );
});

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#F8F7FB',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

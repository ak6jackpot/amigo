/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import {
  MD2LightTheme as DefaultTheme,
  configureFonts,
  PaperProvider,
} from 'react-native-paper';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Ubuntu-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Ubuntu-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Ubuntu-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Ubuntu-Light',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Ubuntu-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Ubuntu-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Ubuntu-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Ubuntu-Light',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Ubuntu-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Ubuntu-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Ubuntu-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Ubuntu-Light',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts({config: fontConfig, isV3: false}),
};
const RootApp = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RootApp);

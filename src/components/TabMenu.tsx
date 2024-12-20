import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Color} from '../Utils';
import * as Animatable from 'react-native-animatable';

type TabMenuType = {
  screen: 'Profile' | 'Home' | 'Trips';
  focused: boolean;
  icon: IconProp;
};

const TabMenu = (props: TabMenuType) => {
  const {screen, focused, icon} = props;

  return (
    <Animatable.View
      animation={'fadeInUp'}
      iterationCount={1}
      duration={1000}
      style={styles.buttonWholeContainer}>
      {focused ? (
        <View style={styles.highlightedButtonOutside}>
          <View style={styles.highlightedButton}>
            <FontAwesomeIcon icon={icon} size={30} color={Color?.gray900} />
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <FontAwesomeIcon icon={icon} size={30} color={Color?.gray900} />
        </View>
      )}
    </Animatable.View>
  );
};

export default React.memo(TabMenu);

const styles = StyleSheet.create({
  buttonWholeContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightedButtonOutside: {
    position: 'absolute',
    padding: 5,
    borderRadius: 35,
    top: -65,
  },
  highlightedButton: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#1E222B',
    elevation: 10,
  },
});

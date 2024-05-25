import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Typography from '../components/Typography';

export const Search = ({route}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FEF9F5',
            justifyContent: 'center',
            padding: 16,
          }}>
          <Typography text={'bruhhhhhhh'} variant="heading" size="x-small" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

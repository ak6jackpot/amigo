import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Typography from '../components/Typography';
import ButtonComp from '../components/ButtonComp';
import {hideMultipleSheets} from '../utils/SheetManagerSuper';
import {allSheetNames} from './sheets';
import {clearAllData} from '../utils/functionalUtils';
export const Logout = () => {
  const sheetRef = useRef(null);

  const navigation = useNavigation();

  return (
    <ActionSheet
      ref={sheetRef}
      closable={false}
      closeOnTouchBackdrop={true}
      closeOnPressBack={true}>
      <View style={{padding: 16}}>
        <View
          style={{
            backgroundColor: 'black',
            width: '100%',
            alignItems: 'center',
            marginVertical: 16,
            padding: 16,
            borderRadius: 16,
          }}>
          <View style={{marginTop: 8, alignItems: 'center'}}>
            <Typography
              variant="paragraph"
              size="large"
              color="#fff"
              text="Your session has expired!"
            />
            <Typography
              variant="paragraph"
              size="large"
              color="#fff"
              text="Please logout and login again"
            />
          </View>
        </View>
        <ButtonComp
          text="Logout"
          onPress={() => {
            clearAllData().then(() => {
              hideMultipleSheets(allSheetNames);
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Splash'}],
                }),
              );
            });
          }}
        />
      </View>
    </ActionSheet>
  );
};

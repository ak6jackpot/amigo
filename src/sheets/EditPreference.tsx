import React, {useRef} from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import Typography from '../components/Typography';
import {preferences} from '../data/data';
import {View} from 'react-native';
import ButtonComp from '../components/ButtonComp';

const DataSelector = ({
  variant,
  data,
}: {
  variant:
    | 'destinationType'
    | 'numberOfTravellers'
    | 'tripDuration'
    | 'keyActivities'
    | 'budget';
  data: Array<Object>;
}) => {
  switch (variant) {
    case 'destinationType': {
      return (
        <>
          <Typography text={'single selector'} />
        </>
      );
    }
    case 'numberOfTravellers': {
      return (
        <>
          <Typography text={'4 options'} />
        </>
      );
    }
    case 'tripDuration': {
      return (
        <>
          <Typography text={'counter'} />
        </>
      );
    }
    case 'keyActivities': {
      return (
        <>
          <Typography text={'multi selector'} />
        </>
      );
    }
    case 'budget': {
      return (
        <>
          <Typography text={'slider'} />
        </>
      );
    }
  }
};

export const EditPreference = props => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const data = preferences[props?.payload?.variant];

  const setDatainStore = () => {};

  return (
    <ActionSheet
      ref={actionSheetRef}
      keyboardHandlerEnabled={false}
      statusBarTranslucent
      drawUnderStatusBar
      useBottomSafeAreaPadding
      openAnimationConfig={{speed: 100}}
      closeAnimationConfig={{speed: 100}}
      containerStyle={{}}>
      <View style={{padding: 16}}>
        <Typography text={data?.title} variant="heading" />
        <DataSelector variant={props?.payload?.variant} data={data} />
        <ButtonComp onPress={setDatainStore} text="Confirm" />
      </View>
    </ActionSheet>
  );
};

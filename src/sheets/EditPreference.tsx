import React, {useRef} from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import Typography from '../components/Typography';

export const EditPreference = props => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

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
      <Typography text={'yoyoyoyoyoy'} />
    </ActionSheet>
  );
};

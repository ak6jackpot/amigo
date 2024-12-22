import {registerSheet} from 'react-native-actions-sheet';
import {EditPreference} from './EditPreference';

export var allSheetNames: string[] = [];

const registerAndAppendSheet = (sheetName: string, sheetComponent: any) => {
  registerSheet(sheetName, sheetComponent);
  allSheetNames.push(sheetName);
};

registerAndAppendSheet('EditPreference', EditPreference);

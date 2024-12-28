import {registerSheet} from 'react-native-actions-sheet';
import {EditPreference} from './EditPreference';
import {Login} from './Login';
import {Logout} from './Logout';

export var allSheetNames: string[] = [];

const registerAndAppendSheet = (sheetName: string, sheetComponent: any) => {
  registerSheet(sheetName, sheetComponent);
  allSheetNames.push(sheetName);
};

registerAndAppendSheet('EditPreference', EditPreference);
registerAndAppendSheet('Login', Login);
registerAndAppendSheet('Logout', Logout);

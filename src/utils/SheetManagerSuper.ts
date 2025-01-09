import {SheetManager} from 'react-native-actions-sheet';
import {allSheetNames} from '../sheets/sheets';

export type sheets = {
  name: 'EditPreference' | 'Logout' | 'Login' | 'Country';
  params?: object;
};
export const SheetManagerSuper = (
  name: sheets['name'],
  params?: sheets['params'],
) => {
  // console.log(name, SheetManager.get(name), '// sheet to show');
  SheetManager.show(name, params);
  const sheetAlreadyLive = SheetManager.get(name) ? true : false;

  if (sheetAlreadyLive) {
    SheetManager.hide(name);
  }
  SheetManager.show(name, params);
};

export const hideMultipleSheets = (sheetNames: string[]) => {
  sheetNames?.map((sheetName: string) => SheetManager.hide(sheetName));
};

export const hideAllSheets = () => {
  allSheetNames?.map((sheetName: string) => SheetManager.hide(sheetName));
};

import {Dimensions} from 'react-native';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const Color = {
  whiteBg: '#fff',
  grayTag: '#EBEBEB',
  gray900: '#999',
  graySend: '#ddd',
  greenSearch: '#E2F4A6',
  pinkPrimary: '#edc6ff',
  pinkSecodary: '#f7c6ef',
  black: '#000',
  incomingMessage: '#e6e6e6',
  outgoingMessage: '#dcf8c6',
  beigeBg: '#FEF9F5',
  buttonPink: '#EEA0FF',
  red: '#e85046',
};

export const randomColorGenerator = () => {
  const colors = [
    '#feeff9',
    '#f9f1ff',
    '#eff4fe',
    '#e2f8fb',
    '#eaf6ed',
    '#fdf2dc',
    '#fff1e1',
    '#fff0e9',
    '#fff0ee',
    '#f3f3f3',
    '#f9e8e4 ',
    '#f3e7f5',
    '#f4f9f4',
    '#fff9e8',
    '#fef6f0',
    '#f0f7fc',
    '#f7f8f2',
    '#e7f7f3',
    '#f5f0f7',
  ];

  return colors[
    Math.floor(Math.random() * colors?.length + 1) % colors?.length
  ];
};

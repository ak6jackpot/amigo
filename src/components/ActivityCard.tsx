import {
  faArrowAltCircleRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';
import Typography from './Typography';

type ActivityCardProps = {
  titleText?: string;
  subText?: string;
  icon?: any;
  color?: string;
};

export const ActivityCard = ({
  titleText = '',
  subText = '',
  icon = faCircle,
  color = '#fff',
}: ActivityCardProps) => {
  return (
    <View
      style={{
        borderRadius: 20,
        marginRight: 8,
        flexDirection: 'column',
        padding: 12,
        width: 160,
        aspectRatio: 1,
        backgroundColor: color,
        justifyContent: 'space-between',
      }}>
      <Typography text={titleText} textStyles={{marginRight: 8}} size="large" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesomeIcon icon={icon} color="pink" size={24} />
          <Typography
            textStyles={{marginLeft: 8}}
            text={subText}
            size="medium"
          />
        </View>
        <FontAwesomeIcon icon={faArrowAltCircleRight} size={30} />
      </View>
    </View>
  );
};

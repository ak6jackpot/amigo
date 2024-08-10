import {
  faArrowAltCircleRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, View} from 'react-native';
import Typography from './Typography';
import {Color} from '../Utils';

type ActivityCardProps = {
  data: object;
  subText?: string;
  icon?: any;
  color?: string;
  onPress?: () => void;
};

export const ActivityCard = ({
  data = {},
  subText = '',
  icon = faCircle,
  color = Color?.whiteBg,
  onPress,
}: ActivityCardProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          borderRadius: 20,
          marginRight: 8,
          flexDirection: 'column',
          padding: 12,
          width: 160,
          aspectRatio: 1,
          backgroundColor: color,
          justifyContent: 'space-between',
          opacity: pressed ? 0.7 : 1,
          borderBottomWidth: pressed ? 2 : 4,
          borderColor: Color?.graySend,
        },
      ]}
      onPress={onPress}>
      <Typography
        text={data?.name}
        textStyles={{marginRight: 8}}
        variant="heading"
      />
      <Typography text={'- ' + data?.locations[0]?.details?.formattedAddress} />
      <Typography text={'- ' + data?.locations[1]?.details?.formattedAddress} />
      <Typography text={''} />
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
    </Pressable>
  );
};

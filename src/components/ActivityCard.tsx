import {
  faArrowAltCircleRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, View} from 'react-native';
import Typography from './Typography';
import {Color} from '../utils/displayUtils';

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
          height: 160,
          aspectRatio: 1.69,
          backgroundColor: color,
          justifyContent: 'space-between',
          opacity: pressed ? 0.7 : 1,
          borderBottomWidth: pressed ? 2 : 4,
          borderColor: Color?.graySend,
          overflow: 'hidden',
        },
      ]}
      onPress={onPress}>
      <Typography
        text={
          data?.name?.length > 20
            ? data?.name?.slice(0, 19) + '...'
            : data?.name
        }
        textStyles={{marginRight: 8}}
        variant="heading"
      />
      <Typography
        text={`- ${
          data?.locations[0]?.details?.name?.length > 30
            ? data?.locations[0]?.details?.name?.slice(0, 30) + '...'
            : data?.locations[0]?.details?.name
        }`}
      />
      <Typography
        text={`- ${
          data?.locations[1]?.details?.name?.length > 30
            ? data?.locations[1]?.details?.name?.slice(0, 30) + '...'
            : data?.locations[1]?.details?.name
        }`}
      />
      {data?.locations[2] ? (
        <Typography
          text={`- ${
            data?.locations[2]?.details?.name?.length > 30
              ? data?.locations[2]?.details?.name?.slice(0, 30) + '...'
              : data?.locations[2]?.details?.name
          }`}
        />
      ) : (
        <Typography text={''} />
      )}
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

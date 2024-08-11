import React, {useState, useRef} from 'react';
import {FlatList, SafeAreaView, View, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {Color} from '../Utils';
import Typography from '../components/Typography';
import ButtonComp from '../components/ButtonComp';
import {tripTemplates} from '../data';
import {ListItem} from '../components/ListItem';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons';
import FastImage from 'react-native-fast-image';

const ItineraryItem = ({item, isExpanded, onPress, navigation}) => {
  const animatedHeight = useRef(
    new Animated.Value(isExpanded ? 250 : 0),
  ).current;

  const toggleAnimation = () => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : 250,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onPress(item);
    });
  };

  return (
    <View style={{marginVertical: 8}}>
      <ListItem
        variant="template"
        data={item}
        onPress={toggleAnimation}
        rightElement={
          <FontAwesomeIcon
            icon={isExpanded ? faCaretUp : faCaretDown}
            color={'#e35f59'}
          />
        }
      />

      {isExpanded && (
        <Animated.View
          style={{
            height: animatedHeight,
            overflow: 'hidden',
            backgroundColor: '#f0f7fc',
            padding: 10,
            alignItems: 'center',
          }}>
          <FlatList
            contentContainerStyle={{paddingRight: 16, marginBottom: 8}}
            data={item?.locations}
            renderItem={({item}) => (
              <View style={{marginRight: 8}}>
                <FastImage
                  style={{
                    width: 200,
                    aspectRatio: 1,
                    borderRadius: 10,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{uri: item?.details?.photos[0]}}
                />
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    backgroundColor: Color?.black,
                    opacity: 0.7,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: 0,
                    paddingVertical: 4,
                  }}>
                  <Typography
                    text={
                      item?.details?.formattedAddress?.length > 25
                        ? item?.details?.formattedAddress?.slice(0, 24) + '...'
                        : item?.details?.formattedAddress
                    }
                    color={Color?.whiteBg}
                  />
                </View>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
          />
          <ButtonComp
            text="Use this template"
            color={Color.buttonPink}
            textColor="#190b14"
            size="medium"
            onPress={() => {
              navigation.navigate('CreateItinerary', {
                name: item?.name,
                description: item?.description,
                locations: item?.locations,
              });
            }}
            styles={{width: 150, borderRadius: 12}}
          />
        </Animated.View>
      )}
    </View>
  );
};

export const ItineraryTemplates = observer(() => {
  const [expandedItem, setExpandedItem] = useState(null);
  const navigation = useNavigation();

  const toggleDropdown = item => {
    setExpandedItem(prevItem => (prevItem === item ? null : item));
  };

  const renderItem = ({item}) => {
    const isExpanded = expandedItem === item;
    return (
      <ItineraryItem
        item={item}
        isExpanded={isExpanded}
        onPress={toggleDropdown}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: Color.beigeBg,
          padding: 16,
          height: '100%',
          width: '100%',
        }}>
        <Typography text={'Plan your dream Vacation!'} variant="heading" />
        <Typography
          text={
            'Pick from specially-curated itineraries or create one on your own!'
          }
          size="large"
        />
        <FlatList
          contentContainerStyle={{
            marginVertical: 16,
            width: '100%',
          }}
          data={tripTemplates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

        <ButtonComp
          text="Create one from scratch"
          color={Color.buttonPink}
          textColor="#190b14"
          width100={true}
          onPress={() => {
            navigation?.navigate('CreateItinerary');
          }}
        />
      </View>
    </SafeAreaView>
  );
});

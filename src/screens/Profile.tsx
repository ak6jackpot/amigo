import {
  faChevronDown,
  faChevronUp,
  faClock,
  faLocation,
  faMailBulk,
  faMobile,
  faMoneyBill1Wave,
  faMountainCity,
  faParachuteBox,
  faPerson,
  faUmbrellaBeach,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import {SheetManagerSuper} from '../utils/SheetManagerSuper';
import {Color} from '../utils/displayUtils';
import {ScreenHeader} from '../components/ScreenHeader';
import {userDataStore} from '../utils/store';

export const Profile = observer(({route}) => {
  return (
    <View
      style={{
        backgroundColor: Color.beigeBg,
        padding: 16,
      }}>
      <ScreenHeader />

      <List.Section>
        <List.Accordion
          title="Personal Details"
          description="Your personal user information"
          left={props => <FontAwesomeIcon icon={faUser} />}
          right={props =>
            props.isExpanded ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )
          }>
          <List.Item
            title="Name"
            description={userDataStore.userData.name}
            left={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon icon={faPerson} />
              </View>
            )}
            onPress={() => {
              SheetManagerSuper('EditPreference');
            }}
          />
          <List.Item
            title="Phone number"
            description={
              userDataStore.userData.countryCode + userDataStore.userData.phone
            }
            left={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon icon={faMobile} />
              </View>
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Email ID"
            description={userDataStore.userData.email}
            left={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon icon={faMailBulk} />
              </View>
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Address"
            description={
              userDataStore.userData.address.city +
              ', ' +
              userDataStore.userData.address.country
            }
            left={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon icon={faLocation} />
              </View>
            )}
            onPress={() => {}}
          />
        </List.Accordion>
      </List.Section>
      <List.Section>
        <List.Accordion
          title="Travel Preferences"
          description="Your default settings for trip planing"
          left={props => <FontAwesomeIcon icon={faUmbrellaBeach} />}
          right={props =>
            props.isExpanded ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )
          }>
          <List.Item
            title="Type of Destination"
            description={userDataStore.userData.preferences.destinationType}
            left={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon icon={faMountainCity} />
              </View>
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Number of travellers"
            description={userDataStore.userData.preferences.numberOfTravellers}
            left={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon icon={faUsers} />
              </View>
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Duration of Trip"
            description={
              userDataStore.userData.preferences.tripDuration + ' days'
            }
            left={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon icon={faClock} />
              </View>
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Key Activities"
            description={
              (userDataStore.userData.preferences.keyActivities[0] || '') +
              (userDataStore.userData.preferences.keyActivities?.length > 1
                ? ', '
                : '') +
              (userDataStore.userData.preferences.keyActivities[1] || '')
            }
            left={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon icon={faParachuteBox} />
              </View>
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Budget"
            description={
              userDataStore.userData.currency +
              ' ' +
              userDataStore.userData.preferences.budget
            }
            left={props => (
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
              </View>
            )}
            onPress={() => {}}
          />
        </List.Accordion>
      </List.Section>
    </View>
  );
});

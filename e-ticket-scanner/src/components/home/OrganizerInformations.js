import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import Person from '../../assets/Home/Person';
import Spacer from '../Spacer';
const OrganizerInformations = ({ numberEvents }) => {
  return (
    <View style={styles.container}>
      <Person />
      <Spacer size={10} />
      <Text style={styles.organizerName}>Organizer Name</Text>
      <Spacer size={10} />
      <Text style={styles.numberEvents}>{numberEvents ? numberEvents : 10} Events</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  organizerName: {
    fontWeight: "700",
    color: "#EFE4FC",
    fontSize: 18,
  },
  numberEvents: {
    fontSize: 14,
    fontWeight: "400",
    color: "#EFE4FC"
  }
});

export default memo(OrganizerInformations);

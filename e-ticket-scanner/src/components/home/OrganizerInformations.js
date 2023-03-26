import { StyleSheet, Text, View, Image } from 'react-native';
import React, { memo } from 'react';
import Person from '../../assets/Home/Person';
import Spacer from '../Spacer';
const OrganizerInformations = ({ numberEvents, name }) => {
  console.log("org infos : ", name)
  return (
    <View style={styles.container}>
      {/* <Person /> */}
      {name?.avatar && <Image source={{uri: name?.avatar}} style={styles.orgAvatar}/>}
      <Spacer size={10} />
      <Text style={styles.organizerName}>{name?.firstName} {name?.lastName}</Text>
      <Spacer size={10} />
      <Text style={styles.numberEvents}>{numberEvents ? numberEvents : 0} Events</Text>
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
  },
  orgAvatar: {
    width: 80,
    height: 80
  }
});

export default memo(OrganizerInformations);

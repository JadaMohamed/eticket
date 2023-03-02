import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import ArrowDown from "./ArrowDown";
const EventCard = ({ isSelected, isList, title, date, location }) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: isSelected ? 2 : 0,
        },
      ]}>
      <View style={styles.imageContainer}></View>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.eventTitle}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.additionalInfos}>
          {date}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.additionalInfos}>
          {location}
        </Text>
      </View>
      {<ArrowDown height={10} width={10} isList={isList} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: 'rgb(222,212,234)',
    width: '100%',
    paddingVertical: 20,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#552E88',
  },
  imageContainer: {
    backgroundColor: '#9982B8',
    height: 70,
    width: 95,
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 170,
    gap: 3,
  },
  eventTitle: { fontSize: 14, color: '#000000', fontWeight: '600' },
  additionalInfos: { fontSize: 12, color: '#808080', fontWeight: '400' },
});

export default memo(EventCard);

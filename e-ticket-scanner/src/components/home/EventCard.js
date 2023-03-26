import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import ArrowDown from "./ArrowDown";
const EventCard = ({ isSelected, isList, title, date, location, brandUrl }) => {
  function ConvertDate(isodate) {
    const date = new Date(isodate);
    const options = { weekday: "long",year: "numeric", day: "numeric", month: "long"};
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: 2,
          borderColor: isSelected ? '#552E88' : "transparent"
        },
      ]}>
      <View style={styles.imageContainer}>
        {brandUrl && <Image source={{uri: brandUrl}} style={styles.eventImage}/>}
      </View>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.eventTitle}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.additionalInfos}>
          {ConvertDate(date)}
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
  eventImage: {width: "100%", height: "100%", borderRadius: 5},
});

export default memo(EventCard);

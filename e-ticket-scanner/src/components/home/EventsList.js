import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {memo, Suspense, useCallback, useState} from 'react';
import {MotiView} from 'moti';
import VSpacer from '../VSpacer';
import {FlashList} from '@shopify/flash-list';

const EventCard = React.lazy(() => import('./EventCard.js'));

const LoadingComponent = React.memo(() => (
  <View
    style={{
      height: Dimensions.get('screen').height,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
    <ActivityIndicator
      width={50}
      height={50}
      style={{height: 50, width: 50}}
      color={'#552E88'}
    />
    <VSpacer />
    <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
      Loading ...
    </Text>
  </View>
));

const EventsList = ({selectedEvent, selectedEventHandler, data}) => {
  if (data.length === 0) {
    return <LoadingComponent />;
  }

  const cardPressHandler = useCallback(index => {
    selectedEventHandler(index);
  }, []);
  return (
    <Suspense fallback={<LoadingComponent />}>
      <View style={{height: Dimensions.get('screen').height, width: '100%'}}>
        <FlashList
          data={data}
          extraData={selectedEvent}
          ItemSeparatorComponent={() => <VSpacer size={15} />}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={200}
          ListFooterComponent={() => <VSpacer size={50} />}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => (
            <MotiView
              from={{opacity: 0, translateY: -30}}
              animate={{opacity: 1, translateY: 0}}
              exit={{
                opacity: 0,
                translateY: 30,
              }}
              transition={{
                type: 'spring',
                damping: 6,
                mass: 0.8,
                stiffness: 200,
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  cardPressHandler(index);
                }}>
                <EventCard
                  isSelected={selectedEvent === index}
                  isList={true}
                  title={item?.title}
                  location={item?.location}
                  date={item?.start_time}
                />
              </TouchableOpacity>
            </MotiView>
          )}
        />
      </View>
    </Suspense>
  );
};

export default memo(EventsList);

const styles = StyleSheet.create({});

import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useRef, useCallback, useEffect, useMemo, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../assets/Logo.svg';
import OrganizerInformations from '../components/home/OrganizerInformations';
import Spacer from '../components/Spacer';
// import BottomSheet from '@gorhom/bottom-sheet';
import EventCard from '../components/home/EventCard';
import QrCodeScanner from '../assets/Home/QrCodeScanner.svg';
import Check from '../assets/Home/Check.svg';
import * as Animatable from 'react-native-animatable';
import {MotiView} from 'moti';
import {AnimatePresence} from 'moti/build';
import VSpacer from '../components/VSpacer';
import {height} from '../constants/Layout';
import EventsList from '../components/home/EventsList';

const ABottomSheet = React.lazy(() => import('@gorhom/bottom-sheet'));
const BottomSheet = React.memo(ABottomSheet);
const Home = ({route, navigation}) => {
  const [isFullyExpanded, setFullyExpanded] = useState(false);
  const [selectedEventCard, setSelectedEventCard] = useState(0);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(
        `https://e-ticket-server.onrender.com/api/scanner/organizers/${route.params?.org_id}`,
      );
      const data = await response.json();
      setEvents(data.Events);
    };
    if (route.params?.org_id) {
      fetchEvents();
    }
  }, []);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '100%'], []);

  const expandFull = useCallback(() => {
    bottomSheetRef.current.snapToIndex(1);
    setFullyExpanded(true);
  }, []);

  const selectedEventHandler = useCallback(index => {
    if (index || index === 0) setSelectedEventCard(index);
    return selectedEventCard;
  }, []);

  const fabPressHandler = useCallback(() => {
    if (isFullyExpanded) {
      bottomSheetRef.current.snapToIndex(0);
      setFullyExpanded(false);
    } else {
      navigation.push('Scanner', {
        event_id: events[selectedEventCard].event_id,
        org_id: route.params?.org_id,
      });
    }
  }, [events, isFullyExpanded]);

  return (
    <LinearGradient colors={['#30194F', '#552E88']} style={styles.container}>
      <Logo style={styles.logo} />
      <Spacer size={100} />
      <OrganizerInformations numberEvents={events.length} />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: '#EFE4FC'}}
        animateOnMount={true}
        // onChange={handleSheetChanges}
      >
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.headerText}>Choose Event</Text>
          <Spacer size={15} />
          <AnimatePresence>
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
              }}
              delay={200}>
              {isFullyExpanded ? (
                <EventsList
                  selectedEvent={selectedEventCard}
                  selectedEventHandler={selectedEventHandler}
                  data={events}
                />
              ) : (
                <TouchableOpacity activeOpacity={0.6} onPress={expandFull}>
                  <EventCard
                    title={events[selectedEventCard]?.title}
                    location={events[selectedEventCard]?.location}
                    date={events[selectedEventCard]?.start_time}
                  />
                </TouchableOpacity>
              )}

              <Spacer size={15} />
              <View style={{position: 'relative'}}>
                {isFullyExpanded === false && (
                  <>
                    <Text>
                      {events[selectedEventCard]?.number_sold_tickets}/
                      {events[selectedEventCard]?.max_number_attendants} Seats
                    </Text>
                    <Text>3 Categories</Text>
                  </>
                )}
              </View>
            </MotiView>
          </AnimatePresence>
        </View>
      </BottomSheet>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.fab,
          {
            bottom: 8,
          },
        ]}
        onPress={fabPressHandler}>
        {isFullyExpanded ? <Check /> : <QrCodeScanner />}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  bottomSheetContainer: {
    backgroundColor: '#EFE4FC',
    paddingHorizontal: 20,
    position: 'relative',
    height: '100%',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000000',
  },
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#552E88',
    borderRadius: 40,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#552E88',
  },
});

export default Home;

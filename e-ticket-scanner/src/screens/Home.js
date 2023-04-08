import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useRef, useCallback, useEffect, useMemo, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../assets/Logo.svg';
import OrganizerInformations from '../components/home/OrganizerInformations';
import Spacer from '../components/Spacer';
import EventCard from '../components/home/EventCard';
import QrCodeScanner from '../assets/Home/QrCodeScanner.svg';
import Check from '../assets/Home/Check.svg';
import {MotiView} from 'moti';
import {AnimatePresence} from 'moti/build';
import EventsList from '../components/home/EventsList';
import { API_URL } from '../constants/Api';

const ABottomSheet = React.lazy(() => import('@gorhom/bottom-sheet'));
const BottomSheet = React.memo(ABottomSheet);
const Home = ({route, navigation}) => {
  const [isFullyExpanded, setFullyExpanded] = useState(false);
  const [selectedEventCard, setSelectedEventCard] = useState(0);
  const [events, setEvents] = useState([]);
  const [nbrSeatCategories, setNbrSeatCategories] = useState(0);
  const [orgName, setOrgName] = useState({firstName: "", lastName: "", avatar: ""});
  
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(
        `${API_URL}/api/scanner/organizers/${route.params?.org_id}`,
      );
      const data = await response.json();
      setEvents(data.Events);
      console.log(data.Events);
    };

    const fetchOrganizerName = async () => {
      const response = await fetch(
        `${API_URL}/api/accounts/${route.params?.account_id}`,
      );
      const data = await response.json();
      setOrgName({firstName: data.first_name, lastName: data.last_name, avatar: data.avatar});
      console.log(data.Events);
    };

    if (route.params?.org_id) {
      fetchEvents();
    }

    if(route.params?.account_id) {
      fetchOrganizerName();
    }
  }, []);

  //http://localhost:8000/api/seat-categories/event/2
  useEffect(() => {
    if(events.length != 0) {
      const fetchEventCategories = async () => {
        const response = await fetch(
          `${API_URL}/api/seat-categories/event/${events[selectedEventCard].event_id}`,
        );
        const data = await response.json();
        console.log("seat categories : " , data);
        setNbrSeatCategories(data.length);
      };
      fetchEventCategories();
    }
  }, [events, selectedEventCard])
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '100%'], []);

  const expandFull = useCallback(() => {
    setFullyExpanded(true);
    bottomSheetRef.current.snapToIndex(1);
  }, []);

  const selectedEventHandler = useCallback(index => {
    if (index || index === 0) setSelectedEventCard(index);
    return selectedEventCard;
  }, []);

  const fabPressHandler = useCallback(() => {
    if (isFullyExpanded) {
      setFullyExpanded(false);
      bottomSheetRef.current.snapToIndex(0);
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
      <OrganizerInformations numberEvents={events.length} name={orgName}/>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: '#EFE4FC'}}
        animateOnMount={true}
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
                    brandUrl={`https://res.cloudinary.com/djjwswdo4/image/upload/v1/${events[selectedEventCard]?.brand_url}`}
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
                    <Text>{nbrSeatCategories} Categories</Text>
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

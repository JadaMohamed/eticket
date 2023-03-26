import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Header from '../assets/Authentification/Header.svg';
import Logo from '../assets/Logo.svg';
import {width} from '../constants/Layout';
import LabeledTextInput from '../components/authentification/LabeledTextInput';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import { API_URL } from '../constants/Api';

//FIXME: SVG Works fine in chrome, but in android it's not why ?.
const Authentification = ({navigation}) => {
  const [email, setEmail] = useState('organizer@example.com');
  const [password, setPassword] = useState('organizerpassword');
  const [signinin, setsigninin] = useState(false);

  const emailChangeHandler = value => setEmail(value);
  const passwordChangeHandler = value => setPassword(value);
  const navigateToEvents = useCallback(
    (orgId, accountId) => navigation.replace('Home', {org_id: orgId, account_id: accountId}),
    [],
  );

  const fetchOrganizer = async accountId => {
    const response = await fetch(
      `${API_URL}/api/scanner/organizers/account/${accountId}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch organizer');
    }

    return response.json();
  };

  const signInHandler = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/scanner/accounts/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        },
      );
      setsigninin(false);
      if (!response.ok) {
        Alert.alert('Login Error :', 'Invalid email or password');
      }
      const accountId = await response.json();
      const organizer = await fetchOrganizer(accountId);
      console.log(organizer);
      navigateToEvents(organizer.org_id, organizer.account_id);
    } catch (error) {
      console.error('Failed to login :', error);
      setsigninin(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Header /> */}
        <Image
          source={require('../assets/Authentification/Header.png')}
          style={styles.headerImage}
        />
        <Logo style={styles.logo} />
      </View>
      <View style={styles.authenticationSection}>
        <Text style={styles.title}>Sign In</Text>
        <Spacer />
        <LabeledTextInput
          placeholder="example@email.com"
          label={'Email'}
          value={email}
          onChange={emailChangeHandler}
        />
        <Spacer />
        <LabeledTextInput
          placeholder="*****************"
          label={'Password'}
          value={password}
          onChange={passwordChangeHandler}
          isVisible={true}
        />
        <Spacer size={15} />
        <Button
          onPress={() => {
            signInHandler();
            setsigninin(true);
          }}
          title={signinin ? 'Please wait...' : 'Sign In'}
          height={40}
        />
      </View>
    </View>
  );
};

export default Authentification;

const styles = StyleSheet.create({
  authenticationSection: {position: 'relative', paddingHorizontal: 40},
  container: {
    flex: 1,
    backgroundColor: '#30194F',
  },
  header: {
    position: 'relative',
    height: '55%',
  },
  headerImage: {
    position: 'absolute',
    top: -40,
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 30,
    color: '#D5CBE1',
    fontFamily: 'SEGOEUI',
    fontWeight: '600',
  },
});

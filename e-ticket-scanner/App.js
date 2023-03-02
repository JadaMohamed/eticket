import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/navigation/Stack';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const App = () => {
  React.useEffect(() => {
    const setNavigationBarColor = async (color) => {
      try{
          const response = await changeNavigationBarColor(color);
      }catch(e){
          console.log(e)
      }

  };
  setNavigationBarColor('#30194F');
  })
  return (
    <NavigationContainer>
      <StatusBar hidden/>
      <Stack/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
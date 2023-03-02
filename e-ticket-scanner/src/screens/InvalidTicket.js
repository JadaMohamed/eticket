import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import InvalidMark from "../assets/Validation/InvalidMark.svg"
import Spacer from '../components/Spacer'
import Button from '../components/Button'
import { widthPercentageToDP } from '../constants/Layout'

const InvalidTicket = ({ navigation }) => {
  const tryAgainHandler = () => navigation.pop();
  return (
    <LinearGradient colors={['#C50000', '#FFFFFF']} style={styles.container}>
      <View style={{ position: "absolute", top: widthPercentageToDP("30%"), alignItems: "center", justifyContent: "center", width: widthPercentageToDP("80%"), height: widthPercentageToDP("60%"), borderRadius: 10, backgroundColor: "white" }}>
        <InvalidMark />
        <Spacer />
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#000000" }}>Ticket Invalid</Text>
      </View>

      <View style={{ position: "absolute", bottom: 0 }}>
        <Button title={"Try Again"} onPress={tryAgainHandler} backgroundColor="#C40000" textColor='white' width={widthPercentageToDP("80%")} />
        <Spacer size={40} />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default InvalidTicket
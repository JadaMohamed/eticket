import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height } from '../constants/Layout'

const Spacer = ({ size = 10 }) => {
  return (
    <View style={{height: size}}/>
  )
}

export default React.memo(Spacer)

const styles = StyleSheet.create({})
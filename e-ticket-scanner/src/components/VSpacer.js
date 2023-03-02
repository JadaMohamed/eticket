import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height } from '../constants/Layout'

const VSpacer = ({ size = 10 }) => {
  return (
    <View style={{height: size}}/>
  )
}

export default React.memo(VSpacer)

const styles = StyleSheet.create({})
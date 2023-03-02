import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {width} from '../constants/Layout';

const Button = ({
  onPress,
  borderColor,
  title,
  width = '100%',
  height = 50,
  backgroundColor = '#D9D9D9',
  textColor = '#30194F',
}) => {
  const pressableWidth = width - 30;
  const minWidth = 350;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: height,
        width: width,
        paddingHorizontal: 50,
        backgroundColor: backgroundColor,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: borderColor,
        borderWidth: borderColor ? 1 : 0,
      }}>
      <Text style={{color: textColor}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Visibility from '../../assets/Authentification/Visibility.svg';

const LabeledTextInput = ({
  label,
  onChange,
  value,
  isVisible,
  textInputStyle,
  labelStyle,
  containerStyle,
  placeholder,
}) => {
  const [visible, setVisible] = useState(isVisible);
  const isPassword = isVisible;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View>
        <TextInput
          placeholderTextColor={'#D5CBE14D'}
          underlineColorAndroid={'#D5CBE1CC'}
          style={[styles.textInput, textInputStyle]}
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
          secureTextEntry={visible ? true : false}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => {
              if (visible) setVisible(false);
              else setVisible(true);
            }}
            style={styles.visibilityIcon}>
            <Visibility />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingTop: 8},
  textInputContainer: {
    position: 'relative',
  },
  visibilityIcon: {
    position: 'absolute',
    right: 5,
    bottom: 15,
  },
  label: {color: '#D5CBE1', fontSize: 16},
  textInput: {paddingHorizontal: 15, paddingVertical: 11, color: '#FFFFFF'},
});

export default LabeledTextInput;

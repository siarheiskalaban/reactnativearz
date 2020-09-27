import React, {PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {rem} from '../size';

type ButtonProps = {
  onClick?: () => any;
  primary?: boolean;
  children?: string;

};

export const Button = ({onClick, primary, children}: ButtonProps) => {
  const [extBtn, extText] = !!primary
    ? [styles.btnPrimary, styles.textPrimary]
    : [styles.btnSecondary, styles.textSecondary];

  return (
    <TouchableOpacity style={[styles.btn, extBtn]} onPress={onClick}>
      <Text style={[styles.text, extText]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: rem(1),
    borderRadius: 5,
  },
  text: {
    fontWeight: '400',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnSecondary: {
    backgroundColor: '#fafafa',
    borderColor: '#212121',
    borderWidth: 2,
  },
  btnPrimary: {
    backgroundColor: '#212121',
  },
  textSecondary: {
    color: '#212121',
  },
  textPrimary: {
    color: '#fafafa',
  },
});

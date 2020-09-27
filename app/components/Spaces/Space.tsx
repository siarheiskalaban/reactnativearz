import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from '../size';

export const Space = ({size}: {size: 1 | 2 | 3 | 4 | 5}) => {
  return <View style={styles[size]}></View>;
};

const ph = (value: number) => {
  return {
    paddingTop: rem(value),
    paddingBottom: rem(value),
  };
};

const styles = StyleSheet.create({
  1: ph(0.25),
  2: ph(0.5),
  3: ph(1),
  4: ph(1.5),
  5: ph(3),
});

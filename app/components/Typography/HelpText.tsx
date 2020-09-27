import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text} from 'react-native';

export const HelpText = ({children}: PropsWithChildren<{}>) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: "#9e9e9e"
  },
});

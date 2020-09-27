import React, {PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';

export const Center = ({children}: PropsWithChildren<{}>) => {
  return <View style={styles.center}>{children}</View>;
};

const styles = StyleSheet.create({
  center: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
  },
});

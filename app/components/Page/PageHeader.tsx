import React, {PropsWithChildren} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export type PageHeaderProps = PropsWithChildren<{}>;

export const PageHeader = (props: PageHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25
  },
});

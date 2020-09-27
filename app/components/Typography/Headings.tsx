import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  h1: {
    fontSize: 40,
    fontWeight: '500',
    marginBottom: 8,
    lineHeight: 48,
  },
  h2: {
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 38.4,
    marginBottom: 8,
  },
  h3: {
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 33.6,
    marginBottom: 8,
  },
  h4: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 28.8,
    marginBottom: 8,
  },
  h5: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 8,
  },
  h6: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.2,
    marginBottom: 8,
  },
});

type HProps = PropsWithChildren<{
  center?: boolean;
}>;

const H = ({children, center, style}: HProps & {style: any}) => {
  const textStyle = center ? [styles.center, style] : style;

  return <Text style={textStyle}>{children}</Text>;
};

const make = (style: any) => (props: HProps) => <H {...props} style={style} />;

export const H1 = make(styles.h1);
export const H2 = make(styles.h2);
export const H3 = make(styles.h3);
export const H4 = make(styles.h4);
export const H5 = make(styles.h5);
export const H6 = make(styles.h6);

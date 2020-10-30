import React, {useState, useCallback} from 'react';
import {Page, NumericValueBlock} from '../../components';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';

const COLUMNS = 3;
const COLUMNS_ARRAY = Array.from<number>({ length: COLUMNS });
const ROWS = 12;
const ROWS_ARRAY = Array.from<number>({ length: ROWS });
const ITEMS = Array.from<number>({ length: COLUMNS * ROWS });
const key = (index: number) => `v${index + 1}`;

const useCustomState = () => {
  const initialState = {};
  ITEMS.forEach((_, index) => (initialState[key(index)] = index + 5));

  const [state, setState] = useState(initialState);

  const createChangeHandler = (key: string) => {
    const handler = (value: number) => {
      setState({...state, [key]: value});
    };

    return useCallback(handler, [state, setState]);
  };

  const handleChange = {};
  ITEMS.forEach((_, index) => (handleChange[key(index)] = createChangeHandler(key(index))));

  return {
    state,
    handleChange,
  };
};

export const ControlsPanel = (props: { prefix: string }) => {
  const { prefix } = props;
  const blockStyles = {wrapper: styles.numericValueWrapper};
  const {state, handleChange} = useCustomState();

  return (
    <ScrollView style={{flex: 1}}>
      {ROWS_ARRAY.map((_, row) => (
        <View key={row} style={styles.row}>
          {COLUMNS_ARRAY.map((_, col) => {
            const number = row * COLUMNS + col;
            
            return (
              <NumericValueBlock
                key={col}
                styles={blockStyles}
                value={state[key(number)]}
                onChange={handleChange[key(number)]}
                name={`${prefix}${number}`}
                suffix="В"
              />
            )
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  numericValueWrapper: {
    flex: 1,
    flexGrow: 1,
    flexBasis: 0,
  },
});

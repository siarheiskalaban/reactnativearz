import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BottomSheet, Input, Slider} from 'react-native-elements';
import {Button} from '../Button';

export interface NumericValueBlockProps {
  name: string;
  value: number;
  onChange: (value: number) => any;
  suffix?: string;

  styles?: {
    wrapper?: any;
    block?: any;
    nameBlock?: any;
    valueBlock?: any;
  };
}

const useCustomState = (props: NumericValueBlockProps) => {
  const initialState = {
    isEdit: false,
  };

  const [state, setState] = useState(initialState);

  const toggleEdit = () => {
    setState({isEdit: !state.isEdit});
  };

  const handleChange = (value: string) => {
    let number = parseFloat(value || '0');
    number = Math.round(number * 10) / 10;
    props.onChange(number);
  };

  const increment = () => {
    let value = props.value + 0.1;
    value = Math.round(value * 10) / 10;
    props.onChange(value);
  }

  const decrement = () => {
    let value = props.value - 0.1;
    value = Math.round(value * 10) / 10;
    props.onChange(value);
  }

  const toggleEditMemoized = useCallback(toggleEdit, [state, setState]);
  return {
    state,
    increment,
    decrement,
    toggleEdit: toggleEditMemoized,
    handleChange,
  };
};

export const NumericValueBlock = (props: NumericValueBlockProps) => {
  const {state, toggleEdit, handleChange, increment, decrement} = useCustomState(props);

  const {name, value, suffix} = props;
  const propStyles = props.styles ?? {};

  return (
    <View style={[styles.wrapper, propStyles.wrapper]}>
      <View style={[styles.block, propStyles.block]}>
        <TouchableOpacity onPress={toggleEdit}>
          <>
            <View style={[styles.nameBlock, propStyles.nameBlock]}>
              <Text>{name}</Text>
            </View>
            <View style={[styles.valueBlock, propStyles.valueBlock]}>
              <Text>
                {value}
                {suffix && ` ${suffix}`}
              </Text>
            </View>
          </>
        </TouchableOpacity>
        <BottomSheet
          isVisible={state.isEdit}
          modalProps={{style: styles.bottomSheet}}>
          <View style={styles.overlay}>
            <Input
              value={value.toString()}
              onChangeText={handleChange}
              label={name}
            />
            <View style={{display: 'flex', flexDirection: 'row', marginBottom: 15}}>
              <Button onClick={decrement}>-</Button>
              <View style={{flexGrow: 1, marginTop: 7, marginHorizontal: 10}}>
                <Slider
                  value={value}
                  onValueChange={handleChange as any}
                  step={0.1}
                  minimumValue={0}
                  maximumValue={100}
                />
              </View>
              <Button onClick={increment}>+</Button>
            </View>
            <Button onClick={toggleEdit}>Close</Button>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 3,
  },
  block: {
    borderColor: '#cecece',
    borderRadius: 4,
    borderWidth: 1,
  },
  nameBlock: {
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#cecece',
  },
  valueBlock: {
    textAlign: 'center',
    padding: 5,
  },
  bottomSheet: {
    height: 400,
  },
  overlay: {
    backgroundColor: '#fff',
    height: 300,
    padding: 5,
  },
});

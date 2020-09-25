import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export interface SearchButtonProps {
  onSearch: () => any;
  searching: boolean;
}

interface State {
  pushed: boolean;
}

export class SearchButton extends React.Component<SearchButtonProps, State> {
  state = {pushed: false};

  public render() {
    const styles = this.getStyles();
    const {onSearch, searching} = this.props;

    return (
      <View>
        <TouchableWithoutFeedback
          disabled={searching}
          style={styles.container}
          onPress={onSearch}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}>
          <Text style={styles.text}>
            {searching && 'Поиск...'}
            {!searching && 'Старт'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  private handlePressIn = () => {
    this.setState({pushed: true});
  };

  private handlePressOut = () => {
    this.setState({pushed: false});
  };

  private getStyles = () => {
    const {pushed} = this.state;
    return {
      container: pushed
        ? [styles.container, styles.containerPressIn]
        : styles.container,
      text: pushed ? [styles.text, styles.textPressIn] : styles.text,
    };
  };
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    borderRadius: 75,
    borderColor: '#212121',
    borderWidth: 4,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  containerPressIn: {
    backgroundColor: '#212121',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textPressIn: {
    color: '#fafafa',
  },
});

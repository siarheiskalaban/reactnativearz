import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Text, View} from 'react-native';
import {SearchButton} from './SearchButton';
import {connect} from 'react-redux';
import {Link} from 'react-router-native';

interface ConnectionPanelProps {
  connect: () => any;
  connecting: boolean;
  connectionError: boolean;
  connected: boolean;
}

function _ConnectionPanel(props: ConnectionPanelProps) {
  const {connect, connecting} = props;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {connecting && 'Подключение...'}
          {!connecting && 'Начало работы'}
        </Text>
      </View>
      <View>
        <Link to="/test">
          <Text>Go to 2</Text>
        </Link>
      </View>
      <View style={styles.separator} />
      <View>
        <Text>Для начала использования устройства нажмите 'Старт'</Text>
      </View>
      <View style={{height: 45}} />
      <View>
        <SearchButton onSearch={connect} searching={connecting} />
      </View>
    </View>
  );
}

const mapStateToProps = (state: any) => {
  return {
    connected: state.connection.connected,
    connecting: state.connection.pending,
    connectionError: state.connection.error,
  };
};

const mapDispatchToProps = {
  connect: () => {},
};

export const ConnectionPanel = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ConnectionPanel);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

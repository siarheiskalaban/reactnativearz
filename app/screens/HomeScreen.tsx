import React from 'react';
import {Page, HelpText, H6, H4, Center, Space, Button} from '../components';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {connect} from 'react-redux';
import {connectionActions} from '../modules/connection/connection.actions';

interface HomeScreenProps {
  attached: boolean;
  deviceName?: string;
  connect: () => any;
}

const _HomeScreen = ({attached, deviceName, connect}: HomeScreenProps) => {
  return (
    <Page>
      <Page.Body>
        <View style={styles.container}>
          <H4 center>Начало работы</H4>
          <H6 center>
            {!attached && 'Подключите устройство'}
            {attached && 'Устройство подключено'}
          </H6>
          {!attached && (
            <>
              <Center>
                <HelpText>Ожидаем подключения</HelpText>
              </Center>
              <Space size={3} />
              <View>
                <ActivityIndicator size="large" color="#000000" />
              </View>
              <Space size={3} />
            </>
          )}
          {attached && (
            <>
              <Space size={5} />
              <Center>
                <Text>DEVICE: {deviceName}</Text>
              </Center>
              <Space size={2} />
              <Button onClick={connect} primary>
                Connect
              </Button>
            </>
          )}
        </View>
      </Page.Body>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    attached: state.connection.attached,
    deviceName: state.connection.deviceName,
  };
};

const mapDispatchToProps = {
  connect: connectionActions.connect,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
});

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(_HomeScreen);

export default HomeScreen;

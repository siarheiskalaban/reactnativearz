import React from 'react';
import {Page, HelpText, H6, H4, Center, Space, Button} from '../components';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {connect} from 'react-redux';
import {connectionActions} from '../modules/connection/connection.actions';
import { UsbSubscription, usb, UsbResponse } from '../core';

interface DeviceScreenProps {
  displayName?: string;
}

class _DeviceScreen extends React.Component<DeviceScreenProps, { menu: string }> {
  state = { menu: '' };

  private _menuSubscription: UsbSubscription = null;

  public componentDidMount() {
    this._menuSubscription = usb.subscribeKind("MENU_CHANGE", this.handleMenuChange);
  }

  public componentWillUnmount() {
    this._menuSubscription?.dispose();
  }

  private handleMenuChange = (response: UsbResponse) => {
    this.setState({ menu: response.payload });
  }

  public render() {
    const { displayName } = this.props;

    return (
      <Page>
        <Page.Body>
          <View style={styles.container}>
            <H4 center>{displayName}</H4>
            <Center>
              <Text>Устройство подключено и готово к работе.</Text>
            </Center>
            <Space size={3} />
            <Center>
              <Text>
                MENU: {this.state.menu}
              </Text>
            </Center>
            <Space size={3} />
            <View style={styles.btnGroup}>
              <Button onClick={() => connectionActions.send("LEFT")}>LEFT</Button>
              <Button onClick={() => connectionActions.send("RIGHT")}>RIGHT</Button>
            </View>
          </View>
        </Page.Body>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayName: state.connection.displayName,
  };
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },

  btnGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

const DeviceScreen = connect(mapStateToProps)(_DeviceScreen);
export default DeviceScreen;

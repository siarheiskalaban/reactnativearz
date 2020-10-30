import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {NativeRouter, Route, Switch} from 'react-router-native';
import {ConnectedRouter} from 'connected-react-router';

import store, {routerHistory} from './configureStore';
import HomeScreen from './screens/HomeScreen';

import {
  startUsbService,
  stopUsbService,
} from './modules/connection/connection.actions';
import DeviceScreen from './screens/DeviceScreen';
import { ArduinoKitScreen } from './screens/ArduinoKitScreen';

class App extends React.Component {
  public componentDidMount() {
    startUsbService();
  }

  public async componentWillUnmount() {
    await stopUsbService()
  }

  public render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Provider store={store}>
            <NativeRouter>
              <ConnectedRouter history={routerHistory}>
                <Switch>
                  <Route exact path="/" component={ArduinoKitScreen} />
                  <Route path="/old" component={HomeScreen} />
                  <Route path="/device" component={DeviceScreen} />
                </Switch>
              </ConnectedRouter>
            </NativeRouter>
          </Provider>
        </SafeAreaView>
      </>
    );
  }
}

export default App;

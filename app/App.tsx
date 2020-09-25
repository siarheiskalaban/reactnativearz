import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';

import {Provider} from 'react-redux';
import {NativeRouter, Route, Switch} from 'react-router-native';
import {ConnectedRouter} from 'connected-react-router';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import store, {routerHistory} from './configureStore';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Provider store={store}>
          <NativeRouter>
            <ConnectedRouter history={routerHistory}>
              <Switch>
                <Route exact path="/" component={HomeScreen} />
              </Switch>
            </ConnectedRouter>
          </NativeRouter>
        </Provider>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

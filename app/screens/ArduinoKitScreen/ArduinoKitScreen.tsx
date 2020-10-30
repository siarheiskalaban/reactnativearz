import React, {useState, useCallback} from 'react';
import {Page} from '../../components';
import {View, Dimensions} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ControlsPanel } from './ControlsPanel';

export const ArduinoKitScreen = () => {
  return (
    <Page>
      <Page.Header>Arduino Kit</Page.Header>
      <Page.Body>
        <Tabs />
      </Page.Body>
    </Page>
  );
};

const FirstRoute = () => (
  <ControlsPanel prefix="A" />
);

const SecondRoute = () => (
  <ControlsPanel prefix="B" />
);

const initialLayout = { width: Dimensions.get('window').width };

export function Tabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={() => (<></>)}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

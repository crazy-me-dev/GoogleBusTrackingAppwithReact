import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ParentScreen from './ParentScreen';
import PageSelectionScreen from './PageSelectionScreen';
import ParentSelectScreen from './ParentSelectScreen';
import DriverScreen from './DriverScreen';

const RootStack = StackNavigator({
  PageSelectionScreen: {
    screen: PageSelectionScreen,
  },
  ParentSelectScreen: {
    screen: ParentSelectScreen,
  },
  ParentScreen: {
    screen: ParentScreen,
  },
  DriverScreen: {
    screen: DriverScreen,
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  }
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ParentScreen from './ParentScreen';
import PageSelectionScreen from './PageSelectionScreen';
import DriverScreen from './DriverScreen';

const RootStack = StackNavigator({
  PageSelectionScreen: {
    screen: PageSelectionScreen,
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

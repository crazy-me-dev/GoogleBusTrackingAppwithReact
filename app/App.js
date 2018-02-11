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
    navigationOptions: {
      title: 'Select Page',
    }
  },
  ParentSelectScreen: {
    screen: ParentSelectScreen,
    navigationOptions: {
      title: 'Select Bus',
    }
  },
  ParentScreen: {
    screen: ParentScreen,
    navigationOptions: {
      title: 'Parent',
    }
  },
  DriverScreen: {
    screen: DriverScreen,
    navigationOptions: {
      title: 'Driver',
    }
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

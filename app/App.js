import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import MapView from 'react-native-maps';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    let ws = new WebSocket('ws://192.168.0.178:3000');
    ws.onopen = () => {
      // connection opened
      console.log('connected my person');
    };
  }

  componentWillMount() { }

  render() {
    return (
      <View style={styles.container}>
        <Text>blah</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

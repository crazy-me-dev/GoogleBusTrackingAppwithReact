import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class DriverScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: 'initial',
      longitude: 'initial',
    };
    this.setUpWebSocket();
  }

  setUpWebSocket() {
    this.websocket = new WebSocket('ws://192.168.0.178:3000');
    this.websocket.onopen = () => {
      // connection opened
      console.log('connected to server');
      this.websocket.send(JSON.stringify({
        method: 'publish',
        locationID: '123',
      }));
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.websocket.send(JSON.stringify({
          method: 'emitLocation',
          location: position.coords,
          locationID: '123'
        }));
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.error ? <Text>{this.state.error}</Text> :
          <View>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    width: 300,
    margin: 10
  },
});

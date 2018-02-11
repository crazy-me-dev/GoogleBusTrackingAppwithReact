import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default class ParentScreen extends React.Component {

  constructor(props) {
    super(props);

    const startLocation = { latitude: 39.7684, longitude: -86.1581 };
    this.state = {
      region: {
        latitude: 39.7684,
        longitude: -86.1581,
        latitudeDelta: .3,
        longitudeDelta: .3,
      },
      locations: [startLocation],
      current: startLocation,
    };
    this.setUpWebSocket();
  }

  setUpWebSocket() {
    this.websocket = new WebSocket('ws://192.168.0.178:3000');
    this.websocket.onopen = () => {
      // connection opened
      console.log('connected to server');

      this.websocket.send(JSON.stringify({
        method: 'subscribe',
        locationID: '123',
      }));
    };
    this.websocket.onmessage = (message) => {
      let data = JSON.parse(message.data);
      switch (data.method) {
        case 'LatestLocation':
          this.handleLatestLocationMessage(data);
          break;
        case 'SubscriptionSuccess':
          this.handleSubscriptionSuccessMessage(data);
          break;
        case 'LocationHistory':
          this.handleLocationHistoryMessage(data);
          break;
        default:
          break;
      }
    };
  }

  handleLatestLocationMessage(data) {
    const newLocations = this.state.locations.slice(0);
    newLocations.push(data.payload);
    this.setState({
      region: {
        latitude: data.payload.latitude,
        longitude: data.payload.longitude,
        latitudeDelta: .3,
        longitudeDelta: .3,
      },
      locations: newLocations,
      current: data.payload,
    });
  }

  handleSubscriptionSuccessMessage(data) {
    this.websocket.send(JSON.stringify({
      method: 'getHistory',
      locationID: '123',
    }));
  }

  handleLocationHistoryMessage(data) {
    const locations = data.payload;
    const current = locations[locations.length - 1];
    this.setState({
      region: {
        latitude: current.latitude,
        longitude: current.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      },
      locations: locations,
      current: current,
    });
  }

  componentWillMount() { }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}>
          <Polyline
            coordinates={this.state.locations}
            strokeColor={'#4286f4'}
            strokeWidth={2} />
          <Marker coordinate={this.state.current} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

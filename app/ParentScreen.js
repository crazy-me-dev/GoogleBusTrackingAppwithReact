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

    const dataSource = new ListView.DataSource({ rowHasChanged: this.rowHasChanged });
    const startLocation = { latitude: 39.7684, longitude: -86.1581 };
    this.state = {
      region: {
        latitude: 39.7684,
        longitude: -86.1581,
        latitudeDelta: .5,
        longitudeDelta: .5,
      },
      dataSource,
      locations: [startLocation],
      current: startLocation,
      locationRows: dataSource.cloneWithRows([startLocation])
    };
    this.setUpWebSocket();
  }

  setUpWebSocket() {
    this.websocket = new WebSocket('ws://192.168.0.178:3000');
    this.websocket.onopen = () => {
      // connection opened
      this.websocket.send(JSON.stringify({
        method: 'subscribe',
        locationID: '123',
      }));
      console.log('connected my person');
    };
    this.websocket.onmessage = (message) => {
      let data = JSON.parse(message.data);
      if (data.method === 'LatestLocation') {
        const newLocations = this.state.locations.slice(0);
        newLocations.push({ latitude: data.latitude, longitude: data.longitude });
        this.setState({
          region: {
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: .5,
            longitudeDelta: .5,
          },
          locations: newLocations,
          current: { latitude: data.latitude, longitude: data.longitude },
          locationRows: this.state.dataSource.cloneWithRows(newLocations)
        });
      }
    };
  }

  componentWillMount() { }

  onRegionChange(region) {
    this.setState({ region });
  }

  rowHasChanged = (row1, row2) => row1 !== row2

  renderRow(location) {
    return <Text>Latitude: {location.latitude} Longitude: {location.longitude}</Text>
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

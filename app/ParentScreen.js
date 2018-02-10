import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

export default class ParentScreen extends React.Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({ rowHasChanged: this.rowHasChanged });
    const testLocationArray = [{ latitude: 39.7684, longitude: -86.1581 }];
    this.state = {
      region: {
        latitude: 39.7684,
        longitude: -86.1581,
        latitudeDelta: .5,
        longitudeDelta: .5,
      },
      dataSource,
      locations: testLocationArray,
      current: testLocationArray[testLocationArray.length - 1],
      locationRows: dataSource.cloneWithRows(testLocationArray)
    };
    let ws = new WebSocket('ws://192.168.0.178:3000');
    ws.onopen = () => {
      // connection opened
      console.log('connected my person');
    };
    ws.onmessage = (message) => {
      const location = JSON.parse(message.data);
      const newLocations = this.state.locations.slice(0);
      newLocations.push(location);
      this.setState({
        region: {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: .5,
          longitudeDelta: .5,
        },
        locations: newLocations,
        current: location,
        locationRows: this.state.dataSource.cloneWithRows(newLocations)
      });
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

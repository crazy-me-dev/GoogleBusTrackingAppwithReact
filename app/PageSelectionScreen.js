import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class PageSelectionScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('ParentSelectScreen')}>
          <Text>I am a Rider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('DriverScreen')}>
          <Text>I am a Driver</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    width: 150,
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
});

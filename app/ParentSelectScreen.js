import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class PageSelectionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: '' };
  }

  onButtonPress() {
    this.props.navigation.navigate('ParentScreen', {
      locationID: this.state.text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ width: 100, height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onButtonPress.bind(this)}>
          <Text>Subscribe</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    width: 100,
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
});

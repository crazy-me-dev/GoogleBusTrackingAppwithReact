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
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    margin: 10
  },
});

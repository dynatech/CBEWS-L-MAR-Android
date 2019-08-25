import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, TextInput } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';

export default class DataSyncScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.brand]}>Synchronize Data from your phone to the Local Server</Text>
        <View style={{ paddingTop: '10%'}}>
          <TouchableOpacity style={ButtonStyle.large}>
            <Text style={ButtonStyle.large_text}>Community Risk Assessment</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: '10%'}}>
          <TouchableOpacity style={ButtonStyle.large}>
            <Text style={ButtonStyle.large_text}>Ground data</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: '10%'}}>
          <TouchableOpacity style={ButtonStyle.large}>
            <Text style={ButtonStyle.large_text}>Maintenance</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';

export default class AlertValidationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.branding]}>Alert level: 1</Text>
        <Text style={[LabelStyle.large_label, LabelStyle.branding]}>Trigger: Rainfall</Text>
        <Text style={[LabelStyle.large_label, LabelStyle.branding]}>Data Source: RAIN_BLCSB (1.18km away)</Text>
        <Text style={[LabelStyle.large_label, LabelStyle.branding]}>Description: 1-day cumulative rainfall (57.65mm) exceeded threshold level (68.19mm)</Text>
        <View style={{ paddingTop: '10%', justifyContent: 'center', flexDirection: 'row', flex: 0.2}}>
          <TouchableOpacity style={[ButtonStyle.small]}>
              <Text style={ButtonStyle.medium_text}>Valid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ButtonStyle.small]}>
              <Text style={ButtonStyle.medium_text}>Invalid</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

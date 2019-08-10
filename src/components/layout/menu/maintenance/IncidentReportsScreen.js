import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';

export default class IncidentReportsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={ContainerStyle.content}>
        <Calendar></Calendar>
      </View>
    );
  }
}

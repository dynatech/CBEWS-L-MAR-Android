import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';

export default class MaintenanceLogsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modification_view: []
    };
  }


  addLog(day) {
    this.renderModification()
  }

  renderModification() {
    let view = [
      <View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Type of Maintenance Activity</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
        </View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Remarks</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
        </View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>In-charge</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
        </View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Updater</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
        </View>
        <View style={{ paddingTop: '10%', alignItems: 'center' }}>
          <TouchableOpacity style={ButtonStyle.medium}>
            <Text style={ButtonStyle.large_text}>Add +</Text>
          </TouchableOpacity>
        </View>
      </View>
    ]
    this.setState({ modification_view: view })
  }

  render() {
    return (
      <ScrollView>
        <View style={ContainerStyle.content}>
          <Calendar onDayPress={(day) => { this.addLog(day.dateString) }}></Calendar>
          <View>
            <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Click date to add log.</Text>
          </View>
          {this.state.modification_view}
        </View>
      </ScrollView>
    );
  }
}

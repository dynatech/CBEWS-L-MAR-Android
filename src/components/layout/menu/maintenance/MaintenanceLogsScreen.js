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
      modification_view: [],
      logs_view: [],
      logs_container: {},
      toma: "",
      remarks: "",
      incharge: "",
      updater: "",
      selected_date: ""
    };
  }


  addLog(day) {
    this.setState({selected_date: day})
    this.renderModification();
    this.renderLogView(day);
  }

  saveLog() {
    let date = this.state.selected_date
    let {toma, remarks, incharge, updater} = this.state
    let temp = [toma, remarks, incharge, updater]
    let temp_container = this.state.logs_container
    console.log(date)
    temp_container[date] = temp
    this.setState({logs_container: temp_container})
    console.log(this.state.logs_container)
  }

  renderLogView(day) {
    let view = [];
    if (this.state.logs_container[day] == null || this.state.logs_container[day] == undefined) {
      view = [
        <View>
          <View style={ContainerStyle.hr}></View>
          <View style={ContainerStyle.content}>
            <Text style={LabelStyle.medium_label}>No activity recorded.</Text>
          </View>
        </View>

      ];
    } else {
      console.log(this.state.logs_container);
      let {toma, remarks, incharge, updater} = this.state
      view = [
        <View>
          <View style={ContainerStyle.hr}></View>
          <View style={ContainerStyle.content}>
            <Text style={LabelStyle.medium_label}>Type of Maintenance Activity: {toma}</Text>
            <Text style={LabelStyle.medium_label}>Remarks: {remarks}</Text>
            <Text style={LabelStyle.medium_label}>In-charge: {incharge}</Text>
            <Text style={LabelStyle.medium_label}>Updater: {updater}</Text>
          </View>
        </View>
      ];
    }
    this.setState({logs_view: view})
  }

  renderModification() {
    let view = [
      <View>
        <View style={ContainerStyle.hr}></View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Type of Maintenance Activity</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => this.setState({ toma: text })}></TextInput>
        </View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Remarks</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => this.setState({ remarks: text })}></TextInput>
        </View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>In-charge</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => this.setState({ incharge: text })}></TextInput>
        </View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Updater</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => this.setState({ updater: text })}></TextInput>
        </View>
        <View style={{ paddingTop: '10%', alignItems: 'center' }}>
          <TouchableOpacity style={ButtonStyle.medium} onPress={()=> this.saveLog()}>
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
          {this.state.logs_view}
          {this.state.modification_view}
        </View>
      </ScrollView>
    );
  }
}

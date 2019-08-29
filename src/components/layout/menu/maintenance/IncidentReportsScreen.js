import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import DatePicker from 'react-native-datepicker';

export default class IncidentReportsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modification_view: [],
      logs_view: [],
      logs_container: {},
      datetime: "",
      incident: "",
      reporter: "",
      selected_date: "",
      marked_dates: {}
    };
  }

  addLog(day) {
    this.setState({selected_date: day})
    this.renderModification();
    this.renderLogView(day);
  }

  saveLog() {
    let date = this.state.selected_date
    let {datetime, incident, reporter} = this.state
    let temp = [datetime, incident, reporter]
    let temp_container = this.state.logs_container
    temp_container[date] = temp
    this.setState({logs_container: temp_container})
    let temp_marked_dates = this.state.marked_dates;
    temp_marked_dates.push({date: {date, marked: true}})
    this.setState({marked_dates: temp_marked_dates});
    ToastAndroid.show("Successfully added a new log!.", ToastAndroid.LONG);
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
      let {datetime, incident, reporter} = this.state
      view = [
        <View>
          <View style={ContainerStyle.hr}></View>
          <View style={ContainerStyle.content}>
            <Text style={LabelStyle.medium_label}>Date of incident: {datetime}</Text>
            <Text style={LabelStyle.medium_label}>Incident Description/Narrative: {incident}</Text>
            <Text style={LabelStyle.medium_label}>Reporter: {reporter}</Text>
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
          <Text style={LabelStyle.medium_label}>Date of incident</Text>
          <DatePicker
                customStyles={{ dateInput: { borderWidth: 0} }}
                style={[InputStyle.medium, { width: '94%' }, InputStyle.default, InputStyle.black]}
                date={this.state.datetime}
                mode="datetime"
                placeholder="Pick date and time"
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(date) => { this.setState({ datetime: date }) }}
              />
        </View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Incident Description/Narrative</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
        </View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Reporter</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
        </View>
        <View style={{ paddingTop: '10%', alignItems: 'center' }}>
          <TouchableOpacity style={ButtonStyle.medium} onPress={()=> {this.saveLog()}}>
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
          <Calendar markedDates={this.state.marked_dates} onDayPress={(day) => { this.addLog(day.dateString) }}></Calendar>
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

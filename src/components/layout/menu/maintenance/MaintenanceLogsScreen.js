import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
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
      selected_date: "",
      marked_dates: {
        '2019-09-01': {selected: true},
        '2019-09-02': {selected: true},
        '2019-09-03': {selected: true},
        '2019-09-04': {selected: true}
      },
      calendar: []
    };
  }

  componentDidMount() {
    let initial_data = [
      ['2019-09-01', 'Pinalitan ang rain gauge', 'John Geliberte', 'David Guevarra'],
      ['2019-09-02', 'Pinalitan ang data logger', 'David Guevarra', 'David Guevarra'],
      ['2019-09-03', 'Pinalitan ang SD Card', 'David Guevarra', 'John Geliberte'],
      ['2019-09-04', 'Pinalitan ulit ang rain gauge', 'John Geliberte', 'David Guevarra']
    ]

    initial_data.forEach(element => {
      let temp_container = this.state.logs_container
      temp_container[element[0]] = element
      this.setState({logs_container: temp_container})
    });
    this.renderCalendar();
  }

  renderCalendar() {
    this.setState({calendar: []})
    this.setState({calendar: [<Calendar markedDates={this.state.marked_dates} onDayPress={(day) => { this.addLog(day.dateString) }}></Calendar>]})
    console.log(this.state.marked_dates)
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
    temp_container[date] = temp
    this.setState({logs_container: temp_container})
    ToastAndroid.show("Successfully added a new log!.", ToastAndroid.LONG);

    let temp_marked_dates = this.state.marked_dates;
    temp_marked_dates[date] = {selected: true}
    this.setState({marked_dates: temp_marked_dates});
    this.renderCalendar();
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
      let temp_data = this.state.logs_container
      let data = temp_data[day]
      let toma = data[0]
      let remarks = data[1]
      let incharge = data[2]
      let updater = data[3]
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
          {this.state.calendar}
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

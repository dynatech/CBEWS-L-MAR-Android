import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { DataTable } from 'react-native-paper';

export default class ODMonitoringScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datatable_row: [],
      command_view: [],
      datetime: "2018-08-16 13:00:00",
      reporter: "David Guevarra",
      rfmr: "Malakas na ulan ang di umano'y tumangay sa marker sa may baryo",
      attachments: "N/A"
    };
  }

  componentDidMount() {
    let temp_row = [];
    let { datetime, reporter, rfmr, attachments } = this.state;
    let temp_data = this.state
    temp_row.push(
      <DataTable.Row onPress={() => {
        this.selectCell(temp_data)
      }} onLongPress={()=> {this.validateOD(temp_data)}}>
        <DataTable.Cell style={{ width: 150 }}>{datetime}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{reporter}</DataTable.Cell>
        <DataTable.Cell style={{ width: 200 }}>{rfmr}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{attachments}</DataTable.Cell>
      </DataTable.Row>
    )
    this.resetState()
    this.setState({ datatable_row: temp_row })
    this.addVisible()
  }
  
  resetState() {
    this.setState({
      datetime: "",
      reporter: "",
      rfmr: "",
      attachments: ""
    })
  }

  selectCell(data) {
    let { datetime, reporter, rfmr, attachments } = data;

    this.setState({
      datetime: datetime,
      reporter: reporter,
      rfmr: rfmr,
      attachments: attachments
    });
    this.modifyVisible();
  }

  validateOD(data) {
    Alert.alert(
      'Notice',
      'Are you sure you want to raise this as an alert?',
      [ 
        {text: 'Cancel', onPress: () => {console.log("Cancelled")}},
        {text: 'Alert 1', onPress: ()=>  ToastAndroid.show("Alert 1 Raised!", ToastAndroid.SHORT)}
      ]
    )
  }

  addODMonitoring() {
    let { datetime, reporter, rfmr, attachments } = this.state;
    let temp_row = []
    let temp_data = this.state
    temp_row.push(this.state.datatable_row)
    temp_row.push(
      <DataTable.Row onPress={() => {
        this.selectCell(temp_data)
      }} onLongPress={()=> {this.validateOD(temp_data)}}>
        <DataTable.Cell style={{ width: 150 }}>{datetime}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{reporter}</DataTable.Cell>
        <DataTable.Cell style={{ width: 200 }}>{rfmr}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{attachments}</DataTable.Cell>
      </DataTable.Row>
    )
    this.setState({ datatable_row: temp_row })
    ToastAndroid.show("Successfully added On-demand Monitoring!", ToastAndroid.LONG)
  }

  addVisible() {
    this.setState({
      command_view: [
        <View style={{ paddingTop: '10%', alignItems: 'center' }}>
          <TouchableOpacity style={ButtonStyle.medium} onPress={() => { this.addODMonitoring() }}>
            <Text style={ButtonStyle.large_text}>Add +</Text>
          </TouchableOpacity>
        </View>
      ]
    })
  }

  modifyVisible() {
    this.setState({
      command_view: [
        <View style={{ paddingTop: '10%', alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { this.updateODMonitoring() }}>
            <Text style={ButtonStyle.medium_text}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { this.deleteODMonitoring() }}>
            <Text style={ButtonStyle.medium_text}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { this.cancelModification() }}>
            <Text style={ButtonStyle.medium_text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ]
    })
  }

  cancelModification() {
    this.addVisible()
    this.resetState()
  }

  updateODMonitoring(data) {
    Alert.alert(
      'Notice',
      'Are you sure you want to update this entry?',
      [
        {text: 'No', onPress: ()=> {console.log("Cancelled")},style: 'cancel'},
        {text: 'Yes', onPress: () => ToastAndroid.show("Data up to date!", ToastAndroid.SHORT)}
      ]
    )
  }

  deleteODMonitoring() {
    Alert.alert(
      'Notice',
      'Are you sure you want to delete this entry?',
      [
        {text: 'No', onPress: ()=> {console.log("Cancelled")},style: 'cancel'},
        {text: 'Yes', onPress: () => ToastAndroid.show("Successfully deleted!", ToastAndroid.SHORT)}
      ]
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={ContainerStyle.content}>
          <View style={ContainerStyle.datatable_content}>
            <ScrollView horizontal={true}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={{ width: 150 }}>Date and Time</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>Reporter</DataTable.Title>
                  <DataTable.Title style={{ width: 200 }}>Reason for monitoring request</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>Attachments</DataTable.Title>
                </DataTable.Header>
                {this.state.datatable_row}
              </DataTable>
            </ScrollView>
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={(page) => { console.log(page); }}
              label="1-2 of 6"
            />
          </View>
          <View>
            <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Tap row to modify.</Text>
            <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Tap and hold row to raise as alert.</Text>
          </View>
          <View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Date and Time</Text>
              <DatePicker
                customStyles={{ dateInput: { borderWidth: 0, } }}
                style={[InputStyle.medium, { width: '94%'}, InputStyle.default, InputStyle.black]}
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
              <Text style={LabelStyle.medium_label}>Reporter</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={this.state.reporter} onChangeText={text => this.setState({ reporter: text })}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Reason for monitoring request</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={this.state.rfmr} onChangeText={text => this.setState({ rfmr: text })}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Description</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={this.state.description} onChangeText={text => this.setState({ description: text })}></TextInput>
            </View>
            {this.state.command_view}
          </View>
        </View>
      </ScrollView>
    );
  }
}

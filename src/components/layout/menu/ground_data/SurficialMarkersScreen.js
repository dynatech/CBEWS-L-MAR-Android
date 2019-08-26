import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { DataTable } from 'react-native-paper';

export default class SurficialMarkersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datatable_row: [],
      command_view: [],
      datetime: "2019-08-16 13:00:00",
      a: "172cm",
      b: "120cm",
      c: "130cm",
      weather: "Makulimlim",
      nagsukat: "John Geliberte"
    };
  }
  
  componentDidMount() {
    let temp_row = [];
    let { datetime, a, b, c,
      weather, nagsukat} = this.state;
    let temp_data = this.state
    temp_row.push(
      <DataTable.Row onPress={() => {
        this.selectCell(temp_data)
      }}>
        <DataTable.Cell style={{ width: 150 }}>{datetime}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{a}</DataTable.Cell>
        <DataTable.Cell style={{ width: 200 }}>{b}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{c}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{weather}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{nagsukat}</DataTable.Cell>
      </DataTable.Row>
    )
    this.resetState()
    this.setState({ datatable_row: temp_row })
    this.addVisible()
  }
  
  resetState() {
    this.setState({
      datetime: "",
      a: "",
      b: "",
      c: "",
      weather: "",
      nagsukat: ""
    })
  }

  selectCell(data) {
    let { datetime, a, b, c,
      weather, nagsukat} = data;

    this.setState({
      datetime: datetime,
      a: a,
      b: b,
      c: c,
      weather: weather,
      nagsukat: nagsukat
    });
    this.modifyVisible();
  }

  addSurficialMeasurement() {
    let { datetime, a, b, c,
      weather, nagsukat} = this.state;
    let temp_row = []
    let temp_data = this.state
    temp_row.push(this.state.datatable_row)
    temp_row.push(
      <DataTable.Row onPress={() => {
        this.selectCell(temp_data)
      }} onLongPress={()=> {this.validateMoMs(temp_data)}}>
        <DataTable.Cell style={{ width: 150 }}>{datetime}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{a}</DataTable.Cell>
        <DataTable.Cell style={{ width: 200 }}>{b}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{c}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{weather}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{nagsukat}</DataTable.Cell>
      </DataTable.Row>
    )
    this.setState({ datatable_row: temp_row })
  }

  addVisible() {
    this.setState({
      command_view: [
        <View style={{ paddingTop: '10%', alignItems: 'center' }}>
          <TouchableOpacity style={ButtonStyle.medium} onPress={() => { this.addSurficialMeasurement() }}>
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
          <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { this.updateSurficialMeasurement() }}>
            <Text style={ButtonStyle.medium_text}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { this.deleteSurficialMeasurement() }}>
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

  updateSurficialMeasurement(data) {
    Alert.alert(
      'Notice',
      'Are you sure you want to update this entry?',
      [
        {text: 'No', onPress: ()=> {console.log("Cancelled")},style: 'cancel'},
        {text: 'Yes', onPress: () => ToastAndroid.show("Data up to date!", ToastAndroid.SHORT)}
      ]
    )
  }

  deleteSurficialMeasurement() {
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
                  <DataTable.Title style={{ width: 150 }}>Date</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>A</DataTable.Title>
                  <DataTable.Title style={{ width: 200 }}>B</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>C</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>Weather</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>Nagsukat</DataTable.Title>
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
            <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Click row to modify.</Text>
          </View>
          <View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Date</Text>
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
              <Text style={LabelStyle.medium_label}>A</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={this.state.a}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>B</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={this.state.b}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>C</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={this.state.c}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Weather</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={this.state.weather}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Nagsukat</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={this.state.nagsukat}></TextInput>
            </View>
            {this.state.command_view}
          </View>
        </View>
      </ScrollView>
    );
  }
}

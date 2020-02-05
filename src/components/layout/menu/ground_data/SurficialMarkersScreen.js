import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { DataTable } from 'react-native-paper';
import SmsToggle from '../../../../reducers/SmsToggle';
import moment from "moment";
import AppConfig from '../../../../reducers/AppConfig';
import Storage from '../../../../reducers/Storage';

function SurficialMarkersScreen() {
  const [datetime, setDatetime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [weather, setWeather] = useState();
  const [observer, setObserver] = useState();

  const [markers, setMarkers] = useState([]);
  const [surficial, setSurficial] = useState([]);

  const [markerFields, setMarkerFields] = useState([]);
  const [markerValue, setMarkerValue] = useState({});
  const [dtHeader, setDtHeader] = useState([]);
  const [dtBody, setDtBody] = useState([]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    initSurficialMarkers();
  }, [])

  const initSurficialMarkers = () => {
    fetch(`${AppConfig.HOSTNAME}/api/ground_data/surficial_markers/fetch/29`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        let temp_dtBody = [];
        let temp_dtHeader = [];
        let temp_pages = parseInt(responseJson.data.length / 10)
        let counter = 0;
        responseJson.markers.forEach(row_marker => {
          temp_dtHeader.push(
            <DataTable.Title style={{ width: 150 }}>{row_marker[0].toUpperCase()}</DataTable.Title>
          );
        });
        
        if ((responseJson.data.length % 10) != 0) {
          temp_pages = temp_pages+1;
        }
        
        temp_dtHeader.push(<DataTable.Title key={"date"} style={{ width: 150 }}>Nagsukat</DataTable.Title>,
          <DataTable.Title key={"weather"} style={{ width: 150 }}>Date</DataTable.Title>,
          <DataTable.Title key={"nagsukat"} style={{ width: 150 }}>Weather</DataTable.Title>)

        responseJson.data.forEach(row => {
          let obj_data = Object.values(row)
          let actual_data = Object.values(obj_data[0])
          let temp_data_row = []

          actual_data.forEach(element => {
            temp_data_row.push(<DataTable.Cell key={element} style={{ width: 150 }}>{element}</DataTable.Cell>)
          });

          temp_dtBody.push(
            <DataTable.Row onPress={() => {
              selectCell(obj_data[0])
            }}>
              {temp_data_row}
            </DataTable.Row>
          );
        });

        setDtHeader(temp_dtHeader);
        setSurficial(responseJson.data);
        setPages(temp_pages);
        setDtBody(temp_dtBody)
        initializeFields(responseJson.markers);
      })
      .catch((error) => {
        console.log(error)
      }
      );
  }

  const addNewMarker = (marker) => {
    let temp = markers;
    temp.push(marker);
    setMarkers(temp);
  }

  const onChangeMarkerValue = (value, marker) => {
    let value_change = markerValue
    value_change[marker] = value;
    setMarkerValue(value_change)
  }

  const initializeFields = (markers_data) => {
    let temp_marker_field = [];
    markers_data.forEach((element) => {
      let marker = element[0];
      addNewMarker(marker)
      temp_marker_field.push(
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Marker: {marker}</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => { onChangeMarkerValue(text, marker) }}></TextInput>
        </View>)
    })
    setMarkerFields(temp_marker_field)
  }

  const changePage = (raw_page) => {
    setPage(raw_page)
  }

  const resetState = () => {
    this.setState({
      datetime: "",
      a: "",
      b: "",
      c: "",
      weather: "",
      nagsukat: ""
    })
  }

  const sendMeasurement = (data) => {
    let { datetime, a, b, c,
      weather, nagsukat } = this.state;

    let measurement_template = "MAR ROUTINE " + datetime + " " + a + " " + b + " " + c + " " + weather + " " + nagsukat;
    SmsToggle.OPEN_SMSAPP(measurement_template)
  }

  const selectCell = (data) => {
    console.log(data)
  }

  const addSurficialMeasurement = () => {
    let temp_row = []
    let temp_data = this.state
    temp_row.push(this.state.datatable_row)
    temp_row.push(
      <DataTable.Row onPress={() => {
        this.selectCell(temp_data)
      }} onLongPress={() => { this.validateMoMs(temp_data) }}>
        <DataTable.Cell style={{ width: 150 }}>{datetime}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{a}</DataTable.Cell>
        <DataTable.Cell style={{ width: 200 }}>{b}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{c}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{weather}</DataTable.Cell>
        <DataTable.Cell style={{ width: 150 }}>{nagsukat}</DataTable.Cell>
      </DataTable.Row>
    )
    this.setState({ datatable_row: temp_row })
    ToastAndroid.show("Successfully added new Surficial Measurement!", ToastAndroid.LONG)
  }

  const addVisible = () => {
    this.setState({
      command_view: [

      ]
    })
  }

  const modifyVisible = () => {

  }


  const cancelModification = () => {
    this.addVisible()
    this.resetState()
  }

  const updateSurficialMeasurement = (data) => {
    Alert.alert(
      'Notice',
      'Are you sure you want to update this entry?',
      [
        { text: 'No', onPress: () => { console.log("Cancelled") }, style: 'cancel' },
        { text: 'Yes', onPress: () => ToastAndroid.show("Data up to date!", ToastAndroid.LONG) }
      ]
    )
  }

  const deleteSurficialMeasurement = () => {
    Alert.alert(
      'Notice',
      'Are you sure you want to delete this entry?',
      [
        { text: 'No', onPress: () => { console.log("Cancelled") }, style: 'cancel' },
        { text: 'Yes', onPress: () => ToastAndroid.show("Successfully deleted!", ToastAndroid.LONG) }
      ]
    )
  }

  return (
    <Fragment>
      <ScrollView>
        <View style={ContainerStyle.content}>
          <View style={ContainerStyle.datatable_content}>
            <ScrollView horizontal={true}>
              <DataTable>
                <DataTable.Header>
                  {dtHeader}
                </DataTable.Header>
                {dtBody}
              </DataTable>
            </ScrollView>
            <DataTable.Pagination
              page={page}
              numberOfPages={pages}
              onPageChange={(page) => { changePage(page) }}
              label={`Page ${page} of ${pages}`}
            />
          </View>
          <View>
            <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Tap row to modify.</Text>
          </View>
          <View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Date</Text>
              <DatePicker
                customStyles={{ dateInput: { borderWidth: 0, } }}
                style={[InputStyle.medium, { width: '94%' }, InputStyle.default, InputStyle.black]}
                date={datetime}
                mode="datetime"
                placeholder="Pick date and time"
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(date) => { setDatetime(date) }}
              />
            </View>

            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Weather</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={weather} onChangeText={text => { console.log(markerValue); setWeather(text) }}></TextInput>
            </View>

            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Nagsukat</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={observer} onChangeText={text => { setObserver(text) }}></TextInput>
            </View>
            {
              markerFields
            }
            {
              isModify ?
                <View>
                  <View style={{ paddingTop: '10%', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { updateSurficialMeasurement() }}>
                      <Text style={ButtonStyle.medium_text}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { deleteSurficialMeasurement() }}>
                      <Text style={ButtonStyle.medium_text}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { cancelModification() }}>
                      <Text style={ButtonStyle.medium_text}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingTop: '10%', alignItems: 'center' }}>
                    <TouchableOpacity style={ButtonStyle.medium} onPress={() => { sendMeasurement() }}>
                      <Text style={ButtonStyle.medium_text}>Send Measurement</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                :
                <View style={{ paddingTop: '10%', alignItems: 'center' }}>
                  <TouchableOpacity style={ButtonStyle.medium} onPress={() => { addSurficialMeasurement() }}>
                    <Text style={ButtonStyle.large_text}>Add +</Text>
                  </TouchableOpacity>
                </View>
            }
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}

export default SurficialMarkersScreen
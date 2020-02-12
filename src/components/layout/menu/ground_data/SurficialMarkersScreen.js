import React, { useState, useEffect, useRef, Fragment } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native';
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
  const [weather, setWeather] = useState("");
  const [observer, setObserver] = useState("");

  const [markers, setMarkers] = useState([]);
  const [surficial, setSurficial] = useState([]);

  const [markerFields, setMarkerFields] = useState([]);
  const [markerValue, setMarkerValue] = useState({});
  const markerValueRef = useRef();
  const markerValueTsRef = useRef();

  const [dtHeader, setDtHeader] = useState([]);
  const [dtBody, setDtBody] = useState([]);

  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);

  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    initSurficialMarkers();
  }, [])

  const initSurficialMarkers = (dt_row = 0) => {
    fetch(`${AppConfig.HOSTNAME}/api/ground_data/surficial_markers/fetch/29`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => {  
        let temp_dtHeader = [];
        let temp_pages = parseInt(responseJson.data.length / 10)
        responseJson.markers.forEach(row_marker => {
          temp_dtHeader.push(
            <DataTable.Title key={row_marker[0]} style={{ width: 150 }}>{row_marker[1].toUpperCase()}</DataTable.Title>
          );
        });
        
        if ((responseJson.data.length % 10) != 0) {
          temp_pages = temp_pages+1;
        }
        
        temp_dtHeader.push(<DataTable.Title key={"date"} style={{ width: 150 }}>Nagsukat</DataTable.Title>,
          <DataTable.Title key={"weather"} style={{ width: 150 }}>Date</DataTable.Title>,
          <DataTable.Title key={"nagsukat"} style={{ width: 150 }}>Weather</DataTable.Title>)
        setDtHeader(temp_dtHeader);
        setSurficial(responseJson.data);
        setPages(temp_pages);
        initializeFields(responseJson.markers);
        constructDtBody(responseJson.data, dt_row)
      })
      .catch((error) => {
        console.log(error)
      }
      );
  }

  const constructDtBody = (data, dt_row) => {
    let temp_dtBody = [];
    let surficial_row = data.slice(dt_row, dt_row+10);
    let key_counter = 0;
    surficial_row.forEach(row => {
      let obj_data = Object.values(row)
      let actual_data = Object.values(obj_data[0])
      let temp_data_row = []

      actual_data.forEach(element => {
        temp_data_row.push(<DataTable.Cell key={key_counter}style={{ width: 150 }}>{element}</DataTable.Cell>)
          key_counter++;
        });

      temp_dtBody.push(
        <DataTable.Row onPress={() => {
          selectCell(obj_data[0])
        }}>
          {temp_data_row}
        </DataTable.Row>
      );
    });
    setDtBody(temp_dtBody)
  }

  const addNewMarker = (marker) => {
    if (markers.length == 0){
      let temp = markers;
      temp.push(marker);
      setMarkers(temp);
    }
  }

  const onChangeMarkerValue = (value, marker) => {
    let value_change = markerValue;
    value_change[marker] = value;
    setMarkerValue(value_change);
  }

  const initializeFields = (markers_data) => {    
    let temp_marker_field = [];
    markers_data.forEach((element) => {
      let marker = element[1];
      temp_marker_field.push(
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Marker: {marker}</Text>
          <TextInput key={element[0]} style={[InputStyle.medium, InputStyle.default, InputStyle.black]} keyboardType={'numeric'} onChangeText={text => { onChangeMarkerValue(text, marker) }}></TextInput>
        </View>)
    })
    setMarkerFields(temp_marker_field)
  }

  const constructFields = (value) => {
    let temp_marker_field = [];
    Object.keys(value).forEach((element) => {
      temp_marker_field.push(
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Marker: {element}</Text>
          <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} keyboardType={'numeric'} onChangeText={text => { onChangeMarkerValue(text, element) }}>{value[element]}</TextInput>
        </View>)
    })
    setMarkerFields(temp_marker_field)
  }

  const changePage = (raw_page) => {
    setPage(raw_page);
    constructDtBody(surficial, raw_page * 10);
  }

  const resetState = () => {
    setDatetime(moment().format('YYYY-MM-DD HH:mm:ss'))
    setWeather("")
    setObserver("")
    setMarkers([])
    setSurficial([])
    setMarkerFields([])
    setMarkerValue({})
    markerValueRef.current = ""
    markerValueTsRef.current = ""
    setPage(0)
    setPages([])
    setIsModify(false)
    setDtHeader([])
    setDtBody([])
  }

  const sendMeasurement = (data) => {
    let { datetime, a, b, c,
      weather, nagsukat } = this.state;

    let measurement_template = "MAR ROUTINE " + datetime + " " + a + " " + b + " " + c + " " + weather + " " + nagsukat;
    SmsToggle.OPEN_SMSAPP(measurement_template)
  }

  const selectCell = (data) => {
    let temp_data = {...data}
    setMarkerFields([]);
    setIsModify(true);
    setDatetime(moment(data.ts).format('YYYY-MM-DD HH:mm:ss'));
    setWeather(data.weather);
    setObserver(data.observer);
    markerValueTsRef.current = data.ts;
    delete temp_data.weather;
    delete temp_data.observer;
    delete temp_data.ts;
    setMarkerValue(temp_data);
    markerValueRef.current = temp_data;
    constructFields(temp_data);
  }

  const addSurficialMeasurement = () => {
    if (weather.length != 0 && observer.length != 0 &&
        Object.keys(markerValue).length != 0) {
          Alert.alert(
            'Notice',
            'Are you sure you want to add a new surficial entry?',
            [
              { text: 'No', onPress: () => { console.log("Cancelled") }, style: 'cancel' },
              { text: 'Yes', onPress: () => { 
                fetch(`${AppConfig.HOSTNAME}/api/ground_data/surficial_markers/add`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    "ts": datetime,
                    "weather": weather,
                    "observer": observer,
                    "marker_value": markerValue,
                    "site_id": 29
                  }),
                }).then((response) => response.json())
                  .then((responseJson) => {
                    if (responseJson.status == true) {
                      ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
                      initSurficialMarkers();
                      resetState();
                    } else {
                      ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  }
                );

              }}
            ]
          )
    } else {
      ToastAndroid.show("All fields are required.", ToastAndroid.LONG);
    }
  }

  const cancelModification = () => {
    resetState();
  }

  const updateSurficialMeasurement = () => {
    Alert.alert(
      'Notice',
      'Are you sure you want to update this entry?',
      [
        { text: 'No', onPress: () => { console.log("Cancelled") }, style: 'cancel' },
        { text: 'Yes', onPress: () => {
          let new_marker_values = markerValueRef.current;
          new_marker_values = {...new_marker_values, ...markerValue};
          let request = {
            "site_id": 29,
            "ref_ts": markerValueTsRef.current,
            "new_ts": datetime,
            "weather": weather,
            "observer": observer,
            "marker_values": new_marker_values
          }
          fetch(`${AppConfig.HOSTNAME}/api/ground_data/surficial_markers/modify`, {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
          }).then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.status == true) {
                ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
                initSurficialMarkers();
                resetState();
              } else {
                ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
              }
            })
            .catch((error) => {
              console.log(error)
            }
          );
        }}
      ]
    )
  }

  const deleteSurficialMeasurement = () => {
    Alert.alert(
      'Notice',
      'Are you sure you want to delete this entry?',
      [
        { text: 'No', onPress: () => { console.log("Cancelled") }, style: 'cancel' },
        { text: 'Yes', onPress: () => {
          fetch(`${AppConfig.HOSTNAME}/api/ground_data/surficial_markers/remove`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "datetime": datetime,
              "weather": weather,
              "observer": observer,
              "marker_value": markerValue,
              "site_id": 29
            }),
          }).then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.status == true) {
                ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
                initSurficialMarkers();
                resetState();
              } else {
                ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
              }
            })
            .catch((error) => {
              console.log(error);
            }
          );
        } }
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
              label={`Page ${page} of ${pages-1}`}
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
                onDateChange={(date) => { setDatetime(`${date}:00`) }}
              />
            </View>

            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Weather</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={weather} onChangeText={text => { setWeather(text) }}></TextInput>
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
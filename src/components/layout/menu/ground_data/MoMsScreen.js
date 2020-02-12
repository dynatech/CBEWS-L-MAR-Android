import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Picker, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { DataTable } from 'react-native-paper';
import AppConfig from '../../../../reducers/AppConfig';

function MoMsScreen() {

  const [datetime, setDatetime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
  const [featureType, setFeatureType] = useState(9);
  const [featureList, setFeatureList] = useState([]);
  const [reporter, setReporter] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [featureName, setFeatureName] = useState("");
  const [isModify, setModify] = useState(false);
  const [isNew, setNew] = useState(true);
  const [dtRow, setDtRow] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    initializeMoMs();
  }, [])

  const initializeMoMs = () => {
    fetch(`${AppConfig.HOSTNAME}/api/ground_data/moms/fetch/29`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == true) {
          if (responseJson.data.length != 0) {

          } else {
            setDtRow([<View>
              <Text>No data available</Text>
              </View>])
          }
        } else {
          console.log("go here")
          ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        console.log(error)
      }
      );


    // temp_row.push(
    //   <DataTable.Row onPress={() => {
    //     this.selectCell(temp_data)
    //   }} onLongPress={() => { this.validateMoMs(temp_data) }}>
    //     <DataTable.Cell style={{ width: 150 }}>{datetime}</DataTable.Cell>
    //     <DataTable.Cell style={{ width: 150 }}>{feature_type}</DataTable.Cell>
    //     <DataTable.Cell style={{ width: 200 }}>{reporter}</DataTable.Cell>
    //     <DataTable.Cell style={{ width: 150 }}>{description}</DataTable.Cell>
    //     <DataTable.Cell style={{ width: 150 }}>{attachments}</DataTable.Cell>
    //   </DataTable.Row>
    // )
  }

  const resetState = () => {
    setDatetime(moment().format('YYYY-MM-DD HH:mm:ss'))
    setFeatureType(1)
    setReporter("")
    setDescription("")
    setModify(false)
  }

  const selectCell = (data) => {
    let { datetime, feature_type, reporter, description,
      attachments } = data;

    this.setState({
      feature_type: feature_type,
      reporter: reporter,
      description: description,
      attachments: attachments,
      datetime: datetime
    });
    this.modifyVisible();
  }

  const validateMoMs = (data) => {
    Alert.alert(
      'Notice',
      'Are you sure you want to raise this as an alert?',
      [
        { text: 'Cancel', onPress: () => { console.log("Cancelled") } },
        { text: 'Significant Movement', onPress: () => ToastAndroid.show("Alert 2 Raised!", ToastAndroid.LONG) },
        { text: 'Critical Movement', onPress: () => ToastAndroid.show("Alert 3 Raised!", ToastAndroid.LONG) }
      ]
    )
  }

  const addMoMs = () => {
    fetch(`${AppConfig.HOSTNAME}/api/ground_data/moms/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "datetime": datetime,
        "feature_type": featureType,
        "feature_name": featureName,
        "reporter": reporter,
        "description": description,
        "site_id": 29
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson)
        // if (responseJson.status == true) {
        //   ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
        // } else {
        //   ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
        // }
      })
      .catch((error) => {
        console.log(error);
      }
    );

    // 
    // let { datetime, feature_type, reporter, description,
    //   attachments } = this.state;
    // let temp_row = []
    // let temp_data = this.state
    // temp_row.push(this.state.datatable_row)
    // temp_row.push(
    //   <DataTable.Row onPress={() => {
    //     this.selectCell(temp_data)
    //   }} onLongPress={() => { this.validateMoMs(temp_data) }}>
    //     <DataTable.Cell style={{ width: 150 }}>{datetime}</DataTable.Cell>
    //     <DataTable.Cell style={{ width: 150 }}>{feature_type}</DataTable.Cell>
    //     <DataTable.Cell style={{ width: 200 }}>{reporter}</DataTable.Cell>
    //     <DataTable.Cell style={{ width: 150 }}>{description}</DataTable.Cell>
    //     <DataTable.Cell style={{ width: 150 }}>{attachments}</DataTable.Cell>
    //   </DataTable.Row>
    // )
    // this.setState({ datatable_row: temp_row })
    // ToastAndroid.show("Successfully added new Manifestation!", ToastAndroid.LONG)
  }

  const cancelModification = () => {
    resetState()
  }

  const sendMoms = () => {
    // let { datetime, feature_type, reporter, description,
    //   attachments } = this.state;
    // let moms_template = "MAR EVENT" + datetime + " " + feature_type + " " + description + " " + reporter
    // SmsToggle.OPEN_SMSAPP(moms_template)
  }

  const updateMoMs = (data) => {
    Alert.alert(
      'Notice',
      'Are you sure you want to update this entry?',
      [
        { text: 'No', onPress: () => { console.log("Cancelled") }, style: 'cancel' },
        { text: 'Yes', onPress: () => ToastAndroid.show("Data up to date!", ToastAndroid.SHORT) }
      ]
    )
  }

  const deleteMoMs = () => {
    Alert.alert(
      'Notice',
      'Are you sure you want to delete this entry?',
      [
        { text: 'No', onPress: () => { console.log("Cancelled") }, style: 'cancel' },
        { text: 'Yes', onPress: () => ToastAndroid.show("Successfully deleted!", ToastAndroid.SHORT) }
      ]
    )
  }

  const onChangeFeatureType = (feature_type) => {
    setFeatureType(feature_type);
    fetch(`${AppConfig.HOSTNAME}/api/ground_data/moms/fetch/feature/${feature_type}/29`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        // if (responseJson.status == true) {

        // } else {
        //   ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
        // }
      })
      .catch((error) => {
        console.log(error)
      }
      );
    
  }

  return (
    <ScrollView>
      <View style={ContainerStyle.content}>
        <View style={ContainerStyle.datatable_content}>
          <ScrollView horizontal={true}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ width: 150 }}>Date and Time</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>Feature Type</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Reporter</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>Description</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>Attachments</DataTable.Title>
              </DataTable.Header>
              <View>
                <Text style={[LabelStyle.large_label, LabelStyle.brand]}>NO DATA AVAILABLE | NO DATA AVAILABLE | NO DATA AVAILABLE | NO DATA AVAILABLE</Text>
              </View>
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
            <Text style={LabelStyle.medium_label}>Feature Type</Text>
            <View style={[InputStyle.medium, InputStyle.default, InputStyle.black]}>
              <Picker
                selectedValue={featureType}
                onValueChange={(itemValue, itemIndex) => {
                    onChangeFeatureType(itemValue);
                  }
                }>
                <Picker.Item label="Scarp" value="2" />
                <Picker.Item label="Bitak/Crack" value="1" />
                <Picker.Item label="Seepage" value="3" />
                <Picker.Item label="Ponding" value="4" />
                <Picker.Item label="Tilted/Split Trees" value="5" />
                <Picker.Item label="Damaged Structures" value="6" />
                <Picker.Item label="Slop Failure" value="7" />
                <Picker.Item label="Bulging/Depression" value="8" />
                <Picker.Item label="No new manifestation observed" value="9" />
              </Picker>
            </View>
          </View>
          {
            isNew ? <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Feature name</Text>
            <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => setFeatureName(text)}></TextInput>
          </View> :
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Feature Type</Text>
            <View style={[InputStyle.medium, InputStyle.default, InputStyle.black]}>
              <Picker
                selectedValue={featureType}
                onValueChange={(itemValue, itemIndex) => {
                    onChangeFeatureType(itemValue);
                  }
                }>
                <Picker.Item label="Scarp" value="2" />
                <Picker.Item label="Bitak/Crack" value="1" />
                <Picker.Item label="Seepage" value="3" />
                <Picker.Item label="Ponding" value="4" />
                <Picker.Item label="Tilted/Split Trees" value="5" />
                <Picker.Item label="Damaged Structures" value="6" />
                <Picker.Item label="Slop Failure" value="7" />
                <Picker.Item label="Bulging/Depression" value="8" />
                <Picker.Item label="No new manifestation observed" value="9" />
              </Picker>
            </View>
          </View>
          }
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Location</Text>
            <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => setLocation(text)}></TextInput>
          </View>
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Reporter</Text>
            <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => setReporter(text)}></TextInput>
          </View>
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Description</Text>
            <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => setDescription(text)}></TextInput>
          </View>
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Attachments</Text>
            <TextInput editable={false} style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => console.log(text)}>Feature will be available soon</TextInput>
          </View>
          {isModify ? <View>
            <View style={{ paddingTop: '10%', alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { updateMoMs() }}>
                <Text style={ButtonStyle.medium_text}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { deleteMoMs() }}>
                <Text style={ButtonStyle.medium_text}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ButtonStyle.extra_small} onPress={() => { cancelModification() }}>
                <Text style={ButtonStyle.medium_text}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: '10%', alignItems: 'center' }}>
              <TouchableOpacity style={ButtonStyle.medium} onPress={() => { sendMoms() }}>
                <Text style={ButtonStyle.medium_text}>Send MoMs</Text>
              </TouchableOpacity>
            </View>
          </View>:
              <View style={{ paddingTop: '10%', alignItems: 'center' }}>
                <TouchableOpacity style={ButtonStyle.medium} onPress={() => { addMoMs() }}>
                  <Text style={ButtonStyle.large_text}>Add +</Text>
                </TouchableOpacity>
              </View>}
        </View>
      </View>
    </ScrollView>
  );
}

export default MoMsScreen
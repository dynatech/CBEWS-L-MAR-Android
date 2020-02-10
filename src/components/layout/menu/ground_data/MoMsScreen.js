import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Picker, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { DataTable } from 'react-native-paper';
import SmsToggle from '../../../../reducers/SmsToggle'

function MoMsScreen() {

  const [datetime, setDatetime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
  const [featureType, setFeatureType] = useState("scarp");
  const [reporter, setReporter] = useState("");
  const [description, setDescription] = useState("");
  const [isModify, setModify] = useState(false);

  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    initializeMoMs();
  }, [])

  const initializeMoMs = () => {

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
    resetState()
  }

  const resetState = () => {
    setDatetime(moment().format('YYYY-MM-DD HH:mm:ss'))
    setFeatureType([])
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
              {
                // Datatable row
              }
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
                    setFeatureType(itemValue)
                  }
                }>
                <Picker.Item label="Scarp" value="scarp" />
                <Picker.Item label="Bitak/Crack" value="crack" />
                <Picker.Item label="Seepage" value="seepage" />
                <Picker.Item label="Ponding" value="ponding" />
                <Picker.Item label="Tilted/Split Trees" value="tilted" />
                <Picker.Item label="Damaged Structures" value="damaged_structures" />
                <Picker.Item label="Slop Failure" value="slope_failures" />
                <Picker.Item label="Bulging/Depression" value="bulging" />
              </Picker>
            </View>
          </View>
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Reporter</Text>
            <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => console.log(text)}></TextInput>
          </View>
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Description</Text>
            <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => console.log(text)}></TextInput>
          </View>
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Attachments</Text>
            <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => console.log(text)}></TextInput>
          </View>
          {isModify ? 
              <View style={{ paddingTop: '10%', alignItems: 'center' }}>
                <TouchableOpacity style={ButtonStyle.medium} onPress={() => { addMoMs() }}>
                  <Text style={ButtonStyle.large_text}>Add +</Text>
                </TouchableOpacity>
              </View> : <View>
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
            </View>}
        </View>
      </View>
    </ScrollView>
  );
}

export default MoMsScreen
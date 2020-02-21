import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Picker, ToastAndroid } from 'react-native';
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { DataTable } from 'react-native-paper';
import AppConfig from '../../../../reducers/AppConfig';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Storage from '../../../../reducers/Storage';

function MoMsScreen() {

  const [datetime, setDatetime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
  const [featureType, setFeatureType] = useState(9);
  const [featureList, setFeatureList] = useState([]);
  const [moms, setMoms] = useState([]);

  const [reporter, setReporter] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [featureName, setFeatureName] = useState("");

  const [isModify, setModify] = useState(false);
  const [isNewFeatureName, setIsNewFN] = useState(true);
  const [isNew, setNew] = useState(true);
  const [isInputDisabled, setInputDisabled] = useState({});
  const [dtRow, setDtRow] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    initializeMoMs();
  }, [])

  const initializeMoMs = (dt_row = 0) => {
    fetch(`${AppConfig.HOSTNAME}/api/ground_data/moms/fetch/29`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        let moms_container = [];
        let temp_pages = parseInt(responseJson.data.length / 10)
        if (responseJson.status == true) {
          if (responseJson.data.length != 0) {
            responseJson.data.forEach(element => {
              const [feature_id, instance_id, site_id, feature_name, 
                  location, reporter, moms_id, observace_ts, reporter_id,
                  remarks, validator, op_trigger, feature_type, feature_desc] = element
              let temp = {
                "instance_id":instance_id,
                "site_id":site_id,
                "feature_id":feature_id,
                "feature_name":feature_name,
                "location":location,
                "reporter":reporter,
                "moms_id":moms_id,
                "observace_ts":moment(observace_ts).format('YYYY-MM-DD HH:mm:ss'),
                "reporter_id":reporter_id,
                "remarks":remarks,
                "validator":validator,
                "op_trigger":op_trigger,
                "feature_type": feature_type,
                "feature_desc": feature_desc
              }
              moms_container.push(temp)
            });
            
            if ((responseJson.data.length % 10) != 0) {
              temp_pages = temp_pages+1;
            }
            setPages(temp_pages);
            setMoms(moms_container)
            constructDtBody(moms_container, dt_row)
          } else {
            setDtRow(<View>
              <Text style={[LabelStyle.large_label, LabelStyle.brand]}>NO DATA AVAILABLE | NO DATA AVAILABLE | NO DATA AVAILABLE | NO DATA AVAILABLE</Text>
            </View>)
          }
        } else {
          ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
        }
      })
      .catch((error) => {
        console.log(error)
      }
    );
  }

  const resetState = () => {
    setDatetime(moment().format('YYYY-MM-DD HH:mm:ss'))
    setFeatureType(1)
    setReporter("")
    setDescription("")
    setLocation("")
    setModify(false)
  }

  const selectCell = (data) => {
    console.log(data)
  }

  const onPageChange = (raw_page) => {
    setPage(raw_page);
    constructDtBody(moms, raw_page * 10);
  }

  const constructDtBody = (moms, page) => {
    console.log(moms)
    console.log(page)

    let moms_dt = [];
    let key_counter = 0;
    moms.forEach(element => {
      console.log(element)
      // moms_dt.push(
      //   <DataTable.Row onPress={() => {
      //     selectCell(temp)
      //   }}>
      //     <DataTable.Cell key={key_counter+observace_ts} style={{ width: 150 }}>{moment(observace_ts).format('YYYY-MM-DD HH:mm:ss')}</DataTable.Cell>
      //     <DataTable.Cell key={key_counter+feature_type} style={{ width: 150 }}>{feature_type}</DataTable.Cell>
      //     <DataTable.Cell key={key_counter+feature_name} style={{ width: 150 }}>{feature_name}</DataTable.Cell>
      //     <DataTable.Cell key={key_counter+reporter} style={{ width: 150 }}>{reporter}</DataTable.Cell>
      //     <DataTable.Cell key={key_counter+remarks} style={{ width: 150 }}>{remarks}</DataTable.Cell>
      //   </DataTable.Row>
      //   )
      // key_counter++;
      // setDtRow(moms_dt)
    });
    

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
    Storage.getItem('UserCredentials').then(config => {
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
          "location": location,
          "description": description,
          "site_id": 29,
          "user_id": config.user_id
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == true) {
            ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
            initializeMoMs();
          } else {
            ToastAndroid.show(responseJson.message, ToastAndroid.LONG);
          }
          resetState();
        })
        .catch((error) => {
          console.log(error);
        }
      );
    });
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
        if (responseJson.data.length != 0) {
          setNew(false);
          setFeatureList(responseJson.data);
          // Set initial value for MoMs fields
          let initVal = responseJson.data[0];
          setLocation(initVal.location);
          setReporter(initVal.reporter);
          setIsNewFN(false);
          setInputDisabled(InputStyle.disabled)
        } else {
          setInputDisabled({})
          setIsNewFN(true);
          setNew(true);
        }
      })
      .catch((error) => {
        console.log(error)
      }
    );
  }

  const onChangeFeaturename = (instance_id) => {
    if (instance_id != 'new_moms') {
      setFeatureName(instance_id);
      featureList.forEach(element => {
        if (instance_id == element.instance_id) {
          setLocation(element.reporter);
          setReporter(element.location);
        }
      });
    } else {
      setInputDisabled({})
      setNew(true);
      setIsNewFN(true);
    }
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
                <DataTable.Title style={{ width: 150 }}>Feature Name</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>Reporter</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>Description</DataTable.Title>
              </DataTable.Header>
              {dtRow}
            </DataTable>
          </ScrollView>
          <DataTable.Pagination
            page={page}
            numberOfPages={pages}
            onPageChange={(page) => { onPageChange(page); }}
            label={`Page ${page} of ${pages-1}`}
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
                <Picker.Item label="---------" value="0" />
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
                selectedValue={featureName}
                onValueChange={(itemValue, itemIndex) => {
                    onChangeFeaturename(itemValue);
                  }
                }>
                {
                  featureList.map((l) => (
                    <Picker.Item label={l.feature_name} value={l.instance_id} />
                  ))
                }
                <Picker.Item label="New MoMs" value="new_moms" />
              </Picker>
            </View>
          </View>
          }
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Location</Text>
            <TextInput editable={isNewFeatureName} style={[isInputDisabled,InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => setLocation(text)}></TextInput>
          </View>
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Reporter</Text>
            <TextInput editable={isNewFeatureName} style={[isInputDisabled,InputStyle.medium, InputStyle.default, InputStyle.black]} onChangeText={text => setReporter(text)}></TextInput>
          </View>
          <View style={ContainerStyle.input_label_combo}>
            <Text style={LabelStyle.medium_label}>Description</Text>
            <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]} value={description} onChangeText={text => setDescription(text)}></TextInput>
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
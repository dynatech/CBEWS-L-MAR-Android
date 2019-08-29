import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, ToastAndroid } from 'react-native';
import { ContainerStyle } from '../../../../styles/container_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';

export default class DataSyncScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  dataSyncer(key) {
    setTimeout(()=> {
      ToastAndroid.show("Successfully Synced "+key+"!", ToastAndroid.SHORT)
    }, 3000)
  }

  render() {
    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.brand]}>Synchronize Data from your phone to the Local Server</Text>
        <View style={{ paddingTop: '10%'}}>
          <TouchableOpacity style={ButtonStyle.large} onPress={()=> {this.dataSyncer("Community Risk Assessment")}}>
            <Text style={ButtonStyle.large_text}>Community Risk Assessment</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: '10%'}}>
          <TouchableOpacity style={ButtonStyle.large} onPress={()=> {this.dataSyncer("Ground data")}}>
            <Text style={ButtonStyle.large_text}>Ground data</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: '10%'}}>
          <TouchableOpacity style={ButtonStyle.large} onPress={()=> {this.dataSyncer("Maintennce")}}>
            <Text style={ButtonStyle.large_text}>Maintenance</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

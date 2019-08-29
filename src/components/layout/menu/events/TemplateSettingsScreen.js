import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';

export default class TemplateSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      template_msg: "Magandang umaga. \n\nInaasahan ang pagpapadala ng LEWC ng ground data bago mag-11:30 AM para sa routine monitoring. Agad ipaalam kung may makikitang manipestasyon ng paggalaw ng lupa o iba pang pagbabago sa site. Salamat.",
      template_key: "Ground Measurement Reminder",
      template: "",
      view: [],
      command: "Modify"
    };
  }

  modifyTemplate() {
    if (this.state.template == "new_template") {
      this.addTemplate()
    } else {
      this.setState({command: "Save"})
      this.generateField()
    }

    if (this.state.command == "Save") {
      ToastAndroid.show("Template up to date!", ToastAndroid.SHORT)
    }
  }

  addTemplate() {
    this.setState({command: "Add"})
    this.generateField()
  }

  generateField() {
    let field = [
      <View style={{padding: 10}}>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Template Type</Text>
          <TextInput 
            style={[InputStyle.medium, InputStyle.default, InputStyle.black]} 
            value={this.state.template_key} 
            onChangeText={text => this.setState({ template_key: text })}>
          </TextInput>
        </View>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Template SMS</Text>
          <TextInput multiline = {true} 
            numberOfLines = {6} 
            style={[InputStyle.medium, InputStyle.default, InputStyle.black]} 
            value={this.state.template_msg} 
            onChangeText={text => this.setState({ template_msg: text })}>
          </TextInput>
        </View>
      </View>
    ]
    this.setState({view: field})
  }

  render() {
    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.brand]}>SMS Template Settings</Text>
        <Text style={[LabelStyle.small_label, LabelStyle.brand]}>Modify / Delete SMS template</Text>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Select template</Text>
          <View style={InputStyle.default}>
            <Picker
              selectedValue={this.state.template}
              style={{ height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ template: itemValue })
              }>
              <Picker.Item label="Invitation for events" value="invitations" />
              <Picker.Item label="Ground measurement reminders" value="gndmeas_reminder" />
              <Picker.Item label="Request to reset datalogger" value="req_datalogger" />
              <Picker.Item label="Alert validation" value="alert_validation" />
              <Picker.Item label="Data validation" value="data_validation" />
              <Picker.Item label="Send Early Warning Information (EWI)" value="ewi" />
              <Picker.Item label="-- ADD NEW TEMPLATE --" value="new_template" />
            </Picker>
          </View>
          {this.state.view}
          <View style={{ paddingTop: '10%', alignItems: 'center' }}>
            <TouchableOpacity style={ButtonStyle.medium} onPress={() => this.modifyTemplate()}>
              <Text style={ButtonStyle.large_text}>{this.state.command}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

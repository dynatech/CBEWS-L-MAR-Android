import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, Linking} from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import SendSMS from 'react-native-sms';

export default class TemplatesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  launchSMS() {
    SendSMS.send({
      body: "<SAMPLE_TEMPLATE_HERE>",
      recipients: ["09090909090"],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {
      // console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error); 
    });
  }

  render() {
    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.brand]}>SMS Template Generator</Text>
        <Text style={[LabelStyle.small_label, LabelStyle.brand]}></Text>
        <View style={ContainerStyle.input_label_combo}>
          <Text style={LabelStyle.medium_label}>Select template:</Text>
          <View style={InputStyle.default}>
            <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }>
              <Picker.Item label="Invitation for events" value="invitations" />
              <Picker.Item label="Ground measurement reminders" value="gndmeas_reminder" />
              <Picker.Item label="Request to reset datalogger" value="req_datalogger" />
              <Picker.Item label="Alert validation" value="alert_validation" />
              <Picker.Item label="Data validation" value="data_validation" />
              <Picker.Item label="Send Early Warning Information (EWI)" value="ewi" />
            </Picker>
          </View>
          <View style={{ paddingTop: '10%', alignItems: 'center' }}>
          <TouchableOpacity style={ButtonStyle.medium} onPress={()=> this.launchSMS()}>
            <Text style={ButtonStyle.large_text}>Generate</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

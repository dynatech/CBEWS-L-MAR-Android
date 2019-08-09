import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { ContainerStyle } from '../../../../styles/container_style'
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';

export default class CurrentAlertScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert_level: 'Alert Level 2',
      alert_description: 'Due to manifestation of movement observed by LEWC on-site.'
    };
  }

  render() {
    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.extra_large_label, { textAlign: 'center' }, LabelStyle.level_two]}>{this.state.alert_level}</Text>
        <Text style={[LabelStyle.medium_label, { textAlign: 'center' }, LabelStyle.level_two]}>{this.state.alert_description}</Text>
        <View style={{ padding: 20 }}>
          <Text style={[LabelStyle.medium_label]}>Release timestamp: 2019-08-16 16:00:00</Text>
          <Text style={[LabelStyle.medium_label]}>Data timestamp: 2019-08-16 15:30:00</Text>
          <Text style={[LabelStyle.medium_label]}>Alert validity: 2019-08-17 16:00:00</Text>
          <Text style={[LabelStyle.medium_label]}>Prepared by: Juan Dela Cruz</Text>
          <View style={{ paddingTop: '10%', alignItems: 'center' }}>
            <TouchableOpacity style={ButtonStyle.medium}>
              <Text style={ButtonStyle.large_text}>Send EWI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

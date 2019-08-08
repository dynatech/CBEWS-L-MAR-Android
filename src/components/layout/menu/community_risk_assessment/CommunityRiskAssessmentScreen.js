import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { List, ListItem } from 'react-native-elements'

export default class CommunityRiskAssessmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          name: '<FILE_NAME> Presentation',
          subtitle: 'File type: PPTX'
        },
        {
          name: '<FILE_NAME> Report',
          subtitle: 'File type: PDF'
        },
        {
          name: '<FILE_NAME> Document',
          subtitle: 'File type: DOCX'
        },
        {
          name: '<FILE_NAME> File',
          subtitle: 'File type: TXT'
        },
      ]
    };
  }

  render() {
    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.brand]}>Community Risk Assessment</Text>
        <Text style={[LabelStyle.small_label, LabelStyle.brand]}>Reports and Documents</Text>
        <List containerStyle={{ marginBottom: 20 , flex: 0.9}}>
          {
            this.state.list.map((l) => (
              <TouchableOpacity>
                <ListItem
                  key={l.name}
                  title={l.name}
                  subtitle={l.subtitle}
                  hideChevron={true}
                />
              </TouchableOpacity>
            ))
          }
        </List>
        <View style={{ paddingTop: '10%', alignItems: 'center' }}>
          <TouchableOpacity style={ButtonStyle.medium}>
            <Text style={ButtonStyle.large_text}>Upload file</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

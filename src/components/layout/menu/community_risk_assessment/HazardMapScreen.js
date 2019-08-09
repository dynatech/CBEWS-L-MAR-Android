import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import HazardMapping from '../../../../features/community_risk_assessment/HazardMapping';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';

export default class HazardMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.brand]}>Latest Hazard Map for Marirong, Leon, Iloilo as of August 7, 2019</Text>
        <Image
          style={ImageStyle.hazard_maps}
          source={require('../../../../assets/hazard_maps/1.jpg')}
          resizeMode="center" />
        <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Click image to enlarge.</Text>
        <View style={{paddingTop: '10%', alignItems: 'center'}}>
          <TouchableOpacity style={ButtonStyle.medium}>
            <Text style={ButtonStyle.large_text}>Upload Hazard Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

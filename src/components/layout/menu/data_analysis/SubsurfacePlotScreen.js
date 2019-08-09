import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
export default class SubsurfacePlotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={ContainerStyle.content}>
          <Text style={[LabelStyle.large_label, LabelStyle.branding]}>Subsurface data as of August 16, 2019 04:00 PM</Text>
          <Image
            style={ImageStyle.hazard_maps}
            source={require('../../../../assets/test_graphs/sub1.png')}
            resizeMode="center" />
          <Image
            style={ImageStyle.hazard_maps}
            source={require('../../../../assets/test_graphs/sub2.png')}
            resizeMode="center" />
          <Image
            style={ImageStyle.hazard_maps}
            source={require('../../../../assets/test_graphs/sub3.png')}
            resizeMode="center" />
          <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Pinch graph to zoom in/out.</Text>
        </View>
      </ScrollView>
    );
  }
}

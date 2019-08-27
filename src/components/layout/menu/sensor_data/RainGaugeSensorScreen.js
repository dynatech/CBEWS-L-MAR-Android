import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Modal } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { LabelStyle } from '../../../../styles/label_style';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class RainGaugeSensorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGraphVisible: false,
      rainfall_plot: require('../../../../assets/test_graphs/rain_instant.png')
    };
  }

  showGraphFunction() {
    this.setState({ isGraphVisible: true })
  }

  hideGraphFunction() {
    this.setState({ isGraphVisible: false })
  }

  render() {

    const images = [{
      props: {
        source: this.state.rainfall_plot
      }
    }];

    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.branding]}>Rainfall data as of August 16, 2019 04:00 PM</Text>
        <TouchableHighlight onPress={() => this.showGraphFunction()}>
          <Image
            style={ImageStyle.graphs}
            source={this.state.rainfall_plot}
            resizeMode="contain" />
        </TouchableHighlight>
        <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Pinch graph to zoom in/out.</Text>
        <Modal visible={this.state.isGraphVisible}
          transparent={true}>
          <ImageViewer imageUrls={images} enableSwipeDown={true} onSwipeDown={() => { this.hideGraphFunction() }} />
        </Modal>
      </View>
    );
  }
}

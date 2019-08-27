import React, { Component } from 'react';
import { View, Text, Image, Modal } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { LabelStyle } from '../../../../styles/label_style';
import ImageViewer from 'react-native-image-zoom-viewer';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class HazardMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapVisible: false,
      map: require('../../../../assets/hazard_maps/1.jpg')
    };
  }

  showMapFunction() {
    this.setState({ isMapVisible: true })
  }

  hideMapFunction() {
    this.setState({ isMapVisible: false })
  }

  render() {

    const images = [{
      props: {
        source: this.state.map
      }
    }];

    return (
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.brand]}>Latest Hazard Map for Marirong, Leon, Iloilo as of August 7, 2019</Text>
        <TouchableHighlight onPress={() => this.showMapFunction()}>
          <Image
            style={ImageStyle.hazard_maps}
            source={this.state.map}
            resizeMode="center" />
        </TouchableHighlight>
        <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Click image to enlarge.</Text>
        <Modal visible={this.state.isMapVisible}
          transparent={true}>
          <ImageViewer imageUrls={images} enableSwipeDown={true} onSwipeDown={() => { this.hideMapFunction() }} />
        </Modal>
        <View style={{ paddingTop: '10%', alignItems: 'center' }}>
          {/* <TouchableOpacity style={ButtonStyle.medium} disabled={true}>
            <Text style={ButtonStyle.large_text}>Upload Hazard Map</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

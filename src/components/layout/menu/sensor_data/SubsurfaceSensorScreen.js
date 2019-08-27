import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableHighlight, Modal } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { LabelStyle } from '../../../../styles/label_style';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class SubsurfaceSensorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGraphVisibleSub1: false,
      isGraphVisibleSub2: false,
      subsurface_plot_one: require('../../../../assets/test_graphs/sub2.png'),
      subsurface_plot_two: require('../../../../assets/test_graphs/sub3.png')
    };
  }


  showGraphFunction(graph) {
    if (graph == "sub1") {
      this.setState({ isGraphVisibleSub1: true })
      this.setState({ isGraphVisibleSub2: false })
    } else {
      this.setState({ isGraphVisibleSub1: false })
      this.setState({ isGraphVisibleSub2: true })
    }
    
  }

  hideGraphFunction(graph) {
      this.setState({ isGraphVisibleSub1: false })
      this.setState({ isGraphVisibleSub2: false })
  }


  render() {

    const sub1 = [{
      props: {
        source: this.state.subsurface_plot_one
      }
    }];

    const sub2 = [{
      props: {
        source: this.state.subsurface_plot_two
      }
    }];

    return (
      <ScrollView>
        <View style={ContainerStyle.content}>
          <Text style={[LabelStyle.large_label, LabelStyle.branding]}>Subsurface data (xy,xz) as of August 16, 2019 04:00 PM</Text>
          <TouchableHighlight onPress={() => this.showGraphFunction("sub1")}>
          <Image
            style={ImageStyle.graphs}
            source={this.state.subsurface_plot_one}
            resizeMode="contain" />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.showGraphFunction("sub2")}>
          <Image
            style={ImageStyle.graphs}
            source={this.state.subsurface_plot_two}
            resizeMode="contain" />
        </TouchableHighlight>
          <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Pinch graph to zoom in/out.</Text>
        <Modal visible={this.state.isGraphVisibleSub1}
          transparent={true}>
          <ImageViewer imageUrls={sub1} enableSwipeDown={true} onSwipeDown={() => { this.hideGraphFunction()}} />
        </Modal>
        <Modal visible={this.state.isGraphVisibleSub2}
          transparent={true}>
          <ImageViewer imageUrls={sub2} enableSwipeDown={true} onSwipeDown={() => { this.hideGraphFunction()}} />
        </Modal>
        </View>
      </ScrollView>
    );
  }
}

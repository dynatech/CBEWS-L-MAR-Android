import React, { Component } from 'react';
import { View, Text, ScrollView, Image} from 'react-native';
import { ImageStyle } from '../../styles/image_style'
import { ContainerStyle } from '../../styles/container_style';
import { InputStyle } from '../../styles/input_style';
import { LabelStyle } from '../../styles/label_style';
import { ButtonStyle } from '../../styles/button_style';

export default class ContactUsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <View style={ContainerStyle.header}>
          <Text style={LabelStyle.header_text}>Contact Us</Text>
        </View>
        <ScrollView>
          <View style={ContainerStyle.content}>
            <View style={{ flex: 1, padding: 10 }}>
              <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 100, height: 100, marginRight: 20 }} source={require('../../assets/dynaslope_seal.png')} />
                  <Text style={{ fontSize: 20, marginTop: 10, color: '#083451' }}>PROJECT-DYNASLOPE</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}></View>
                  <View style={{ flex: 1.5 }}>
                    <Text style={{ color: '#083451' }}>4F PHIVOLCS Building, C. P. Garcia Avenue, UP Campus, Diliman, Quezon City 1011.</Text>
                    <Text style={{ color: '#083451' }}>Tel. no. (02) 426-1458 loc. 152 to 153 | dynaslope.phivolcs@gmail.com.</Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 100, height: 100, marginRight: 20 }} source={require('../../assets/leon_seal.png')} />
                  <Text style={{ fontSize: 20, marginTop: 10, color: '#083451' }}>Marirong, Leon, Iloilo,{"\n"}Philippines.</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}></View>
                  <View style={{ flex: 1.5 }}>
                    <Text>Tel. no. +63 33 331 0036{"\n"}Website: www.leon.gov.ph{"\n"}Email Address: camando_leon@yahoo.com</Text>
                  </View>
                </View>
              </View>
              <View style={{padding: 50}}></View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ImageStyle } from '../../styles/image_style'
import { ContainerStyle } from '../../styles/container_style';
import { InputStyle } from '../../styles/input_style';
import { LabelStyle } from '../../styles/label_style';
import { ButtonStyle } from '../../styles/button_style';

export default class AboutUsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <View style={ContainerStyle.header}>
          <Text style={LabelStyle.header_text}>About Us</Text>
        </View>
        <ScrollView>
          <View style={ContainerStyle.content}>
            <View style={{ flex: 1, padding: 10 }}>
              <View style={{ paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 50, justifyContent: 'center' }}>
                <Text style={{ color: '#083451', textAlign: 'center' }}>This app was developed to assist local communities and government units in operating the early warning
                system for deep-seated landslides (EWS-L) in their respective communities.</Text>
              </View>
              <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 100, height: 100, marginRight: 20 }} source={require('../../assets/dynaslope_seal.png')} />
                  <Text style={{ fontSize: 20, marginTop: 10, color: '#083451' }}>PROJECT-DYNASLOPE</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}></View>
                  <View style={{ flex: 1.5 }}>
                    <Text style={{ color: '#083451' }}>The Dynaslope Project is a research program developing an early warning system for deep-seated and catastrophic landslides, through landslide sensor technology and community participation in the Philippines.</Text>
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
                    <Text>Leon is a second class municipality in the province of Iloilo, Philippines. Located in the southwestern part of Iloilo Province, it is 28 kilometres (17 mi) from Iloilo City. According to the 2010 census, it has a population of 47,522 people.</Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 100, height: 100, marginRight: 20 }} source={require('../../assets/mar_seal.png')} />
                  <Text style={{ fontSize: 20, marginTop: 10, color: '#083451' }}>LEWC</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}></View>
                  <View style={{ flex: 1.5 }}>
                    <Text>LEWC_DESCRIPTIONS_HERE</Text>
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

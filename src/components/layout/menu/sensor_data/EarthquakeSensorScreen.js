import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { DataTable } from 'react-native-paper';

export default class EarthquakeSensorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={ContainerStyle.content}>
          <View style={ContainerStyle.datatable_content}>
            <ScrollView horizontal={true}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={{ width: 200 }}>Date - Time (PH)</DataTable.Title>
                  <DataTable.Title style={{ width: 100 }}>Latitude (ºN)</DataTable.Title>
                  <DataTable.Title style={{ width: 100 }}>Longitude (ºE)</DataTable.Title>
                  <DataTable.Title style={{ width: 100 }}>Depth (km)</DataTable.Title>
                  <DataTable.Title style={{ width: 100 }}>Magnitude</DataTable.Title>
                  <DataTable.Title style={{ width: 200 }}>Location</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 200 }}>13 August 2019 - 06:51 AM</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>18.70</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>120.91</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>023</DataTable.Cell>
                  <DataTable.Cell style={{ width: 100 }}>3.2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>016 km N 14° W of Santa Praxedes (Cagayan)</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </ScrollView>
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={(page) => { console.log(page); }}
              label="1-2 of 6"
            />
          </View>
          <View>
            <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Click here for complete list of earthquake detected.</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
